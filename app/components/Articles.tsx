"use client";

import React, { useEffect, useState } from "react";
// import data from "../data/data";
import Link from "next/link";

export interface Article {
  title: string;
  date: string;
  url: string;
  thumbnail: string;
}

export interface ArticleProps {
  article: Article[];
}

const Articles: React.FC = () => {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const INITIAL_DISPLAY = 4;

  const fetchArticles = async (page: number): Promise<Article[]> => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/qiita?page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const newArticles: Article[] = await response.json();
      return newArticles;
    } catch (err) {
      setError("Error fetching articles");
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      const initialArticles = await fetchArticles(1);
      setDisplayedArticles(initialArticles.slice(0, INITIAL_DISPLAY));
    };
    initialFetch();
  }, []);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <div>
        <h1 data-testid="display-title">個人記事</h1>
      </div>
      <div data-testid="display-article" className="flex flex-wrap -mx-2">
        {displayedArticles.map((article: Article) => (
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
