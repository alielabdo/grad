'use server';

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import UserMenu from "~/components/cdashboard/UserMenu";
import CreatePost from "~/components/cdashboard/CreatePost";
import PostsView from "~/components/cdashboard/PostsView";

export default async function Page() {
  const session = await auth();

  const user = await db.user.findUniqueOrThrow({
    where: {
      id: session?.user.id
    },
    include: {
      posts: {
        include: {
          comments: {
            include: {
              user: true
            }
          }
        }
      }
    }
  });

  return (
    <div className="flex h-screen w-full">
      {/* Left Sidebar */}
      <div className="flex h-screen min-w-[264px] flex-col border-r border-gray-200 bg-white p-2">
        <UserMenu email={user.email} />

        {/* Navigation */}
        <nav className="mt-8 space-y-1">
          <button className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-gray-100">
            <span className="text-sm font-medium">Home</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-gray-100">
            <span className="text-sm font-medium">My Posts</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex h-screen w-full flex-col">
        <div className="flex min-h-[50px] items-center border-b border-gray-200 bg-white pl-8">
          <h2 className="text-[13px]">All Posts</h2>
        </div>

        <div className="flex h-full flex-col gap-10 p-8">
          <CreatePost />
          <PostsView
            posts={user.posts}
            userId={user.id}
          />
        </div>
      </div>
    </div>
  );
}