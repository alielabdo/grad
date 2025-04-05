'use client';

import { useMutation, useStorage } from "@liveblocks/react";
import { colorToCss, pointerEventToCanvasPoint } from "~/utils";
import LayerComponent from "./LayerComponent";
import { Camera, Layer, LayerType,Point, RectangleLayer, EllipseLayer, CanvasState, CanvasMode } from "~/types";
import {nanoid} from 'nanoid'
import { LiveObject } from "@liveblocks/client";
import React, { useState } from "react";
import ToolsBar from "../toolsbar/ToolsBar";

const MAX_LAYERS = 100;

export default function Canvas() {

  const roomColor = useStorage((root) => root.roomColor)
  const layerIds = useStorage((root) => root.layerIds)

  const [camera,setCamera] = useState<Camera>({x:0,y:0,zoom:1})
  const [canvasState, setCanvasState] = useState<CanvasState>({mode: CanvasMode.None})

  const insertLayer = useMutation(
    (
      {storage,setMyPresence},
      layerType : LayerType.Ellipse | LayerType.Rectangle | LayerType.Text, 
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return
      }
      const liveLayerIds = storage.get("layerIds")
      const layerId = nanoid();
      let layer: LiveObject<Layer> | null = null;

      if(layerType === LayerType.Rectangle) {
        layer = new LiveObject<RectangleLayer>({
          type: LayerType.Rectangle,
          x: position.x,
          y: position.y,
          height: 100,
          width: 100,
          fill: {r:217, g:217, b:217},
          stroke: {r:217, g:217, b:217},
          opacity:100,
        })
      }
      else if(layerType === LayerType.Ellipse) {
        layer = new LiveObject<EllipseLayer>({
          type: LayerType.Ellipse,
          x: position.x,
          y: position.y,
          height: 100,
          width: 100,
          fill: {r:217, g:217, b:217},
          stroke: {r:217, g:217, b:217},
          opacity:100,
        })
      }
      if (layer)  {
        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({selection: [layerId]}, {addToHistory: true})
      }
    },[]
  )

  const onPointerUp = useMutation(({}, e:React.PointerEvent) => {
    const point = pointerEventToCanvasPoint(e,camera)

    if (canvasState.mode === CanvasMode.None) {
      setCanvasState({mode: CanvasMode.None})
    }
    else if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(
        canvasState.layerType,
        point
      )
    }
  },[canvasState, setCanvasState, insertLayer])

  return (
    <div className="flex h-screen w-full">
      <main className="fixed left-0 right-0 h-screen overflow-y-auto">
        <div 
          style={{backgroundColor: roomColor ? colorToCss(roomColor) : "#1E1E1E"}}
          className="h-full w-full touch-none"
        >
          <svg onPointerUp={onPointerUp} className="w-full h-full">
            <g>
              {layerIds?.map((layerId) => (<LayerComponent key={layerId} id={layerId}/>))}
            </g>
          </svg>
        </div>
      </main>
      <ToolsBar
        canvasState={canvasState}
        setCanvasState={(newState) => setCanvasState(newState)}
        zoomIn={function (): void {
          throw new Error("Function not implemented.");
        } } 
        zoomOut={function (): void {
          throw new Error("Function not implemented.");
        } } 
        canZoomIn={false} 
        canZoomOut={false}
      />
    </div>
  )
}