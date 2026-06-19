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
          data: 'M0,1000 C300,800 600,1200 1320,900 L1320,2868 L0,2868 Z',
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
          x: 660,
          y: 1434
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
    globalFont: { titleColor: '#111111', subtitleColor: '#333333', family: 'Cairo' },
    screens: [
      {
        layout: 'text-bottom',
        hideDevice: false,
        bgOverride: '#29C5F6',
        titleColor: '#0a0a0a',
        subtitleColor: '#0a0a0a',
        textAlign: 'left',
        badge: 'الثروة الرقمية',
        badgeBg: '#FFE600',
        badgeColor: '#0a0a0a',
        decoration: {
          type: 'circle',
          data: '320',
          fill: 'rgba(255,255,255,0.12)',
          x: 1100,
          y: 600
        }
      },
      {
        layout: 'text-top',
        hideDevice: false,
        bgOverride: '#f5f5f5',
        titleColor: '#0a0a0a',
        subtitleColor: '#0a0a0a',
        textAlign: 'left',
        badge: 'ابدأ الاستثمار اليوم',
        badgeBg: '#0a0a0a',
        badgeColor: '#ffffff'
      },
      {
        layout: 'text-top',
        hideDevice: false,
        bgOverride: '#0f0f0f',
        titleColor: '#ffffff',
        subtitleColor: '#ffffff',
        textAlign: 'left',
        badge: 'ابنِ ثروتك',
        badgeBg: '#FFE600',
        badgeColor: '#0a0a0a',
        decoration: {
          type: 'circle',
          data: '280',
          fill: 'rgba(255,230,0,0.08)',
          x: 660,
          y: 2200
        }
      },
      {
        layout: 'text-top',
        hideDevice: false,
        bgOverride: '#FFE600',
        titleColor: '#0a0a0a',
        subtitleColor: '#0a0a0a',
        textAlign: 'left',
        badge: 'تعلم قبل أن تستثمر',
        badgeBg: '#0a0a0a',
        badgeColor: '#FFE600'
      },
      {
        layout: 'text-top',
        hideDevice: false,
        bgOverride: '#131313',
        titleColor: '#ffffff',
        subtitleColor: '#ffffff',
        textAlign: 'left',
        badge: 'استكشف الأسواق',
        badgeBg: '#FFE600',
        badgeColor: '#0a0a0a'
      }
    ]
  }
];

