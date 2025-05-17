'use client';

import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react";
import { ReactNode } from "react";
import { Layer } from "~/types";

export function Room({children, roomId} : {children: ReactNode, roomId: string}) {

  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider 
        id={roomId} 
        initialPresence={{
          cursor: null,
          selection: [],
          penColor: null,
          pencilDraft: null,
        }}
        initialStorage={{
          roomColor: {r: 30,g: 30,b: 30},
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([])
        }}
      >
        <ClientSideSuspense
          fallback={
            <div 
            className="flex items-center justify-center h-screen flex-col gap-2">
              <h1 className="text-sm font-normal">
                Loading...
              </h1>
            </div>
          }>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}