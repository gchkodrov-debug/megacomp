# M8 — "Lumen №1", a machined-brass desk lamp, authored in Blender.
#
# Run: blender -b --factory-startup -noaudio --python build_lamp.py
#
# The script is the coursework: modeling (primitives + bevels),
# PBR materials, a keyframed exploded view, camera + lighting,
# an Eevee render of the full sequence, and — as a separate,
# deliberate pass — the web model: assembled pose, modifiers
# applied, exported GLB, with its stats printed for the record.
#
# Animation (120 frames @ 24 fps):
#   1–36    assembled, the camera orbits
#   37–84   the lamp explodes along a vertical assembly column
#   85–120  exploded hold; the bulb warms up and glows
import bpy
import math
import os

HERE = os.path.dirname(os.path.abspath(__file__))
RENDERS = os.path.join(HERE, 'renders')
MODEL_DIR = os.path.join(HERE, 'model')
os.makedirs(RENDERS, exist_ok=True)
os.makedirs(MODEL_DIR, exist_ok=True)

# ---------------------------------------------------------------- scene
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.eevee.taa_render_samples = 32
scene.render.resolution_x = 960
scene.render.resolution_y = 540
scene.render.fps = 24
scene.frame_start = 1
scene.frame_end = 120
scene.render.image_settings.file_format = 'PNG'
scene.render.filepath = os.path.join(RENDERS, 'frame_')
scene.render.film_transparent = False

world = bpy.data.worlds.new('World')
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes['Background']
bg.inputs[0].default_value = (0.048, 0.040, 0.030, 1)
bg.inputs[1].default_value = 1.0

# ---------------------------------------------------------------- materials
def principled(name, color, metallic, roughness, emission=None, emission_strength=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes['Principled BSDF']
    bsdf.inputs['Base Color'].default_value = (*color, 1)
    bsdf.inputs['Metallic'].default_value = metallic
    bsdf.inputs['Roughness'].default_value = roughness
    if emission is not None:
        for key in ('Emission Color', 'Emission'):
            if key in bsdf.inputs:
                bsdf.inputs[key].default_value = (*emission, 1)
                break
        if 'Emission Strength' in bsdf.inputs:
            bsdf.inputs['Emission Strength'].default_value = emission_strength
    return m

BRASS = principled('Brass', (0.62, 0.44, 0.14), 1.0, 0.32)
BRASS_DARK = principled('BrassDark', (0.36, 0.25, 0.08), 1.0, 0.42)
BLACK = principled('BlackenedSteel', (0.05, 0.05, 0.05), 0.8, 0.45)
SHADE_INNER = principled('ShadeInner', (0.92, 0.82, 0.60), 0.1, 0.5)
BULB = principled('BulbGlass', (1.0, 0.85, 0.55), 0.0, 0.4,
                  emission=(1.0, 0.72, 0.30), emission_strength=0.4)
FLOOR_M = principled('Floor', (0.045, 0.038, 0.03), 0.0, 0.95)

# ---------------------------------------------------------------- helpers
def finish(obj, material, bevel=0.0):
    if material:
        obj.data.materials.append(material)
    if bevel > 0:
        mod = obj.modifiers.new('SoftEdge', 'BEVEL')
        mod.width = bevel
        mod.segments = 2
    return obj

def cyl(name, radius, depth, loc, mat, vertices=48, bevel=0.008):
    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=depth, location=loc, vertices=vertices)
    return finish(bpy.context.active_object, mat, bevel)

def sphere(name, radius, loc, mat):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=radius, location=loc, segments=32, ring_count=16)
    obj = bpy.context.active_object
    obj.name = name
    for p in obj.data.polygons:
        p.use_smooth = True
    return finish(obj, mat, 0.0)

# ---------------------------------------------------------------- the lamp
# Home positions are the ASSEMBLED pose. EXPLODE is each part's
# offset at the fully-exploded keyframe — a vertical assembly
# column above the base, the way a service manual draws it.
PARTS = []  # (obj, explode_offset)

def register(obj, name, explode):
    obj.name = name
    PARTS.append((obj, explode))
    return obj

base = cyl('Base', 0.55, 0.09, (0, 0, 0.045), BRASS, bevel=0.02)
register(base, 'Base', (0, 0, 0))
collar = cyl('BaseCollar', 0.30, 0.05, (0, 0, 0.115), BRASS_DARK, bevel=0.012)
register(collar, 'BaseCollar', (0, 0, 0.10))

stem = cyl('Stem', 0.045, 0.75, (0, 0, 0.465), BRASS, vertices=24)
register(stem, 'Stem', (0, 0, 0.28))

elbow = sphere('Elbow', 0.095, (0, 0, 0.88), BLACK)
register(elbow, 'Elbow', (0, 0, 0.55))

ARM_ANG = math.radians(40)
arm_dir = (math.sin(ARM_ANG), 0, math.cos(ARM_ANG))
elbow_p = (0, 0, 0.88)
arm_center = (elbow_p[0] + arm_dir[0] * 0.40, 0, elbow_p[2] + arm_dir[2] * 0.40)
arm = cyl('Arm', 0.04, 0.80, arm_center, BRASS, vertices=24)
arm.rotation_euler = (0, ARM_ANG, 0)
register(arm, 'Arm', (0.30, 0, 0.82))

arm_end = (elbow_p[0] + arm_dir[0] * 0.80, 0, elbow_p[2] + arm_dir[2] * 0.80)
SHADE_TILT = math.radians(-30)
shade_center = (arm_end[0] + 0.06, 0, arm_end[2] - 0.03)
bpy.ops.mesh.primitive_cone_add(radius1=0.34, radius2=0.15, depth=0.36,
                                location=shade_center, vertices=48, end_fill_type='NOTHING')
shade = finish(bpy.context.active_object, BRASS, 0.006)
shade.rotation_euler = (0, SHADE_TILT, 0)
register(shade, 'Shade', (0.55, 0, 1.05))
# inner shade: a slightly smaller open cone, warm matte
bpy.ops.mesh.primitive_cone_add(radius1=0.325, radius2=0.14, depth=0.35,
                                location=shade_center, vertices=48, end_fill_type='NOTHING')
inner = finish(bpy.context.active_object, SHADE_INNER, 0.0)
inner.rotation_euler = (0, SHADE_TILT, 0)
register(inner, 'ShadeInner', (0.55, 0, 1.05))

cap_center = (shade_center[0] + math.sin(SHADE_TILT) * 0.24, 0, shade_center[2] + math.cos(SHADE_TILT) * 0.24)
cap = cyl('ShadeCap', 0.07, 0.09, cap_center, BLACK, vertices=24)
cap.rotation_euler = (0, SHADE_TILT, 0)
register(cap, 'ShadeCap', (0.55, 0, 1.55))

bulb_center = (shade_center[0] - math.sin(SHADE_TILT) * 0.08, 0, shade_center[2] - math.cos(SHADE_TILT) * 0.08)
bulb = sphere('Bulb', 0.105, bulb_center, BULB)
register(bulb, 'Bulb', (0.55, 0, 1.30))

# floor
bpy.ops.mesh.primitive_plane_add(size=90, location=(0, 0, 0))
floor = finish(bpy.context.active_object, FLOOR_M, 0.0)
floor.name = 'Floor'

# ---------------------------------------------------------------- lights
def add_light(name, type_, loc, energy, **kw):
    data = bpy.data.lights.new(name, type_)
    data.energy = energy
    for k, v in kw.items():
        setattr(data, k, v)
    obj = bpy.data.objects.new(name, data)
    scene.collection.objects.link(obj)
    obj.location = loc
    return obj

key = add_light('KeySpot', 'SPOT', (-2.6, -2.2, 3.4), 900,
                spot_size=math.radians(38), spot_blend=0.45, shadow_soft_size=0.35)
key.rotation_euler = (math.radians(52), math.radians(-18), math.radians(-38))
key.data.use_shadow = True
rim = add_light('RimPoint', 'POINT', (2.4, 1.8, 2.2), 60, shadow_soft_size=0.2)
rim.data.color = (0.75, 0.83, 1.0)
bulb_light = add_light('BulbLight', 'POINT', bulb_center, 5, shadow_soft_size=0.1)
bulb_light.data.color = (1.0, 0.78, 0.42)

