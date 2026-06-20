import type { GradientColors, LayoutPositions, AppScreen, PanoramicProjectState, ScreenDerivedValues } from '@/types'
import { FRAME_COLORS } from '@/lib/frameConfig'

export function getDeviceRadius(type: string): number {
  if (type === 'android-ultra') return 22
  if (type === 'iphone-classic') return 130
  if (type === 'android-punch') return 94
  return 110
}

export function colorToHex(color: string): string {
  if (!color) return '#4f46e5'
  if (color.startsWith('#')) {
    if (color.length === 4 || color.length === 5) {
      return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
    }
    return color.substring(0, 7)
  }
  if (color.startsWith('rgb')) {
    const rgbVals = color.match(/\d+/g)
    if (rgbVals && rgbVals.length >= 3) {
      const r = parseInt(rgbVals[0], 10)
      const g = parseInt(rgbVals[1], 10)
      const b = parseInt(rgbVals[2], 10)
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }).join('')
    }
  }
  return '#4f46e5'
}

export function parseGradientColors(backgroundColor: string): GradientColors {
  const matches = backgroundColor.match(
    /#(?:[0-9a-fA-F]{3,4}){1,2}\b|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g,
  ) || ['#4f46e5']
  const colorTop = colorToHex(matches[0] || '#4f46e5')
  const colorBottom = colorToHex(matches[1] || matches[0] || '#7c3aed')
  return { colorTop, colorBottom, colorStops: [0, colorTop, 1, colorBottom] as unknown as number[] }
}

export function getLayoutPositions(layout: string): LayoutPositions {
  let titleY = 140; let subtitleY = 270; let deviceY = 380; let badgeY = 60
  if (layout === 'text-bottom') {
    deviceY = 80; titleY = 2410; subtitleY = 2530; badgeY = 2330
  } else if (layout === 'hero-center') {
    titleY = 1170; subtitleY = 1330; badgeY = 1080
  }
  return { titleY, subtitleY, deviceY, badgeY }
}

export function getScreenDerivedValues(screen: AppScreen, project: PanoramicProjectState): ScreenDerivedValues {
  const layout = screen.config?.layout || 'text-top'
  const positions = getLayoutPositions(layout)
  const { colorTop, colorBottom, colorStops } = parseGradientColors(screen.backgroundColor)
  return {
    layout,
    isHideDevice: screen.config?.hideDevice || false,
    showDevice: project.showDeviceFrame && !screen.config?.hideDevice,
    titleAlign: (screen.config?.textAlign || 'center') as CanvasTextAlign,
    titleX: 80,
    activeTitleColor: screen.config?.titleColor || project.globalTitleColor,
    activeSubtitleColor: screen.config?.subtitleColor || project.globalSubtitleColor,
    frameColor: FRAME_COLORS[project.globalFrameColor] || FRAME_COLORS.titanium,
    deviceRadius: getDeviceRadius(project.globalDeviceType),
    colorTop,
    colorBottom,
    colorStops,
    ...positions,
    badge: screen.config?.badge,
    badgeBg: screen.config?.badgeBg || '#000000',
    badgeColor: screen.config?.badgeColor || '#ffffff',
    decoration: screen.config?.decoration,
  }
}
