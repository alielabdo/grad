import { EllipseLayer } from "~/types";
import { colorToCss } from "~/utils";

export default function Ellipse({
  id,
  layer,
  onPointerDown
} : {
  id : string , 
  layer : EllipseLayer
  onPointerDown: (e: React.PointerEvent, layerId: string) => void
}) {
  const {x,y,width,height,fill,stroke,opacity} = layer
  return (
    <g className="group hover:cursor-move">
      {/* Hover Border */}
      <ellipse
        style={{transform: `translate(${x}px, ${y}px)`}} 
        className="pointer-events-none opacity-0 group-hover:opacity-100"
        cx={width/2}
        cy={height/2}
        rx={width/2}
        ry={height/2}
        fill="none"
        stroke="#0b99ff"
        strokeWidth="4"
      />
      {/* Ellipse */}
      <ellipse 
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{transform: `translate(${x}px, ${y}px)`}}
        fill={fill ? colorToCss(fill) : "#CCC"} 
        stroke={stroke ? colorToCss(stroke) : "#CCC"}
        cx={width/2}
        cy={height/2}
        rx={width/2}
        ry={height/2}
        strokeWidth="1"
        opacity={`${opacity ?? 100}%`}
      />
    </g>
  )
}