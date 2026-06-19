import type { DesignState, Template } from '@/types'
import { DEFAULT_DEVICE } from '@/lib/appleSpecs'

export function templateToDesignState(template: Template): DesignState {
  return {
    templateId: template.id,
    background: {
      type: template.background.type === 'image' ? 'solid' : template.background.type,
      value: template.background.value,
    },
    deviceFrame: {
      show: template.deviceFrame.show,
      color: template.deviceFrame.color,
      shadow: template.deviceFrame.shadowIntensity,
    },
    screenshot: { url: null, scale: 1, offsetX: 0, offsetY: 0 },
    logo: { url: null, x: 195, y: 50, width: 120, visible: false },
    text: {
      title: {
        value: template.text.title.value,
        color: template.text.title.color,
        fontSize: template.text.title.size,
        fontWeight: template.text.title.weight,
        position: template.text.title.position,
      },
      subtitle: {
        value: template.text.subtitle.value,
        color: template.text.subtitle.color,
        fontSize: template.text.subtitle.size,
        position: template.text.subtitle.position,
      },
    },
    selectedDevice: DEFAULT_DEVICE,
  }
}

export function getDefaultDesignState(template: Template): DesignState {
  return templateToDesignState(template)
}
