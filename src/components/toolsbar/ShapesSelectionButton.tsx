import { useEffect, useRef, useState } from "react";
import { CanvasMode, CanvasState, LayerType } from "~/types";
import IconButton from "./IconButton";
import {IoEllipseOutline, IoSquareOutline} from "react-icons/io5"
import MenuIcon from "./MenuIcon";

export default function ShapesSelectionButton({
  isActive,
  canvasState,
  onClick
}: { 
  isActive: boolean,
  canvasState: CanvasState, 
  onClick: (layerType: LayerType.Rectangle | LayerType.Ellipse) => void
}) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleClick = (layerType: LayerType.Rectangle | LayerType.Ellipse) => {
    onClick(layerType)
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
      document.addEventListener('mousedown',handleClickOutside)
      
      return() => document.removeEventListener('mousedown',handleClickOutside)
  },[])

  return (
    <div className="relative flex" ref={menuRef}>
    <IconButton 
      isActive={isActive} 
      onClick={() => onClick(LayerType.Rectangle)}
    >
      {canvasState.mode !== CanvasMode.Inserting && <IoSquareOutline className="w-5 h-5"/>}
      {canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Rectangle && <IoSquareOutline className="w-5 h-5"/>}
      {canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse && <IoEllipseOutline className="w-5 h-5"/>}
    </IconButton>
    <button 
      onClick={() => setOpen(!open)}
      className="ml-1"
    >
      <MenuIcon />
    </button>
    {open && (
      <div className="absolute -top-20 mt-1 min-w-[150px] rounded-xl bg-[#1e1e1e] p-2 shadow-lg">
        <button className={`flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Rectangle ? "bg-blue-500" : ""}`} onClick={() => handleClick(LayerType.Rectangle)}>
          <span className="w-5 text-xs">
            {canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Rectangle && "✓"}
          </span>
          <IoSquareOutline className="mr-2 h-4 w-4"/>
          <span className="text-xs">Rectangle</span>
        </button>

        <button className={`flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse ? "bg-blue-500" : ""}`} onClick={() => handleClick(LayerType.Ellipse)}>
          <span className="w-5 text-xs">
            {canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse && "✓"}
          </span>
          <IoEllipseOutline className="mr-2 h-4 w-4"/>
          <span className="text-xs">Ellipse</span>
        </button>
      </div>
    )}
  </div>
  )
}