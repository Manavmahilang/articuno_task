const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const blogData = require('./blog.json');

const posts = blogData.filter(data => data.hasOwnProperty('title'));

async function main() {
  for (const post of posts) {
    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        brief: post.brief,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
        image: post.image,
        user: {
          connect: {
            id: post.userId
          }
        }
      }
    });
    console.log(`Created post with id: ${newPost.id}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });