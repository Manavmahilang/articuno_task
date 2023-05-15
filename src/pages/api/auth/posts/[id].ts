import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

interface Post {
  id: number;
  title: string;
  content: string;
  brief: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: string;
    image: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { id } = req.query;
      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: {
          user: true,
        },
      });
      res.status(200).json(post as unknown as Post);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
