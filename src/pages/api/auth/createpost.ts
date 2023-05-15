import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Post } from "@prisma/client";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message?: string; error?: string; status?: boolean; post?: Post }>
) {
  // Only accept POST requests
  if (req.method !== "POST") {
    res.status(500).json({ message: "HTTP method not valid only POST Accepted" });
    return;
  }

  // Get the session
 

  // Make sure user is authenticated
  

  // Get user ID from session
  

  // Check if request body exists
  if (!req.body) {
    res.status(404).json({ error: "Don't have form data...!" });
    return;
  }

  // Extract data from request body
  const { title, brief, content, image, userId } = req.body;

  try {
    // Create post in the database
    const post = await prisma.post.create({
      data: {
        title,
        brief,
        content,
        image,
        userId,
      },
    });

    res.status(201).json({ status: true, post });
  } catch (error: any) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Error creating blog" });
  }
}
