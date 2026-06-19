import type { Template } from "@/types"

export const TEMPLATES: Template[] = [
  {
    id: 'clean-white',
    name: 'Clean White',
    thumbnail: '/templates/clean-white.svg',
    background: { type: 'solid', value: '#FFFFFF' },
    deviceFrame: { show: false, color: 'none', shadowIntensity: 0 },
    text: {
      title: { value: 'Your App Name', color: '#0F172A', size: 42, weight: '700', position: 'bottom' },
      subtitle: { value: 'A short description of your amazing app', color: '#64748B', size: 20, position: 'bottom' },
    },
    layout: 'screenshot-center',
  },
  {
    id: 'royal-blue',
    name: 'Royal Blue',
    thumbnail: '/templates/royal-blue.svg',
    background: { type: 'solid', value: '#1B3A6B' },
    deviceFrame: { show: true, color: 'titanium', shadowIntensity: 0.3 },
    text: {
      title: { value: 'Your App Name', color: '#FFFFFF', size: 48, weight: '800', position: 'top' },
      subtitle: { value: 'A short description of your amazing app', color: '#E8EEF8', size: 22, position: 'top' },
    },
    layout: 'screenshot-bottom',
  },
  {
    id: 'soft-gradient',
    name: 'Soft Gradient',
    thumbnail: '/templates/soft-gradient.svg',
    background: { type: 'gradient', value: 'linear-gradient(180deg, #E8EEF8 0%, #FFFFFF 100%)' },
    deviceFrame: { show: true, color: 'black', shadowIntensity: 0.2 },
    text: {
      title: { value: 'Your App Name', color: '#0F172A', size: 40, weight: '700', position: 'top' },
      subtitle: { value: 'A short description of your amazing app', color: '#64748B', size: 20, position: 'top' },
    },
    layout: 'screenshot-bottom',
  },
  {
    id: 'dark-slate',
    name: 'Dark Slate',
    thumbnail: '/templates/dark-slate.svg',
    background: { type: 'solid', value: '#0F172A' },
    deviceFrame: { show: true, color: 'white', shadowIntensity: 0.4 },
    text: {
      title: { value: 'Your App Name', color: '#FFFFFF', size: 44, weight: '800', position: 'bottom' },
      subtitle: { value: 'A short description of your amazing app', color: '#94A3B8', size: 20, position: 'bottom' },
    },
    layout: 'screenshot-top',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: '/templates/minimal.svg',
    background: { type: 'solid', value: '#F8FAFC' },
    deviceFrame: { show: false, color: 'none', shadowIntensity: 0 },
    text: {
      title: { value: 'Your App Name', color: '#0F172A', size: 36, weight: '600', position: 'bottom' },
      subtitle: { value: 'A short caption', color: '#64748B', size: 18, position: 'bottom' },
    },
    layout: 'screenshot-center',
  },
  {
    id: 'bold-blue',
    name: 'Bold Blue',
    thumbnail: '/templates/bold-blue.svg',
    background: { type: 'solid', value: '#2952A3' },
    deviceFrame: { show: true, color: 'black', shadowIntensity: 0.35 },
    text: {
      title: { value: 'Your App Name', color: '#FFFFFF', size: 52, weight: '800', position: 'bottom' },
      subtitle: { value: 'A short description of your amazing app', color: '#E8EEF8', size: 22, position: 'bottom' },
    },
    layout: 'screenshot-top',
  },
]

export const getTemplateById = (id: string): Template | undefined => {
  return TEMPLATES.find((t) => t.id === id)
}
