'use client'

import { Stage, Layer, Rect, Circle, Text, Image as KonvaImage, Path } from 'react-konva'
import type { CanvasStageRendererProps } from '@/types'

export default function CanvasStageRenderer({
  screen, project, scale, screenshotImg, derived: v, onUploadClick, onEditField, stageRef // <=== 1. أضفنا استلام المرجع هنا
}: CanvasStageRendererProps & { stageRef: React.RefObject<any> }) {
  return (
    <Stage 
      ref={stageRef} // <=== 2. قمنا بربط المرجع هنا لكي يراه نظام التصدير
      width={1242 * scale} 
      height={2688 * scale} 
      scaleX={scale} 
      scaleY={scale}
      preventDefault={false} 
      style={{ touchAction: 'pan-x' }}
    >
      <Layer listening={false}>
        <Rect x={0} y={0} width={1242} height={2688}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: 0, y: 2688 }}
          fillLinearGradientColorStops={v.colorStops}
        />
      </Layer>

      {!v.isHideDevice && (
        <Layer>
          {screenshotImg ? (
            <KonvaImage image={screenshotImg} x={103.5} y={v.deviceY} width={1035} height={2240}
              cornerRadius={v.deviceRadius} onClick={onUploadClick} />
          ) : (
            <Rect x={103.5} y={v.deviceY} width={1035} height={2240}
              fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)"
              strokeWidth={4} dash={[20, 10]} cornerRadius={v.deviceRadius} onClick={onUploadClick} />
          )}
        </Layer>
      )}

      {v.showDevice && (
        <Layer>
          <Rect x={103.5} y={v.deviceY} width={1035} height={2240} cornerRadius={v.deviceRadius}
            fill="transparent" stroke={v.frameColor}
            strokeWidth={project.globalDeviceType === 'android-ultra' ? 18 :
              project.globalDeviceType === 'android-punch' ? 22 :
              project.globalDeviceType === 'iphone-classic' ? 28 : 24}
            onClick={onUploadClick}
          />
          {project.globalDeviceType === 'iphone-pro' && (
            <Rect x={461} y={v.deviceY + 36} width={320} height={96} cornerRadius={48}
              fill="#000000" onClick={onUploadClick} />
          )}
          {project.globalDeviceType === 'iphone-classic' && (
            <Rect x={461} y={v.deviceY} width={320} height={75} cornerRadius={[0, 0, 26, 26]}
              fill="#000000" onClick={onUploadClick} />
          )}
          {(project.globalDeviceType === 'android-ultra' || project.globalDeviceType === 'android-punch') && (
            <Circle x={621} y={v.deviceY + 46} radius={20} fill="#000000" onClick={onUploadClick} />
          )}
        </Layer>
      )}

      <Layer>
        <Text text={screen.title} x={v.titleX} y={v.titleY} width={1082}
              fontSize={90} fill={v.activeTitleColor} fontStyle="bold" fontFamily="Cairo"
              align={v.titleAlign} onClick={() => onEditField('title')} />
        <Text text={screen.subtitle} x={v.titleX} y={v.subtitleY} width={1082}
              fontSize={52} fill={v.activeSubtitleColor} fontStyle="bold" fontFamily="Cairo"
              align={v.titleAlign} onClick={() => onEditField('subtitle')} />
      </Layer>
    </Stage>
  )
}
