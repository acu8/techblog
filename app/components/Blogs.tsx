"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  url: string;
  publishedAt: string;
  eyecatch: { url: string };
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const INITIAL_DISPLAY = 4;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/microcms");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data: Blog[] = await response.json();
        setBlogs(data.slice(0, INITIAL_DISPLAY));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (blogs.length === 0) {
    return <div>No blogs available.</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex justify-between items-center">
        <h1
          data-testid="display-title"
          className="text-3xl font-bold text-indigo-200"
        >
          ブログ記事
        </h1>
        <Link href="/blog-all" passHref>
          <button className="btn btn-outline">もっと見る</button>
        </Link>
      </div>
      <div data-testid="display-blog" className="flex flex-wrap -mx-2">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
          >
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={blog.eyecatch.url}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>{new Date(blog.publishedAt).toLocaleDateString()}</p>
                <div className="card-actions justify-end">
                  <Link href={`/blog/${blog.id}`}>
                    <button className="btn btn-warning">詳細を見る</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
