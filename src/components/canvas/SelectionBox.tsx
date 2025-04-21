import { useSelf, useStorage } from "@liveblocks/react";
import { memo, useEffect, useRef, useState } from "react";
import { LayerType, Side, XYWH } from "~/types";

const handleWidth = 8;

const SelectionBox = memo(
  ({
    onResizeHandlePointerDown,
  }: {
    onResizeHandlePointerDown: (corner: Side, initalBuild: XYWH) => void;
  }) => {
    
    const soleLayerId = useSelf((me) => me.presence.selection.length === 1 ? me.presence.selection[0] : null)

    const isShowingHandles = useStorage((root) => {
      if (!soleLayerId) return false;
      const layer = root.layers.get(soleLayerId);
      return layer?.type !== LayerType.Path;
    });  
    
    const textRef = useRef<SVGTextElement>(null);
    const [textWidth, setTextWidth] = useState(0);
    const padding = 16;

    const layers = useStorage((root) => root.layers);
    const layer = soleLayerId ? layers?.get(soleLayerId) : null;

    useEffect(() => {
      if (textRef.current) {
        const bbox = textRef.current.getBBox();
        setTextWidth(bbox.width)
      }
    },[layer])

    if(!layer) return null;

    return (
      <>
        <rect 
          className="pointer-events-none fill-transparent stroke-[#0b99ff] stroke-[1px]"
          style={{transform: `translate(${layer.x}px, ${layer.y}px)`}}
          width={layer.width}
          height={layer.height}
        />
        <rect 
          className="fill-[#0b99ff]"
          x={layer.x + layer.width / 2 - (textWidth + padding) / 2}
          y={layer.y + layer.height + 10}
          width={textWidth + padding}
          height={20}
          rx={4}
        />
        <text 
          className="pointer-events-none fill-white text-[11px]"
          style={{transform: `translate(${layer.x + layer.width/2}px, ${layer.y + layer.height + 25}px)`}}
          textAnchor="middle"
          ref={textRef}
        >
          {Math.round(layer.width)} x {Math.round(layer.height)}
        </text>
        {isShowingHandles && (
          <>
            {/* top-left */}
            <rect
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              style={{
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${layer.x - handleWidth / 2}px, ${layer.y - handleWidth / 2}px)`,
                cursor: 'nwse-resize'
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top + Side.Left, layer)
              }}
            />

            {/* top */}
            <rect 
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              style={{
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${layer.x + layer.width / 2 - handleWidth / 2}px, ${layer.y - handleWidth / 2}px)`,
                cursor: 'ns-resize'
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top, layer)
              }}
            />

            {/* top-right */}
            <rect 
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              style={{
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${layer.x + layer.width - handleWidth / 2}px, ${layer.y - handleWidth / 2}px)`,
                cursor: 'nesw-resize'
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top + Side.Right, layer)
              }}
            />

            {/* left */}
            <rect 
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              style={{
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${layer.x - handleWidth / 2}px, ${layer.y + layer.height / 2 - handleWidth / 2}px)`,
                cursor: 'ew-resize'
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Left, layer)
              }}
            />

            {/* bottom-left */}
            <rect 
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              style={{
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${layer.x - handleWidth / 2}px, ${layer.y + layer.height - handleWidth / 2}px)`,
                cursor: 'nesw-resize'
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom + Side.Left, layer)
              }}
            />

            {/* right */}
            <rect 
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              style={{
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${layer.x + layer.width - handleWidth / 2}px, ${layer.y + layer.height / 2 - handleWidth / 2}px)`,
                cursor: 'ew-resize'
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Right, layer)
              }}
            />

            {/* bottom-right */}
            <rect 
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              style={{
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${layer.x + layer.width - handleWidth / 2}px, ${layer.y + layer.height - handleWidth / 2}px)`,
                cursor: 'nwse-resize'
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Right + Side.Bottom, layer)
              }}
            />

            {/* bottom */}
            <rect 
              className="fill-white stroke-[#0b99ff] stroke-[1px]"
              style={{
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${layer.x + layer.width / 2 - handleWidth / 2}px, ${layer.y + layer.height - handleWidth / 2}px)`,
                cursor: 'ns-resize'
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom, layer)
              }}
            />
          </>
        )}
      </>
    );
  }
);

SelectionBox.displayName = "SelectionBox";

export default SelectionBox;