import {Liveblocks} from "@liveblocks/node"
import { env } from "~/env";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

const liveblocks = new Liveblocks({secret: env.LIVEBLOCK_SECRET_KEY});

export async function POST(req: Request) {
  const userSession = await auth();

  const user = await db.user.findUniqueOrThrow({
    where: {id: userSession?.user.id},
    include: {
      ownedRooms: true,
      roomInvites: {
        include: {
          room: true
        }
      }
    }
  })

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.email ?? "Anonymous",
      role: user.role
    } as { name: string; role: string }
  });

  user.ownedRooms.forEach((room) => {
    session.allow(`room:${room.id}`, session.FULL_ACCESS);
  })

  user.roomInvites.forEach((invite) => {
    if (user.role === 'DESIGNER') {
      session.allow(`room:${invite.room.id}`, session.FULL_ACCESS);
    } else {
      session.allow(`room:${invite.room.id}`, session.READ_ACCESS);
    }
  })

  const {status, body} = await session.authorize();

  return new Response(body, {status})
}