# ---------------------------------------------------------------- camera
target = bpy.data.objects.new('CamTarget', None)
scene.collection.objects.link(target)
target.location = (0.1, 0, 0.78)
cam_data = bpy.data.cameras.new('Camera')
cam_data.lens = 44
cam = bpy.data.objects.new('Camera', cam_data)
scene.collection.objects.link(cam)
cam.location = (3.1, -3.1, 1.7)
con = cam.constraints.new('TRACK_TO')
con.target = target
con.track_axis = 'TRACK_NEGATIVE_Z'
con.up_axis = 'UP_Y'
scene.camera = cam
orbit = bpy.data.objects.new('Orbit', None)
scene.collection.objects.link(orbit)
cam.parent = orbit
orbit.rotation_euler = (0, 0, math.radians(-34))
orbit.keyframe_insert(data_path='rotation_euler', frame=1)
orbit.rotation_euler = (0, 0, math.radians(34))
orbit.keyframe_insert(data_path='rotation_euler', frame=120)

# The camera reframes for the explosion: as the parts rise,
# the target climbs and the camera steps back (keyframes at
# the explode's own boundaries, 37 and 84, held to 120).
target.keyframe_insert(data_path='location', frame=37)
target.location = (0.1, 0, 1.45)
target.keyframe_insert(data_path='location', frame=84)
target.keyframe_insert(data_path='location', frame=120)
cam.keyframe_insert(data_path='location', frame=37)
cam.location = (4.9, -4.9, 3.0)
cam.keyframe_insert(data_path='location', frame=84)
cam.keyframe_insert(data_path='location', frame=120)

# ---------------------------------------------------------------- animation
for obj, off in PARTS:
    home = tuple(obj.location)
    obj.keyframe_insert(data_path='location', frame=37)
    obj.location = (home[0] + off[0], home[1] + off[1], home[2] + off[2])
    obj.keyframe_insert(data_path='location', frame=84)
    obj.keyframe_insert(data_path='location', frame=120)

# bulb warmth: emissive strength + point light, frames 85→120
bsdf = BULB.node_tree.nodes['Principled BSDF']
estr = bsdf.inputs['Emission Strength']
estr.default_value = 0.4
estr.keyframe_insert(data_path='default_value', frame=85)
estr.default_value = 2.4
estr.keyframe_insert(data_path='default_value', frame=120)
bulb_light.data.energy = 5
bulb_light.data.keyframe_insert(data_path='energy', frame=85)
bulb_light.data.energy = 30
bulb_light.data.keyframe_insert(data_path='energy', frame=120)

# smooth interpolation everywhere
for action in bpy.data.actions:
    for fc in action.fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = 'BEZIER'

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'lamp.blend'))

# ---------------------------------------------------------------- render
bpy.ops.render.render(animation=True)
n_frames = len([f for f in os.listdir(RENDERS) if f.startswith('frame_') and f.endswith('.png')])
print(f'RENDERED_FRAMES={n_frames}')

# a still of the exploded hold for the poster
scene.frame_set(110)
scene.render.filepath = os.path.join(HERE, 'poster.png')
bpy.ops.render.render(write_still=True)
print('POSTER_DONE')

# ---------------------------------------------------------------- web model
# Assembled pose (frame 1 evaluates to the assembled keyframes),
# floor and lights excluded, modifiers applied at export.
scene.frame_set(1)
for obj in (floor, key, rim, bulb_light, cam, target, orbit):
    obj.hide_render = True
    obj.hide_viewport = True
bpy.ops.object.select_all(action='DESELECT')
export_objs = [obj for obj, _ in PARTS]
for obj in export_objs:
    obj.select_set(True)
bpy.context.view_layer.objects.active = export_objs[0]
glb_path = os.path.join(MODEL_DIR, 'lumen-no1-web.glb')
bpy.ops.export_scene.gltf(filepath=glb_path, export_format='GLB',
                          export_apply=True, export_yup=True,
                          export_animations=False,
                          use_selection=True)
size = os.path.getsize(glb_path)
tris = 0
verts = 0
for obj in export_objs:
    dg = bpy.context.evaluated_depsgraph_get()
    ev = obj.evaluated_get(dg)
    mesh = ev.to_mesh()
    mesh.calc_loop_triangles()
    tris += len(mesh.loop_triangles)
    verts += len(mesh.vertices)
    ev.to_mesh_clear()
print(f'WEB_MODEL bytes={size} triangles={tris} vertices={verts} parts={len(export_objs)}')
print('M8_BUILD_DONE')
