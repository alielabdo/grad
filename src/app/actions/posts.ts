"use server";

import { revalidatePath } from "next/cache";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export async function createPost(name: string, content: string) {
  const session = await auth();

  if (!session?.user.id) {
    throw new Error("No user id found");
  }

  const post = await db.post.create({
    data: {
      name,
      content,
      createdById: session.user.id,
    },
    select: {
      id: true,
    },
  });

  revalidatePath("/cus_dashboard");
  return post.id;
}

export async function deletePost(id: number) {
  const session = await auth();

  if (!session?.user.id) {
    throw new Error("No user id found");
  }

  await db.post.findFirstOrThrow({
    where: {
      id,
      createdById: session.user.id,
    },
  });

  await db.post.delete({
    where: { id },
  });

  revalidatePath("/cus_dashboard");
}
