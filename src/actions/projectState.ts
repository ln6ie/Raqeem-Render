import type { PanoramicProjectState, AppScreen, PanoramicTheme } from '@/types'

const DEFAULT_BG_GRADIENTS = [
  'linear-gradient(135deg, #0a1128 0%, #1c2541 100%)',
  'linear-gradient(135deg, #1c2541 0%, #3a506b 100%)',
  'linear-gradient(135deg, #007AFF 0%, #0056b3 100%)',
  'linear-gradient(135deg, #0f4c81 0%, #1f3a52 100%)',
  'linear-gradient(135deg, #0a1128 0%, #007AFF 100%)',
]

// إنشاء شاشة جديدة بمعلومات افتراضية
function createInitialScreen(index: number): AppScreen {
  return {
    id: `screen-${index + 1}`,
    screenshotUrl: null,
    title: `الشاشة ${index + 1}`,
    subtitle: 'اضغط لتعديل النص هنا',
    backgroundColor: DEFAULT_BG_GRADIENTS[index % DEFAULT_BG_GRADIENTS.length],
  }
}

// إنشاء مشروع جديد بخمس شاشات
export function createEmptyProject(): PanoramicProjectState {
  const screens = Array.from({ length: 5 }, (_, i) => createInitialScreen(i))
  return {
    globalFrameColor: 'titanium',
    showDeviceFrame: true,
    globalDeviceType: 'iphone-pro',
    globalTitleColor: '#ffffff',
    globalSubtitleColor: '#e2e8f0',
    screens,
    activeScreenId: screens[0].id,
  }
}

// تحديث بيانات شاشة معينة
export function updateScreen(
  project: PanoramicProjectState,
  screenId: string,
  updates: Partial<AppScreen>,
): PanoramicProjectState {
  return {
    ...project,
    screens: project.screens.map((s) =>
      s.id === screenId ? { ...s, ...updates } : s,
    ),
  }
}

// الحصول على الشاشة النشطة حاليا
export function getActiveScreen(project: PanoramicProjectState): AppScreen | undefined {
  return project.screens.find((s) => s.id === project.activeScreenId)
}

// تطبيق قالب على المشروع
export function applyTheme(project: PanoramicProjectState, theme: PanoramicTheme): PanoramicProjectState {
  return {
    ...project,
    activeThemeId: theme.id,
    globalTitleColor: theme.globalFont.titleColor,
    globalSubtitleColor: theme.globalFont.subtitleColor,
    screens: project.screens.map((screen, index) => {
      const config = theme.screens[index]
      if (!config) return screen
      return {
        ...screen,
        config,
        backgroundColor: config.bgOverride || screen.backgroundColor,
      }
    }),
  }
}
