import { prisma } from "~/server/db";

export async function getProfile(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}