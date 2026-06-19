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

export interface DeviceSpec {
  width: number
  height: number
  label: string
}
