"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  url: string;
  publishedAt: string;
  eyecatch: { url: string };
}

const blogAllArticles: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/microcms");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data: Blog[] = await response.json();
        setBlogs(data);
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
      <div>
        <h1>ブログ記事</h1>
      </div>
      <div className="flex flex-wrap -mx-2">
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
                  <Link href={`/blog/${blog.id}`} className="btn btn-primary">
                    <button className="btn btn-primary">詳細を見る</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link href="/blog-all" passHref>
          <button className="btn btn-primary">もっと見る</button>
        </Link>
      </div>
    </div>
  );
};

export default blogAllArticles;
