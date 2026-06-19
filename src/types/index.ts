export interface DesignState {
  templateId: string
  background: { type: 'solid' | 'gradient'; value: string }
  deviceFrame: { show: boolean; color: 'black' | 'white' | 'titanium' | 'none'; shadow: number }
  screenshot: { url: string | null; scale: number; offsetX: number; offsetY: number }
  logo: { url: string | null; x: number; y: number; width: number; visible: boolean }
  text: {
    title: { value: string; color: string; fontSize: number; fontWeight: string; position: 'top' | 'bottom' }
    subtitle: { value: string; color: string; fontSize: number; position: 'top' | 'bottom' }
  }
  selectedDevice: string
}

export type SidebarSection = 'template' | 'background' | 'text' | 'screenshot' | 'logo' | 'frame'

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
