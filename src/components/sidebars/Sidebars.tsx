'use client';

import { useMutation, useOthers, useSelf, useStorage } from "@liveblocks/react";
import Link from "next/link";
import { colorToCss, connectionIdToColor, hexToRgb } from "~/utils";
import { PiPathLight, PiSidebarSimpleThin } from 'react-icons/pi'
import { CanvasMode, CanvasState, Color, LayerType } from "~/types";
import { IoEllipseOutline, IoSquareOutline } from "react-icons/io5";
import { AiOutlineFontSize } from "react-icons/ai";
import LayerButton from "./LayerButton";
import NumberInput from "./NumberInput";
import { BsCircleHalf } from "react-icons/bs";
import { RiRoundedCorner } from "react-icons/ri";
import ColorPicker from "./ColorPicker";
import Dropdown from "./Dropdown";
import UserAvatar from "./UserAvatar";
import { User } from "@prisma/client";
import ShareMenu from "./ShareMenu";
import { FaFilePdf } from "react-icons/fa";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRef, useCallback } from "react";
import { ImageIcon } from "lucide-react";

export default function Sidebars({
  leftIsMinimized,
  setLeftIsMinimized,
  roomName,
  roomId,
  othersWithAccessToRoom,
  disabled,
  setCanvasState
}: {
  leftIsMinimized: boolean,
  setLeftIsMinimized: (value: boolean) => void,
  roomName: string,
  roomId: string,
  othersWithAccessToRoom: User[],
  disabled?: boolean
  setCanvasState: (state: CanvasState) => void
}) {
  const me = useSelf();
  const others = useOthers();

  const selectedLayer = useSelf((me) => {
    const selection = me.presence.selection;
    return selection.length === 1 ? selection[0] : null;
  })

  const layer = useStorage((root) => {
    if (!selectedLayer) return null;

    return root.layers.get(selectedLayer)
  })

  const roomColor = useStorage((root) => root.roomColor);

  const layers = useStorage((root) => root.layers);
  const layerIds = useStorage((root) => root.layerIds);

  // const reversedLayerIds = [...layerIds ?? []].reverse()

  const selection = useSelf((me) => me.presence.selection);

  const setRoomColor = useMutation(({ storage }, newColor: Color) => {
    storage.set("roomColor", newColor);
  }, [])

  const updateLayer = useMutation((
    { storage },
    updates: {
      x?: number,
      y?: number,
      width?: number,
      height?: number,
      opacity?: number,
      cornerRadius?: number,
      fill?: string,
      stroke?: string,
      fontSize?: number,
      fontWeight?: number,
      fontFamily?: string
    }
  ) => {
    if (!selectedLayer) return;

    const liveLayers = storage.get("layers");
    const layer = liveLayers.get(selectedLayer);

    if (layer) {
      layer.update({
        ...(updates.x !== undefined && { x: updates.x }),
        ...(updates.y !== undefined && { y: updates.y }),
        ...(updates.width !== undefined && { width: updates.width }),
        ...(updates.height !== undefined && { height: updates.height }),
        ...(updates.opacity !== undefined && { opacity: updates.opacity }),
        ...(updates.cornerRadius !== undefined && {
          cornerRadius: updates.cornerRadius,
        }),
        ...(updates.fill !== undefined && { fill: hexToRgb(updates.fill) }),
        ...(updates.stroke !== undefined && {
          stroke: hexToRgb(updates.stroke),
        }),
        ...(updates.fontSize !== undefined && { fontSize: updates.fontSize }),
        ...(updates.fontWeight !== undefined && {
          fontWeight: updates.fontWeight,
        }),
        ...(updates.fontFamily !== undefined && {
          fontFamily: updates.fontFamily,
        }),
      })
    }
  }, [selectedLayer])

  // Export Pdf Captures the SVG canvas using html2canvas Creates a PDF using jsPDF Saves the PDF with the room name or "canvas" as the filename
  
  // Direct Canvas Capture specifically targets just the canvas content by Cloning only the canvas container Removing UI elements before capture

  const handleExportToPDF = async () => {
    try {
      // Get the main canvas container
      const canvasContainer = document.querySelector('main > div') as HTMLElement;
      if (!canvasContainer) return;

      // Create a clone of the canvas container to avoid affecting the UI
      const clone = canvasContainer.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = `${canvasContainer.offsetWidth}px`;
      clone.style.height = `${canvasContainer.offsetHeight}px`;
      clone.style.backgroundColor = roomColor ? colorToCss(roomColor) : "#1E1E1E";

      // Remove any elements we don't want in the export
      const selectionTools = clone.querySelector('.selection-tools');
      if (selectionTools) selectionTools.remove();

      document.body.appendChild(clone);

      // Use html2canvas with specific options
      const canvas = await html2canvas(clone, {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        ignoreElements: (element) => {
          // Ignore any remaining UI elements
          return element.classList.contains('selection-tools') ||
            element.classList.contains('sidebar') ||
            element.classList.contains('tools-bar');
        }
      });

      // Remove the clone
      document.body.removeChild(clone);

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${roomName || 'canvas'}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      if (src) {
        setCanvasState({
          mode: CanvasMode.Inserting,
          layerType: LayerType.Image,
          src
        });
      }
    };
    reader.readAsDataURL(file);
  }, [setCanvasState]);

  return (
    <>
      {/* Left Sidbar */}
      {!disabled && (
        !leftIsMinimized ? (
          <div className="fixed left-0 flex h-screen w-[240px] flex-col border-r border-gray-200 bg-white overflow-y-scroll">
            <div className="p-4">
              <div className="flex justify-between">
                <Link href='/des_dashboard'>
                  <img
                    src='/home.svg'
                    alt="dashboard"
                    className="h-[18px] w-[18px]"
                  />
                </Link>
                <PiSidebarSimpleThin className="w-5 h-5 cursor-pointer" onClick={() => setLeftIsMinimized(true)} />
              </div>

              <h2 className="mt-2 scroll-m-20 text-[13px] font-medium">
                {roomName}
              </h2>
            </div>

            <div className="border-b border-gray-200" />

            <div className="flex flex-col gap-1 p-4">
              <span className="mb-2 text-[11px] font-medium">
                Layers
              </span>
              {layerIds && layerIds.map((id) => {
                const layer = layers?.get(id);
                const isSelected = selection?.includes(id);
                if (layer?.type === LayerType.Rectangle) {
                  return <LayerButton key={id}
                    layerId={id} text="Rectangle" isSelected={isSelected ?? false} icon={<IoSquareOutline className="h-3 w-3 text-gray-500" />} />
                }
                else if (layer?.type === LayerType.Ellipse) {
                  return <LayerButton key={id} layerId={id} text="Ellipse" isSelected={isSelected ?? false} icon={<IoEllipseOutline className="h-3 w-3 text-gray-500" />} />
                }
                else if (layer?.type === LayerType.Path) {
                  return <LayerButton key={id} layerId={id} text="Drawing" isSelected={isSelected ?? false} icon={<PiPathLight className="h-3 w-3 text-gray-500" />} />
                }
                else if (layer?.type === LayerType.Text) {
                  return <LayerButton key={id} layerId={id} text="Text" isSelected={isSelected ?? false} icon={<AiOutlineFontSize className="h-3 w-3 text-gray-500" />} />
                }
              })}
            </div>
          </div>
        )

        :

        (
          <div className="fixed left-3 top-3 h-[48px] w-[250px] justify-between items-center flex rounded-xl border bg-white p-4">
            <Link href='/des_dashboard'>
              <img
                src='/home.svg'
                alt="dashboard"
                className="h-[18px] w-[18px]"
              />
            </Link>
            <h2 className="scroll-m-20 text-[13px] font-medium">
              {roomName}
            </h2>
            <PiSidebarSimpleThin
              className="w-5 h-5 cursor-pointer"
              onClick={() => setLeftIsMinimized(false)}
            />
          </div>
        )
      )}
      

      {/* Right Sidbar */}
      {disabled ? (
        <div className="fixed right-3 top-3 flex h-[48px] items-center rounded-xl border bg-white px-3">
          <div className="flex gap-2 overflow-x-scroll text-xs">
            {me && (
              <UserAvatar
                color={connectionIdToColor(me.connectionId)}
                name={me.info.name}
              />
            )}
            {others.map((other) => (
              <UserAvatar
                key={other.connectionId}
                color={connectionIdToColor(other.connectionId)}
                name={other.info.name}
              />
            ))}
          </div>
        </div>
      ): (
        !leftIsMinimized || layer ? (
        <div className={`fixed ${leftIsMinimized && layer ? "bottom-3 right-3 top-3 rounded-xl" : ""} ${!leftIsMinimized && !layer ? "h-screen" : ""} ${!leftIsMinimized && layer ? "bottom-0 top-0 h-screen" : ""} right-0 w-[240px] flex flex-col border-l border-gray-200 bg-white overflow-y-scroll`}>

          <div className="flex items-center justify-between pr-2">
            <div className="flex w-full max-w-36 gap-2 overflow-x-scroll p-3 text-xs">
              {me && (
                <UserAvatar
                  color={connectionIdToColor(me.connectionId)}
                  name={me.info.name}
                />
              )}

              {others.map((other) => (
                <UserAvatar
                  key={other.connectionId}
                  color={connectionIdToColor(other.connectionId)}
                  name={other.info.name}
                />
              ))}

            </div>
            {!disabled && (
              <div className="flex gap-2">
                <ShareMenu
                  roomId={roomId}
                  othersWithAccessToRoom={othersWithAccessToRoom}
                />

                <button
                  onClick={handleExportToPDF}
                  className="p-2 rounded hover:bg-gray-100"
                  title="Export to PDF"
                >
                  <FaFilePdf className="w-4 h-4 text-red-600" />
                </button>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200" />
          {layer ? (
            <>
              <div className="flex flex-col gap-2 p-4">
                <span className="mb-2 text-[11px] font-medium">
                  Position
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-[9px] font-medium text-gray-500">
                    Position
                  </p>
                  <div className="flex w-full gap-2">
                    <NumberInput
                      value={layer.x}
                      onChange={(number) => {
                        updateLayer({ x: number })
                      }}
                      className="w-1/2"
                      icon={<p>X</p>}
                    />
                    <NumberInput
                      value={layer.y}
                      onChange={(number) => {
                        updateLayer({ y: number })
                      }}
                      className="w-1/2"
                      icon={<p>Y</p>}
                    />
                  </div>
                </div>
              </div>

              {layer.type !== LayerType.Path && (
                <>
                  <div className="border-b border-gray-200" />
                  <div className="flex flex-col gap-2 p-4">
                    <span className="mb-2 text-[11px] font-medium">
                      Layout
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="text-[9px] font-medium text-gray-500">
                        Dimensions
                      </p>
                      <div className="flex w-full gap-2">
                        <NumberInput
                          value={layer.width}
                          onChange={(number) => {
                            updateLayer({ width: number })
                          }}
                          className="w-1/2"
                          icon={<p>W</p>}
                        />
                        <NumberInput
                          value={layer.height}
                          onChange={(number) => {
                            updateLayer({ height: number })
                          }}
                          className="w-1/2"
                          icon={<p>H</p>}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="border-b border-gray-200" />
              <div className="flex flex-col gap-2 p-4">
                <span className="mb-2 text-[11px] font-medium">
                  Appearance
                </span>
                <div className="flex w-full gap-2">
                  <div className="flex w-1/2 flex-col gap-1">
                    <p className="text-[9px] font-medium text-gray-500">
                      Opacity
                    </p>
                    <NumberInput
                      value={layer.opacity}
                      min={0}
                      max={100}
                      onChange={(number) => {
                        updateLayer({ opacity: number })
                      }}
                      className="w-full"
                      icon={<BsCircleHalf />}
                    />
                  </div>

                  {layer.type === LayerType.Rectangle && (
                    <div className="flex w-1/2 flex-col gap-1">
                      <p className="text-[9px] font-medium text-gray-500">
                        Corner Radius
                      </p>
                      <NumberInput
                        value={layer.cornerRadius ?? 0}
                        min={0}
                        max={100}
                        onChange={(number) => {
                          updateLayer({ cornerRadius: number })
                        }}
                        className="w-full"
                        icon={<RiRoundedCorner />}
                      />
                    </div>
                  )}
                </div>
              </div>

              {layer.type !== LayerType.Image && (
                <div className="flex w-full">
                  <div className="border-b border-gray-200" />
                  <div className="flex flex-col gap-2 p-4">
                    <span className="mb-2 text-[11px] font-medium">
                      Fill
                    </span>
                    <ColorPicker
                      value={colorToCss(layer.fill)}
                      onChange={(color) => {
                        updateLayer({ fill: color, stroke: color })
                      }}
                    />
                  </div>

                  <div className="border-b border-gray-200" />
                  <div className="flex flex-col gap-2 p-4 -translate-x-[30px]">
                    <span className="mb-2 text-[11px] font-medium">
                      Stroke
                    </span>
                    <ColorPicker
                      value={colorToCss(layer.stroke)}
                      onChange={(color) => {
                        updateLayer({ stroke: color })
                      }}
                      type="stroke"
                    />
                  </div>
                </div>
              )}

              {layer.type === LayerType.Text && (
                <>
                  <div className="border-b border-gray-200" />
                  <div className="flex flex-col gap-2 p-4">
                    <span className="mb-2 text-[11px] font-medium">
                      Typography
                    </span>
                    <div className="flex flex-col gap-2">
                      <Dropdown
                        value={layer.fontFamily}
                        onChange={(value) => {
                          updateLayer({ fontFamily: value })
                        }}
                        options={["Inter", "Ariel", "Times New Roman"]}
                      />

                      <div className="flex w-full gap-2">
                        <div className="flex w-full flex-col gap-1">
                          <p className="text-[9px] font-medium text-gray-500">
                            Size
                          </p>
                          <NumberInput
                            value={layer.fontSize}
                            onChange={(number) => {
                              updateLayer({ fontSize: number })
                            }}
                            className="w-full"
                            icon={<p>W</p>}
                          />
                        </div>

                        <div className="flex w-full flex-col gap-1">
                          <p className="text-[9px] font-medium text-gray-500">
                            Weight
                          </p>
                          <Dropdown
                            value={layer.fontWeight.toString()}
                            onChange={(value) => {
                              updateLayer({ fontWeight: Number(value) })
                            }}
                            options={["100", "200", "300", "400", "500", "600", "700", "800", "900"]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )

          :

          (
            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-col gap-2">
                <span className="mb-2 text-[11px] font-medium">
                  Page
                </span>
                <ColorPicker
                  value={roomColor ? colorToCss(roomColor) : "#1e1e1e"}
                  onChange={(color) => {
                    const rgbColor = hexToRgb(color);
                    setRoomColor(rgbColor);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-medium">Import</span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-xs p-2 rounded hover:bg-gray-100 border"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Image</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>
      )

      :

      (
        <div className="fixed right-3 top-3 flex h-[48px] w-[250px] items-center justify-between rounded-xl border bg-white pr-2">
          <div className="flex w-full max-w-36 gap-2 overflow-x-scroll p-3 text-xs">
            {me && (
              <UserAvatar
                color={connectionIdToColor(me.connectionId)}
                name={me.info.name}
              />
            )}

            {others.map((other) => (
              <UserAvatar
                key={other.connectionId}
                color={connectionIdToColor(other.connectionId)}
                name={other.info.name}
              />
            ))}
          </div>
          {!disabled && (
            <div className="flex gap-2">
              <ShareMenu
                roomId={roomId}
                othersWithAccessToRoom={othersWithAccessToRoom}
              />
              
              <button
                onClick={handleExportToPDF}
                className="p-2 rounded hover:bg-gray-100"
                title="Export to PDF"
              >
                <FaFilePdf className="w-4 h-4 text-red-600" />
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  )
}