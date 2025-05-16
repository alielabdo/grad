'use server';

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import UserMenu from "~/components/cdashboard/UserMenu";
import CreatePost from "~/components/cdashboard/CreatePost";
import PostsView from "~/components/cdashboard/PostsView";

export default async function Page() {
  const session = await auth();

  const allPosts = await db.post.findMany({
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      },
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
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
    <div className="flex h-screen w-full">
      {/* Left Sidebar */}
      <div className="flex h-screen min-w-[264px] flex-col border-r border-gray-200 bg-white p-2">
        <UserMenu email={session?.user.email ?? ""} />
      </div>

      {/* Main Content */}
      <div className="flex h-screen w-full flex-col">
        <div className="flex min-h-[50px] items-center border-b border-gray-200 bg-white pl-8">
          <h2 className="text-[13px]">All Posts</h2>
        </div>

        <div className="flex h-full flex-col gap-10 p-8">
          <CreatePost />
          <PostsView
            posts={allPosts}
            userId={session?.user.id ?? ""}
          />
        </div>
      </div>
    </div>
  );
}