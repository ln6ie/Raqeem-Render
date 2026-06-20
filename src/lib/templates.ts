import type { PanoramicTheme } from '@/types'

export const PANORAMIC_THEMES: PanoramicTheme[] = [
  {
    id: 'trailblazer',
    name: 'Trailblazer',
    thumbnail: '/themes/trailblazer.png',
    globalFont: { titleColor: '#ffffff', subtitleColor: '#cbd5e1', family: 'Inter' },
    screens: [
      {
        layout: 'hero-center',
        hideDevice: true,
        bgOverride: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        decoration: {
          type: 'path',
          data: 'M0,937 C282,750 564,1125 1242,843 L1242,2688 L0,2688 Z',
          fill: 'rgba(56, 189, 248, 0.1)',
          x: 0,
          y: 0
        }
      },
      { layout: 'text-top', hideDevice: false, bgOverride: '#f8fafc' },
      { layout: 'text-top', hideDevice: false, bgOverride: '#f1f5f9' },
      { layout: 'text-top', hideDevice: false, bgOverride: '#f8fafc' },
      { layout: 'text-top', hideDevice: false, bgOverride: '#f1f5f9' }
    ]
  },
  {
    id: 'neon-horizon',
    name: 'Neon Horizon',
    thumbnail: '/themes/neon-horizon.png',
    globalFont: { titleColor: '#ffffff', subtitleColor: '#a78bfa', family: 'Inter' },
    screens: [
      {
        layout: 'text-top',
        hideDevice: false,
        bgOverride: '#000000',
        decoration: {
          type: 'circle',
          data: '400',
          fill: 'rgba(139, 92, 246, 0.3)',
          x: 621,
          y: 1344
        }
      },
      { layout: 'text-bottom', hideDevice: false, bgOverride: '#09090b' },
      { layout: 'hero-center', hideDevice: true, bgOverride: 'linear-gradient(180deg, #09090b 0%, #2e1065 100%)' },
      { layout: 'text-top', hideDevice: false, bgOverride: '#09090b' },
      { layout: 'text-bottom', hideDevice: false, bgOverride: '#000000' }
    ]
  },
  {
    id: 'flowing-gradient',
    name: 'Flowing Gradient',
    thumbnail: '/themes/flowing-gradient.png',
    globalFont: { titleColor: '#1e293b', subtitleColor: '#64748b', family: 'Cairo' },
    screens: [
      { layout: 'text-top', hideDevice: false, bgOverride: 'linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 100%)' },
      { layout: 'text-top', hideDevice: false, bgOverride: 'linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%)' },
      { layout: 'text-top', hideDevice: false, bgOverride: 'linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)' },
      { layout: 'text-top', hideDevice: false, bgOverride: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)' },
      { layout: 'hero-center', hideDevice: true, bgOverride: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdfa 100%)' }
    ]
  },
  {
    id: 'neon-badges',
    name: 'Neon Badges',
    thumbnail: '/themes/neon-badges.png',
    globalFont: { titleColor: '#ffffff', subtitleColor: '#cbd5e1', family: 'Cairo' },
    screens: [
      {
        layout: 'text-bottom',
        hideDevice: false,
        bgOverride: 'linear-gradient(135deg, #007AFF 0%, #004499 100%)',
        titleColor: '#ffffff',
        subtitleColor: '#e0f2fe',
        textAlign: 'left',
        badge: 'الواجهة الذكية',
        badgeBg: '#FFE600',
        badgeColor: '#0a0a0a',
        decoration: {
          type: 'circle',
          data: '320',
          fill: 'rgba(255,255,255,0.15)',
          x: 1035,
          y: 562
        }
      },
      {
        layout: 'text-top',
        hideDevice: false,
        bgOverride: '#0b132b',
        titleColor: '#ffffff',
        subtitleColor: '#9ab0e5',
        textAlign: 'left',
        badge: 'سرعة وكفاءة',
        badgeBg: '#007AFF',
        badgeColor: '#ffffff'
      },
      {
        layout: 'text-top',
        hideDevice: false,
        bgOverride: '#1c2541',
        titleColor: '#ffffff',
        subtitleColor: '#cbd5e1',
        textAlign: 'left',
        badge: 'تصميم متناسق',
        badgeBg: '#FFE600',
        badgeColor: '#0a0a0a',
        decoration: {
          type: 'circle',
          data: '280',
          fill: 'rgba(0,122,255,0.2)',
          x: 621,
          y: 2062
        }
      },
      {
        layout: 'text-top',
        hideDevice: false,
        bgOverride: 'linear-gradient(135deg, #0056b3 0%, #002244 100%)',
        titleColor: '#ffffff',
        subtitleColor: '#e0f2fe',
        textAlign: 'left',
        badge: 'تحديث فوري',
        badgeBg: '#ffffff',
        badgeColor: '#007AFF'
      },
      {
        layout: 'text-top',
        hideDevice: false,
        bgOverride: '#0a0f1d',
        titleColor: '#ffffff',
        subtitleColor: '#9ab0e5',
        textAlign: 'left',
        badge: 'تصدير سهل',
        badgeBg: '#FFE600',
        badgeColor: '#0a0a0a'
      }
    ]
  }
];

