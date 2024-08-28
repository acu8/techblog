"use client";

import React, { useEffect, useState } from "react";
// import data from "../data/data";
import Link from "next/link";

interface Article {
  title: string;
  date: string;
  url: string;
  thumbnail: string;
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const INITIAL_DISPLAY = 4;

  useEffect(() => {
    const fetchInitialArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/qiita?page=1&per_page=4");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const initialArticles: Article[] = await response.json();
        setArticles(initialArticles);
      } catch (err) {
        setError("Error fetching articles");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialArticles();
  }, []);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-2">
        {articles.map((article: Article) => (
          <div
            key={article.url}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
          >
            <Link href={article.url} passHref>
              <div className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{article.title}</h2>
                  <p>{new Date(article.date).toLocaleDateString()}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">詳細を見る</button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link href="/all" passHref>
          <button className="btn btn-primary">もっと見る</button>
        </Link>
      </div>
    </div>
  );
};

export default Articles;
