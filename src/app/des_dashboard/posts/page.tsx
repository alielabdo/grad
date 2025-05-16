'use server';

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import PostsView from "~/components/cdashboard/PostsView";
import UserMenu from "~/components/ddashboard/UserMenu";
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
    <div className="flex h-screen w-full">
      <div className="flex h-screen min-w-[264px] flex-col border-r border-gray-200 bg-white p-2">
        <UserMenu email={session?.user.email ?? ""} />

        <nav className="mt-4 space-y-1">
          <Link
            href="/des_dashboard"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 select-none"
          >
            Dashboard
          </Link>
          <Link
            href="/des_dashboard/posts"
            className="block rounded-md px-3 py-2 text-sm font-medium bg-gray-100 select-none"
          >
            View Posts
          </Link>
        </nav>
      </div>

      <div className="flex h-screen w-full flex-col">
        <div className="flex min-h-[50px] items-center border-b border-gray-200 bg-white pl-8">
          <h2 className="text-[13px]">All Posts</h2>
        </div>

        <div className="flex h-full flex-col gap-10 p-8">
          <PostsView
            posts={allPosts}
            userId={session?.user.id ?? ""}
            showTabs={false}
            allowDelete={false}
          />
        </div>
      </div>
    </div>
  );
}