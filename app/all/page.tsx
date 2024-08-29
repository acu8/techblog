"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Article {
  title: string;
  created_at: string;
  url: string;
  thumbnail: string;
}

const AllArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllArticles = async (): Promise<Article[]> => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/qiita");
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      return await response.json();
    } catch (err) {
      setError("Error fetching articles");
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllArticles().then(setArticles);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">個人記事一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article: Article) => (
          <div key={article.url} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{article.title}</h2>
              <p>{new Date(article.created_at).toLocaleDateString()}</p>
              <div className="card-actions justify-end">
                <Link href={article.url} passHref>
                  <button className="btn btn-primary">詳細を見る</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link href="/" passHref>
          <button className="btn btn-secondary">メインページに戻る</button>
        </Link>
      </div>
    </div>
  );
};

export default AllArticles;
