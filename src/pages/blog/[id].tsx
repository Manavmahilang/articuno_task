import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


interface Post {
  id: number;
  title: string;
  content: string;
  brief: String;
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

const BlogDetail = (id: any) => {
  const [post, setPost] = useState<Post>();
  const router = useRouter();

  useEffect(() => {
    const id = router.query.id;
    console.log(id)
    fetch(`/api//auth/posts/${id}`)
      .then(response => response.json())
      .then(post => setPost(post))
      .catch(error => console.error(error));
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogDetail;
