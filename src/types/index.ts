import type { RefObject } from 'react'
import type Konva from 'konva'

export interface ScreenConfig {
  layout: 'text-top' | 'text-bottom' | 'hero-center';
  hideDevice?: boolean;
  bgOverride?: string;
  badge?: string;
  badgeBg?: string;
  badgeColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  decoration?: {
    type: 'path' | 'circle';
    data: string;
    fill: string;
    x: number;
    y: number;
  };
}

export interface AppScreen {
  id: string;
  screenshotUrl: string | null;
  title: string;
  subtitle: string;
  backgroundColor: string;
  config?: ScreenConfig;
}

export interface PanoramicProjectState {
  globalFrameColor: 'black' | 'white' | 'titanium';
  showDeviceFrame: boolean;
  globalDeviceType: 'iphone-pro' | 'iphone-classic' | 'android-ultra' | 'android-punch';
  globalTitleColor: string;
  globalSubtitleColor: string;
  screens: AppScreen[];
  activeScreenId: string;
  activeThemeId?: string;
}

export interface PanoramicTheme {
  id: string;
  name: string;
  thumbnail: string;
  globalFont: { titleColor: string; subtitleColor: string; family: string };
  screens: ScreenConfig[];
}

export interface Template {
  id: string
  name: string
  thumbnail: string
  background: {
    type: 'solid' | 'gradient' | 'image'
    value: string
  }
  deviceFrame: {
    show: boolean
    color: 'black' | 'white' | 'titanium' | 'none'
    shadowIntensity: number
  }
  text: {
    title: { value: string; color: string; size: number; weight: string; position: 'top' | 'bottom' }
    subtitle: { value: string; color: string; size: number; position: 'top' | 'bottom' }
  }
  layout: 'screenshot-top' | 'screenshot-center' | 'screenshot-bottom'
}

export interface GradientColors {
  colorTop: string
  colorBottom: string
  colorStops: number[]
}

export interface LayoutPositions {
  titleY: number
  subtitleY: number
  deviceY: number
  badgeY: number
}

export interface EditorBaseProps {
  project: PanoramicProjectState
  onChange: (project: PanoramicProjectState) => void
}

export interface EditorScreenProps {
  screen: AppScreen
  project: PanoramicProjectState
}

export interface EditorInteractiveProps {
  isActive: boolean
  onClick: () => void
}

export type EditorUpdateScreen = (screenId: string, updates: Partial<AppScreen>) => void

export type EditorUploadFn = (dataUrl: string) => void

export interface CanvasStageRendererProps extends EditorScreenProps {
  scale: number
  screenshotImg: HTMLImageElement | null
  derived: ScreenDerivedValues
  onUploadClick: () => void
  onEditField: (field: 'title' | 'subtitle' | 'badge') => void
}

export interface GradientColorPanelProps {
  colorTop: string
  colorBottom: string
  stageRef: RefObject<Konva.Stage | null>
  screenId: string
  onGradientChange: (gradient: string) => void
}

export interface InlineTextOverlayProps {
  value: string
  top: number
  left: number
  width: number
  fontSize: number
  onChange: (val: string) => void
  onClose: () => void
}

export interface SingleCanvasInstanceProps extends EditorScreenProps, EditorInteractiveProps {
  onUpload: EditorUploadFn
  onUpdateText: (updates: Partial<AppScreen>) => void
  stageRef: RefObject<Konva.Stage | null>
}

export interface TopFloatingDashboardProps extends EditorBaseProps {
  activeScreen: AppScreen | undefined
  onUpdateScreen: EditorUpdateScreen
  onExportAll: () => void
}

export interface PanoramicCanvasWorkspaceProps extends EditorBaseProps {
  stageRefs: RefObject<Konva.Stage | null>[]
}

export interface ScreenDerivedValues {
  layout: string
  isHideDevice: boolean
  showDevice: boolean
  titleAlign: CanvasTextAlign
  titleX: number
  activeTitleColor: string
  activeSubtitleColor: string
  frameColor: string
  deviceRadius: number
  colorTop: string
  colorBottom: string
  colorStops: number[]
  titleY: number
  subtitleY: number
  deviceY: number
  badgeY: number
  badge: string | undefined
  badgeBg: string
  badgeColor: string
  decoration: { type: string; data: string; fill: string; x: number; y: number } | undefined
}

export interface DeviceSpec {
  width: number
  height: number
  label: string
}
