"use server";

import { revalidatePath } from "next/cache";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export async function createComment(postId: number, content: string) {
  const session = await auth();

  if (!session?.user.id) {
    throw new Error("Not authenticated");
  }

  await db.comment.create({
    data: {
      content,
      postId,
      userId: session.user.id
    }
  });

  revalidatePath(`/cus_dashboard/post/${postId}`);
}