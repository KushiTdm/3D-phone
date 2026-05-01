export const PHONE_CONFIG = {
  root: {
    name: 'IPHONE_X_3',
    position: { x: -0.27, y: 3.83, z: 0.07 },
    rotation: { x: Math.PI / 2, y: 0, z: 0 },
    scale: 0.01,
  },
  screen: {
    meshName: 'VideoScreen',
    materialName: 'EcranTelephone_NEW',
    position: { x: 0.85, y: -374.35, z: 6.95 },
    dimensions: { w: 97.97, h: 214.71 },
    scaleY: 1.13,
  },
  camera: {
    groupName: 'kamera_alt',
    position: { x: 65.66, y: 83.68, z: -9.77 },
    rotation: { x: 0, y: 0.055, z: 0 },
    children: ['Extrude.006', 'Extrude_1.001', 'Extrude_5', 'Extrude_7'],
  },
  buttons: {
    power:   { mesh: 'Extrude_4',   pos: { x: 76.44,  y: 46.24,  z: 2.64 } },
    volUp:   { mesh: 'Extrude_1_2', pos: { x: -19.17, y: 34.69,  z: 2.64 } },
    volDown: { mesh: 'Extrude_2_2', pos: { x: -19.17, y: 55.64,  z: 2.64 } },
    silent:  { mesh: 'Extrude_3',   pos: { x: -24.69, y: 75.38,  z: 2.64 } },
  },
  connector: {
    mesh: 'Sweep.001',
    position: { x: -113.54, y: -124.10, z: 2.64 },
  },
  looseMeshes: [
    'Cap:1_X', 'Cap:2_X', 'Rounding_X',
    'Cap:1', 'Cap:1_10', 'Cap:2', 'Cap:2_10',
    'Extrude', 'Extrude.1', 'Extrude.7',
    'Rounding', 'Rounding_4',
    'Sweep', 'Cube', 'Cylinder.12'
  ],
} as const;

export const SCROLL_SEQUENCES = [
  { name: 'apparition', range: [0, 0.25] },
  { name: 'reduction-gauche', range: [0.25, 0.5] },
  { name: 'basculement', range: [0.5, 0.75] },
  { name: 'disparition', range: [0.75, 1.0] },
] as const;