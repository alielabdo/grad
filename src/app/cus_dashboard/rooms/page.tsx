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
    <div className="flex h-screen w-full">
      <div className="flex h-screen min-w-[264px] flex-col border-r border-gray-200 bg-white p-2">
        <UserMenu email={user.email} />

        <div className="mt-4 space-y-1">
          <Link
            href="/cus_dashboard"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 select-none"
          >
            Dashboard
          </Link>
          <Link
            href="/cus_dashboard/rooms"
            className="block rounded-md px-3 py-2 text-sm font-medium bg-gray-100  hover:bg-gray-100 select-none"
          >
            View Shared Rooms
          </Link>
        </div>
      </div>

      <div className="flex h-screen w-full flex-col">
        <div className="flex min-h-[50px] items-center border-b border-gray-200 bg-white pl-8">
          <h2 className="text-[13px] select-none">Shared Rooms</h2>
        </div>

        <div className="flex h-full flex-col gap-10 p-8">
          <RoomsView
            ownedRooms={user.ownedRooms}
            roomInvites={user.roomInvites.map((room) => room.room)}
            disabled={true}
          />
        </div>
      </div>
    </div>
  )
}