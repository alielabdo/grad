'use client';

import { useMutation, useStorage } from "@liveblocks/react";
import { ReactNode } from "react"
import { LayerType } from "~/types";

const LayerButton = ({
  layerId, 
  text, 
  icon,
  isSelected
} : {
  layerId: string, 
  text: string, 
  icon: ReactNode,
  isSelected: boolean
}) => {

  const updateSelection = useMutation(({setMyPresence}, layerId: string) => {
    setMyPresence({selection: [layerId]}, {addToHistory: true})
  },[])

  const layer = useStorage((root) => root.layers.get(layerId))

  return (
    <button 
      className={`flex items-center gap-2 rounded px-1.5 py-1 text-left text-[11px] hover:bg-gray-100 ${isSelected ? "bg-[#bce3ff]" : ""}`} 
      onClick={() => updateSelection(layerId)}  
    >
      {icon}
      <span>
        {layer?.type === LayerType.Text ? layer.text : text}
      </span>
    </button>
  )
}

export default LayerButton;