"use client";

import { Room } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useEffect, useMemo, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { deleteRoom, updateRoomTitle } from "~/app/actions/rooms";

const PASTEL_COLORS = [
  "rgb(255, 182, 193)", // pink
  "rgb(176, 224, 230)", // powder blue
  "rgb(221, 160, 221)", // plum
  "rgb(188, 143, 143)", // rosy brown
  "rgb(152, 251, 152)", // pale green
  "rgb(238, 232, 170)", // pale goldenrod
  "rgb(230, 230, 250)", // lavender
  "rgb(255, 218, 185)", // peach
];

export default function RoomsView({
  ownedRooms,
  roomInvites,
  disabled
} :
{
  ownedRooms: Room[],
  roomInvites: Room[],
  disabled?: boolean
}) {

  const [viewMode, setViewMode] = useState("owns");
  const [selected, setSelected] = useState<string | null>(null)
  const [navigating, setNavigating] = useState(false);

  const router = useRouter();

  const outerDivRef = useRef<HTMLDivElement>(null);

  const filteredRooms = useMemo(() => {
    if (disabled) {
      return roomInvites;
    }

    if (viewMode === "owns") {
      return ownedRooms;
    }
    else if (viewMode === "shared") {
      return roomInvites;
    }
    return [];
  }, [viewMode, ownedRooms, roomInvites])

  const roomColors = useMemo(() => {
    return filteredRooms.map((room, index) => ({
      id: room.id,
      color: PASTEL_COLORS[index % PASTEL_COLORS.length]
    }))
  }, [filteredRooms])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (outerDivRef.current && !outerDivRef.current.contains(e.target as Node)) {
        setSelected(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, []);

  return (
    <div className="flex flex-col gap-5" ref={outerDivRef}>
      {!disabled && (
        <div className="flex gap-1">
          <ViewModeButton 
            onSelect={() => setViewMode("owns")} 
            active={viewMode === "owns"} 
            text="My Projects"
          />

          <ViewModeButton
            onSelect={() => setViewMode("shared")}
            active={viewMode === "shared"}
            text="Shared Files"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {filteredRooms.map((room) => {
          const roomColor = roomColors.find((rc) => rc.id === room.id)?.color ?? PASTEL_COLORS[0]!

          return (
            <React.Fragment key={room.id} >
              <SingleRoom 
                id={room.id} 
                title={room.title} 
                description={`Created ${room.createdAt.toDateString()}`}
                color={roomColor}
                selected={selected === room.id}
                select={() => setSelected(room.id)}
                navigateTo={async () => {
                  if (navigating) return;
                  setNavigating(true);
                  if (disabled) {
                    router.push("/cus_dashboard/" + room.id)
                  } else {
                    router.push("/des_dashboard/" + room.id)
                  }
                }}
                canEdit={viewMode === "owns" && !disabled}
                navigating={navigating}
              />
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

function SingleRoom({
  id, 
  title, 
  description, 
  color, 
  selected, 
  select, 
  navigateTo,
  canEdit,
  navigating
} : 
{
  id: string,
  title: string,
  description: string,
  color: string,
  selected: boolean,
  select: () => void,
  navigateTo: () => void,
  canEdit: boolean,
  navigating: boolean
}) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setIsEditing(false)
      await updateRoomTitle(editedTitle, id);
    }
  }

  const handleBlur = async () => {
    setIsEditing(false);
    await updateRoomTitle(editedTitle, id);
  }

  const confirmDelete = async () => {
    await deleteRoom(id);
    setShowConfirmationModal(false);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && !isEditing && selected) {
        e.preventDefault();
        setShowConfirmationModal(true);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selected, id, isEditing])

  return (
    <div className="flex flex-col gap-0.5 group relative">
      <div 
        onDoubleClick={navigateTo}
        onClick={select}
        style={{backgroundColor: color}}
        className={`flex h-56 w-96 cursor-pointer items-center justify-center rounded-md ${selected ? "border-2 border-blue-500" : "border border-[#e8e8e8]"} ${navigating ? "cursor-not-allowed pointer-events-none opacity-60" : ""}`}
      >
        <p className="text-md select-none font-medium">
          {title}
        </p>

        {(selected && canEdit) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmationModal(true);
            }}
            className="absolute right-2 top-2 flex items-center justify-center rounded-md p-1.5 transition-all bg-white/90 text-red-500 shadow-md hover:bg-white"
            title="Delete room"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>

      {isEditing && canEdit ? (
        <input 
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyUp={handleKeyPress}
          autoFocus
          className="w-full"
        />
      ) : 
      (
        <p 
          className="mt-2 select-none text-[13px] font-medium"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </p>
      )}

      <p className="select-none text-[10px] text-gray-400">
        {description}
      </p>

      <ConfirmationModal 
        isOpen={showConfirmationModal} 
        onClose={() => setShowConfirmationModal(false)} 
        onConfirm={confirmDelete} 
        message="Are you sure you want to delete this room?" 
      />
    </div>
  )
}

function ViewModeButton({
  onSelect, 
  active, 
  text
} :
{
  onSelect: () => void,
  active: boolean,
  text: string
}) {
  return (
    <button 
      className={`select-none rounded-md p-1 px-2 text-[11px] hover:bg-gray-100 ${active ? "bg-gray-100" : ""}`}
      onClick={onSelect}
    >
      {text}
    </button>
  )
}
