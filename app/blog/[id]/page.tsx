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
          setError(error.message);
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
    <div>
      <h2>{blog.title}</h2>
      <div>
        <p>
          {new Date(blog.createdAt).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <img src={blog.eyecatch.url} alt={blog.title} />
      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
        {blog.content}
      </ReactMarkdown>
      <div className="text-center mt-4">
        <Link href="/" passHref>
          <button className="btn btn-secondary">メインページに戻る</button>
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
