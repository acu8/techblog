import { createClient } from 'microcms-js-sdk';
import { NextApiRequest, NextApiResponse } from "next";


const client = createClient({
  serviceDomain: process.env.MICROCMS_API_URL ?? "",
  apiKey: process.env.MICROCMS_API_KEY ?? "",
});

export async function getAllArticles(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await client.get({ endpoint: 'blogs' });
    res.status(200).json(data.contents || []);  
  } catch (error) {
    console.error('ブログの取得に失敗しました:', error);
    res.status(500).json({ error: 'ブログの取得に失敗しました' });
  }
}


export async function getArticle(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query; 

    if (Array.isArray(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
    
      if (!id) {
        return res.status(400).json({ error: 'Content ID is required' });
      }

  try {
    const data = await client.get({ endpoint: 'blogs', contentId: id }); 
    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
  }
  

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      if (req.query.id) {
        await getArticle(req, res);
      } else {
        await getAllArticles(req, res);
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }