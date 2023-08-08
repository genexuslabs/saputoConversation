import { NextApiRequest, NextApiResponse } from 'next';

import { SAIA_API_ASSISTANT } from '@/utils/app/const';



const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    try {
      const request: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SAIA_API_KEY}`
        },
        method: 'GET',
      };
      const answerRes = await fetch(`${SAIA_API_ASSISTANT}/organization/assistants`, request);
      
      if (!answerRes.ok) throw new Error('Error fetching data');
      const response = await answerRes.json();
     
      res.status(200).json(response);
    } catch (error: unknown) {
        console.error(error);
        const errMsg = error instanceof Error ? error.message : 'Error';
        res.status(500).json({ error: errMsg });
      }
  };

export default handler;
