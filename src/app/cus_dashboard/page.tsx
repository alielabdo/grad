'use server';

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import UserMenu from "~/components/cdashboard/UserMenu";
import CreatePost from "~/components/cdashboard/CreatePost";
import PostsView from "~/components/cdashboard/PostsView";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  const allPosts = await db.post.findMany({
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Subtle background pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50" />
      <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB...')] opacity-20" />

      <div className="flex h-full w-full">
        {/* Sidebar */}
        <div className="flex h-full min-w-[264px] flex-col border-r border-gray-200 bg-white/90 p-2 backdrop-blur-sm">
          <UserMenu email={session?.user.email ?? ''} />
          <div className="mt-4 space-y-1">
            <Link
              href="/cus_dashboard"
              className="block select-none rounded-md bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link
              href="/cus_dashboard/rooms"
              className="block select-none rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
            >
              View Shared Rooms
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="flex h-full w-full flex-col">
          <div className="flex min-h-[50px] items-center border-b border-gray-200 bg-white/90 pl-8 backdrop-blur-sm">
            <h2 className="text-[13px]">Customer Dashboard</h2>
          </div>

          <div className="flex h-full flex-col gap-10 overflow-y-auto p-8">
            <CreatePost />
            <PostsView posts={allPosts} userId={session?.user.id ?? ''} />
          </div>
        </div>
      </div>
    </div>
  );
}