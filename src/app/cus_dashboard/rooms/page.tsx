'use server';

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import UserMenu from "~/components/ddashboard/UserMenu";
import CreateRoom from "~/components/ddashboard/CreateRoom";
import RoomsView from "~/components/ddashboard/RoomsView";
import Link from "next/link";

export default async function Page() {

  const session = await auth();

  const user = await db.user.findUniqueOrThrow({
    where: {
      id: session?.user.id
    },
    include: {
      ownedRooms: true,
      roomInvites: {
        include: {
          room: true
        }
      }
    }
  })

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50" />

      <div className="flex h-full w-full">
        {/* Sidebar */}
        <div className="flex h-full min-w-[264px] flex-col border-r border-gray-200 bg-white/90 p-2 backdrop-blur-sm">
          <UserMenu email={user.email} />
          <div className="mt-4 space-y-1">
            <Link
              href="/cus_dashboard"
              className="block select-none rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link
              href="/cus_dashboard/rooms"
              className="block select-none rounded-md bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-100"
            >
              View Shared Rooms
            </Link>
          </div>
        </div>

        <div className="flex h-full w-full flex-col">
          <div className="flex min-h-[50px] items-center border-b border-gray-200 bg-white/90 pl-8 backdrop-blur-sm">
            <h2 className="select-none text-[13px]">Shared Rooms</h2>
          </div>

          <div className="flex h-full flex-col gap-10 overflow-y-auto p-8">
            <RoomsView
              ownedRooms={user.ownedRooms}
              roomInvites={user.roomInvites.map((room) => room.room)}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}