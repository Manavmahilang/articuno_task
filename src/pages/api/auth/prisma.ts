import { prisma } from "~/server/db"

export async function createUser(email: string, password: string) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  })
  return user
}