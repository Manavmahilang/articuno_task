import { prisma } from "~/server/db";

const getPublishedPosts = async () => {
  const publishedPosts = await prisma.post.findMany({
    where: { 
      AND: [
        { published: true },
        { deleted: false },
      ],
    },
    include: { 
      user: true,
    },
  });
  return publishedPosts;
};

export default getPublishedPosts;

