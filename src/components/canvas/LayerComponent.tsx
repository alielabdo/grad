import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import { CanvasState, LayerType } from "~/types";
import Rectangle from "./Rectangle";
import Ellipse from './Ellipse';
import Text from "./Text";
import Path from "./Path";
import Image from "./Image";
import { colorToCss } from "~/utils";

const LayerComponent = memo(({
  id, 
  onLayerPointerDown,
  canvasState
} : {
  id: string, 
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void,
  canvasState: CanvasState
}) => {
  const layer = useStorage((root) => root.layers.get(id))
  if(!layer) {
    return null;
  }
  switch(layer.type) {
    case LayerType.Rectangle :
      return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown}/>;
    case LayerType.Ellipse :
      return <Ellipse id={id} layer={layer} onPointerDown={onLayerPointerDown}/>;
    case LayerType.Text :
      return  <Text id={id} layer={layer} onPointerDown={onLayerPointerDown}/>
    case LayerType.Path :
      return (
        <Path 
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          points={layer.points} 
          x={layer.x} 
          y={layer.y} 
          fill={layer.fill ? colorToCss(layer.fill) : "#CCC"} 
          stroke={layer.stroke ? colorToCss(layer.stroke) : "#CCC"}
          opacity={layer.opacity}
          canvasState={canvasState}
        />
      )
    case LayerType.Image:
      return <Image id={id} layer={layer} onPointerDown={onLayerPointerDown} />;
    default :
      return null;
  }
})

LayerComponent.displayName = "LayerComponent"

export default LayerComponent;