"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  url: string;
  createdAt: string;
  eyecatch: { url: string };
}

const BlogDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`/api/microcms?id=${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch blog");
          }
          const data: Blog = await response.json();
          setBlog(data);
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

      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <div>No blog found.</div>;
  }

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto px-4 py-8">
      <article className="w-full text-gray-50">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-center mb-4">
              {blog.title}
            </h1>
            <p className="text-gray-50 mt-10">
              {new Date(blog.createdAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </header>
        <img
          src={blog.eyecatch.url}
          alt={blog.title}
          className="w-full h-64 object-cover mb-8 rounded-lg shadow-md"
        />
        <div className="prose max-w-none">
          <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
            {blog.content}
          </ReactMarkdown>
        </div>
      </article>
      <div className="mt-12">
        <Link href="/" passHref>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            メインページに戻る
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
