import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId.toString();

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { posts: true },
    })

    res.status(200).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
