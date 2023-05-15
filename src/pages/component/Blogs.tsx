import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from './Navbar';

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

const Blogs = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/api/auth/posts/posts')
      .then(response => response.json())
      .then(posts => {
        setPosts(posts);
        setTotalPages(Math.ceil(posts.length / 10));
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Recent Blogs</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {posts.slice((currentPage - 1) * 10).reverse().slice(0, 10).map(post => (
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
                    <p className="mt-1 text-sm text-gray-500">{post.user.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-between">
            <div>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </div>
            <div>
              <span>{currentPage}</span>
            </div>
            <div>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Blogs), {
  ssr: false,
});
