import type { DeviceSpec } from "@/types"

export const IPHONE_SPECS: Record<string, DeviceSpec> = {
  'iPhone 6.9"': { width: 1320, height: 2868, label: 'iPhone 16 Pro Max' },
  'iPhone 6.7"': { width: 1290, height: 2796, label: 'iPhone 16 Plus' },
  'iPhone 6.3"': { width: 1206, height: 2622, label: 'iPhone 16 Pro' },
  'iPhone 6.1"': { width: 1179, height: 2556, label: 'iPhone 16' },
}

export const PREVIEW_WIDTH = 390
export const PREVIEW_HEIGHT = 844

export const DEVICE_KEYS = Object.keys(IPHONE_SPECS)
export const DEFAULT_DEVICE = DEVICE_KEYS[0]
