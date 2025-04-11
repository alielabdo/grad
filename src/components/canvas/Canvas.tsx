'use client';

import { useMutation, useStorage } from "@liveblocks/react";
import { colorToCss, pointerEventToCanvasPoint } from "~/utils";
import LayerComponent from "./LayerComponent";
import { Camera, Layer, LayerType,Point, RectangleLayer, EllipseLayer, CanvasState, CanvasMode } from "~/types";
import {nanoid} from 'nanoid'
import { LiveObject } from "@liveblocks/client";
import React, { useCallback, useState } from "react";
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

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
      zoom: camera.zoom,
    }));
  }, []);

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
    else if (canvasState.mode === CanvasMode.Dragging) {
      setCanvasState({mode: CanvasMode.Dragging,origin: null})
    }
  },[canvasState, setCanvasState, insertLayer])

  const onPointerDown = useMutation(({}, e:React.PointerEvent) => {
    const point = pointerEventToCanvasPoint(e,camera)

    if (canvasState.mode === CanvasMode.Dragging) {
      setCanvasState({mode: CanvasMode.Dragging, origin: point})
    }
  },[canvasState.mode, setCanvasState, camera])

  const onPointerMove = useMutation(({}, e:React.PointerEvent) => {
    const point = pointerEventToCanvasPoint(e,camera)

    if (canvasState.mode === CanvasMode.Dragging && canvasState.origin !== null) {
      const deltaX = e.movementX
      const deltaY = e.movementY

      setCamera((camera) => ({
        x: camera.x + deltaX,
        y: camera.y + deltaY,
        zoom: camera.zoom
      }))
    }
  },[canvasState, setCanvasState, insertLayer])

  return (
    <div className="flex h-screen w-full">
      <main className="fixed left-0 right-0 h-screen overflow-y-auto">
        <div 
          style={{backgroundColor: roomColor ? colorToCss(roomColor) : "#1E1E1E"}}
          className="h-full w-full touch-none"
        >
          <svg 
            onWheel={onWheel} 
            onPointerUp={onPointerUp} className="w-full h-full"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
          >
            <g 
              style={{
                transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`
              }}
            >
              {layerIds?.map((layerId) => (<LayerComponent key={layerId} id={layerId}/>))}
            </g>
          </svg>
        </div>
      </main>
      <ToolsBar
        canvasState={canvasState}
        setCanvasState={(newState) => setCanvasState(newState)}
        zoomIn={() => {
          setCamera((camera) => ({...camera, zoom: camera.zoom + 0.1}))
        }} 
        zoomOut={() => {
          setCamera((camera) => ({...camera, zoom: camera.zoom - 0.1}))
        }} 
        canZoomIn={camera.zoom < 2} 
        canZoomOut={camera.zoom > 0.5}
      />
    </div>
  )
}