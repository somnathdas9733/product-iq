import { SamplePreset } from '../types';

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'industrial-pump',
    label: 'Industrial Water Pump',
    badge: 'Standard Sample (80%)',
    description: 'Stainless steel pump with flow rate & pressure; lacks voltage and weight.',
    data: {
      productName: 'Industrial Water Pump',
      category: 'Water Pump',
      material: 'Stainless Steel',
      specifications: 'Flow rate: 50 L/min\nMaximum pressure: 10 bar\nInlet/Outlet: 1.5 inch NPT',
      applications: 'Industrial water circulation\nCooling tower booster\nManufacturing rinse systems',
      additionalInfo: 'Designed for continuous 24/7 duty in non-corrosive liquids.',
    },
  },
  {
    id: 'ball-valve',
    label: 'High-Pressure Ball Valve',
    badge: 'Incomplete (65%)',
    description: 'Basic valve specs missing temperature range, actuation type, and dimensions.',
    data: {
      productName: 'Forged Steel High-Pressure Ball Valve',
      category: 'Industrial Valves',
      material: 'ASTM A105 Carbon Steel with PTFE seats',
      specifications: 'Pressure Class: 800 PSI\nPort Size: 2 Inch Full Bore',
      applications: 'Petrochemical pipelines, steam isolation, gas transport lines',
      additionalInfo: 'Manual lever handle operated.',
    },
  },
  {
    id: 'cnc-endmill',
    label: 'CNC Solid Carbide End Mill',
    badge: 'Comprehensive (95%)',
    description: 'Fully detailed cutting tool with coating, flutes, dimensions, and speed ratings.',
    data: {
      productName: '4-Flute AlTiN Coated Solid Carbide End Mill',
      category: 'CNC Cutting Tools',
      material: 'Micrograin Solid Tungsten Carbide',
      specifications: 'Cutting Diameter: 12mm\nShank Diameter: 12mm\nFlute Length: 30mm\nOverall Length: 75mm\nHelix Angle: 35°\nCoating: AlTiN (Aluminum Titanium Nitride)\nHardness Rating: HRC 55',
      applications: 'High-speed side milling, slotting, and profiling in alloy steel, stainless steel, and titanium',
      additionalInfo: 'Suitable for dry machining and flood coolant operations. ISO 9001 certified manufacturing.',
    },
  },
];
