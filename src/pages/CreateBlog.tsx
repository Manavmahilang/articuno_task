
import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

const BlogCreationForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const { data: session, status } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userId = session?.user?.id;
      const response = await fetch("api/auth/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, brief, content, image, userId }),
      });
      const data = await response.json();
      console.log("Blog created successfully:", data);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    // Handle unauthenticated state, e.g. render a SignIn component
   return <p>Please login</p>;
  }

  return ( 
  <>
    
    {session?.user?.email ?? ''}
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-bold text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full border border-gray-400 p-2 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="brief" className="block mb-2 font-bold text-gray-700">
          Brief
        </label>
        <input
          type="text"
          id="brief"
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          className="block w-full border border-gray-400 p-2 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-2 font-bold text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full border border-gray-400 p-2 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-2 font-bold text-gray-700">
          Image
        </label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="block w-full border border-gray-400 p-2 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Create Blog
        </button>
      </div>
    </form>
    </>
  );
};

export default BlogCreationForm
