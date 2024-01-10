import {NextApiRequest, NextApiResponse} from 'next';

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // POSTメソッドのみを受け付ける
  if (req.method !== 'POST') {
    res.status(405).json({message: 'Method not allowed'});
    return;
  }

  try {
    // リクエストから画像IDを取得
    const {imagePath} = req.body;

    //    imagePathが未定義の場合はエラー
    if (!imagePath) {
      res.status(400).json({error: 'Bad Request'});
      return;
    }

    // データベースを更新
    const updatedImage = await prisma.photo.updateMany({
      where: {original: imagePath},
      data: {
        uploadStatus: 'uploaded',
      },
    });

    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }
}
