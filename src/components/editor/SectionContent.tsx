'use client'

import type { DesignState, Template, SidebarSection } from '@/types'
import { TEMPLATES } from '@/lib/templates'
import { PREVIEW_WIDTH, PREVIEW_HEIGHT } from '@/lib/appleSpecs'
import ColorPicker from '@/components/ui/ColorPicker'
import SliderInput from '@/components/ui/SliderInput'
import UploadZone from '@/components/ui/UploadZone'
import TemplateCard from './TemplateCard'

interface SectionContentProps {
  section: SidebarSection
  design: DesignState
  onDesignChange: (updates: Partial<DesignState>) => void
  onTemplateSelect: (template: Template) => void
}

export default function SectionContent({ section, design, onDesignChange, onTemplateSelect }: SectionContentProps) {
  switch (section) {
    case 'template':
      return (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {TEMPLATES.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              template={tpl}
              isActive={design.templateId === tpl.id}
              onClick={() => onTemplateSelect(tpl)}
            />
          ))}
        </div>
      )
    case 'background':
      return (
        <ColorPicker
          label="Background Color"
          value={design.background.value}
          onChange={(value) => onDesignChange({ background: { ...design.background, value } })}
        />
      )
    case 'text':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">Title</label>
            <input
              type="text"
              value={design.text.title.value}
              onChange={(e) => onDesignChange({ text: { ...design.text, title: { ...design.text.title, value: e.target.value } } })}
              placeholder="Your App Name"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ColorPicker
              label="Title Color"
              value={design.text.title.color}
              onChange={(color) => onDesignChange({ text: { ...design.text, title: { ...design.text.title, color } } })}
            />
            <SliderInput
              label="Title Size"
              value={design.text.title.fontSize}
              min={24}
              max={72}
              unit="px"
              onChange={(fontSize) => onDesignChange({ text: { ...design.text, title: { ...design.text.title, fontSize } } })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">Subtitle</label>
            <input
              type="text"
              value={design.text.subtitle.value}
              onChange={(e) => onDesignChange({ text: { ...design.text, subtitle: { ...design.text.subtitle, value: e.target.value } } })}
              placeholder="A short description"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ColorPicker
              label="Subtitle Color"
              value={design.text.subtitle.color}
              onChange={(color) => onDesignChange({ text: { ...design.text, subtitle: { ...design.text.subtitle, color } } })}
            />
            <SliderInput
              label="Subtitle Size"
              value={design.text.subtitle.fontSize}
              min={14}
              max={36}
              unit="px"
              onChange={(fontSize) => onDesignChange({ text: { ...design.text, subtitle: { ...design.text.subtitle, fontSize } } })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">Position</label>
            <div className="mt-1 flex gap-2">
              {(['top', 'bottom'] as const).map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => onDesignChange({
                    text: {
                      ...design.text,
                      title: { ...design.text.title, position: pos },
                      subtitle: { ...design.text.subtitle, position: pos },
                    },
                  })}
                  className={`flex-1 rounded-xl border py-2 text-xs font-semibold transition-all duration-200 ${design.text.title.position === pos ? 'border-[#1B3A6B] bg-[#1B3A6B] text-white' : 'border-[#E2E8F0] text-[#64748B] hover:border-[#1B3A6B]'}`}
                >
                  {pos === 'top' ? 'Top' : 'Bottom'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    case 'screenshot':
      return (
        <UploadZone
          label="Upload Screenshot"
          currentPreview={design.screenshot.url}
          onUpload={(url) => onDesignChange({ screenshot: { ...design.screenshot, url } })}
        />
      )
    case 'logo':
      return (
        <div className="space-y-4">
          <UploadZone
            label="Upload Logo"
            currentPreview={design.logo.visible ? design.logo.url : null}
            onUpload={(url) => onDesignChange({ logo: { ...design.logo, url, visible: true } })}
          />
          {design.logo.url && (
            <>
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">Show Logo</label>
                <button
                  type="button"
                  onClick={() => onDesignChange({ logo: { ...design.logo, visible: !design.logo.visible } })}
                  className={`relative h-5 w-9 rounded-full transition-colors ${design.logo.visible ? 'bg-[#1B3A6B]' : 'bg-[#E2E8F0]'}`}
                >
                  <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${design.logo.visible ? 'translate-x-4' : ''}`} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <SliderInput
                  label="X Position"
                  value={design.logo.x}
                  min={0}
                  max={PREVIEW_WIDTH - design.logo.width}
                  onChange={(x) => onDesignChange({ logo: { ...design.logo, x } })}
                />
                <SliderInput
                  label="Y Position"
                  value={design.logo.y}
                  min={0}
                  max={PREVIEW_HEIGHT - design.logo.width}
                  onChange={(y) => onDesignChange({ logo: { ...design.logo, y } })}
                />
              </div>
              <SliderInput
                label="Logo Size"
                value={design.logo.width}
                min={50}
                max={300}
                unit="px"
                onChange={(width) => onDesignChange({ logo: { ...design.logo, width } })}
              />
            </>
          )}
        </div>
      )
    case 'frame':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">Show Frame</label>
            <button
              type="button"
              onClick={() => onDesignChange({ deviceFrame: { ...design.deviceFrame, show: !design.deviceFrame.show } })}
              className={`relative h-5 w-9 rounded-full transition-colors ${design.deviceFrame.show ? 'bg-[#1B3A6B]' : 'bg-[#E2E8F0]'}`}
            >
              <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${design.deviceFrame.show ? 'translate-x-4' : ''}`} />
            </button>
          </div>
          {design.deviceFrame.show && (
            <>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">Color</label>
                <div className="mt-1 flex gap-2">
                  {(['black', 'white', 'titanium', 'none'] as const).map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => onDesignChange({ deviceFrame: { ...design.deviceFrame, color } })}
                      className={`flex-1 rounded-xl border py-2 text-xs font-semibold capitalize transition-all duration-200 ${design.deviceFrame.color === color ? 'border-[#1B3A6B] bg-[#1B3A6B] text-white' : 'border-[#E2E8F0] text-[#64748B] hover:border-[#1B3A6B]'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <SliderInput
                label="Shadow"
                value={design.deviceFrame.shadow}
                min={0}
                max={1}
                step={0.05}
                onChange={(shadow) => onDesignChange({ deviceFrame: { ...design.deviceFrame, shadow } })}
              />
            </>
          )}
        </div>
      )
    default:
      return null
  }
}
