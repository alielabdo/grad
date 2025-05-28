import { ImageLayer } from "~/types";

export default function Image({
  id,
  layer,
  onPointerDown
}: {
  id: string,
  layer: ImageLayer,
  onPointerDown: (e: React.PointerEvent, layerId: string) => void
}) {
  const { x, y, width, height, opacity, src } = layer;

  return (
    <g className="group hover:cursor-move">
      {/* Hover Border */}
      <rect
        style={{ transform: `translate(${x}px, ${y}px)` }}
        className="pointer-events-none opacity-0 group-hover:opacity-100"
        width={width}
        height={height}
        fill="none"
        stroke="#0b99ff"
        strokeWidth="4"
      />

      {/* Image */}
      {/* foreignObject acts as a "bridge" to render HTML content within SVG */}
      <foreignObject
        x={x}
        y={y}
        width={width}
        height={height}
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
          opacity: `${opacity ?? 100}%`,
        }}
      >
        <img
          src={src}
          alt="Imported"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
      </foreignObject>
    </g>
  );
}