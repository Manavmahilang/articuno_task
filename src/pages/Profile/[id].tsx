import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useState } from "react";

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

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const { userId } = router.query;

  const { data: session } = useSession()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/users/${session?.user?.id ?? ''}`);
        const data = await response.json();
        console.log(data)
        const user = data as User;
        setUser(user);
        console.log(user);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchUser();
  }, [userId]);
  
  useEffect(() => {
    fetch('http://localhost:3000/api/auth/posts/posts')
      .then(response => response.json())
      .then(posts => setPosts(posts))
      .catch(error => console.error(error));
  });


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
<>
    <div className="container mx-auto text-center py-20">
      <div className='flex'>
        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
        <p className="mt-2 text-gray-600">{user.email}</p>
      </div>
    </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {posts.map(post => (
        <div key={post.id} className="group relative">
          <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img src={post.image} alt={post.user.email} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link href={`/blog/${post.id}`} >
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {post.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
</>

  );
};

export default ProfilePage;

