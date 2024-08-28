import data from "app/data/data";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getQiitaArticles(req: NextApiRequest, res: NextApiResponse) {
    const QIITA_API_TOKEN = process.env.QIITA_API_TOKEN;
    const QIITA_USER_ID = process.env.QIITA_USER_ID;
    const PER_PAGE = 100;
  
    try {
      const response = await fetch(
        `https://qiita.com/api/v2/users/${QIITA_USER_ID}/items`,
        {
          headers: {
            Authorization: `Bearer ${QIITA_API_TOKEN}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch Qiita articles");
      }
  
      const articles = await response.json();

      const processedArticles = articles.map((article: any, index: number) => ({
        ...article,
        thumbnail: data[index % data.length].thumbnail,
    }));  
      res.status(200).json(processedArticles);
    } catch (error) {
      console.error("Error fetching Qiita articles:", error);
      res.status(500).json({ error: "Failed to fetch Qiita articles" });
    }
  }