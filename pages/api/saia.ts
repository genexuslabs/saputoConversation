import { NextApiRequest, NextApiResponse } from 'next';

import { SAIA_API_HOST } from '@/utils/app/const';



const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const { assistant, messages, revision } =
      req.body ;
  
    let request : any = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.OPENAI_API_KEY
      },
      method: 'POST',
      body: JSON.stringify({
        'assistant': assistant,
        'messages': messages,
        'revision': revision
      })
    };
    
    const answerRes = await fetch(`${SAIA_API_HOST}/assistant/chat`, request);
    const answerData = await answerRes.json();
    const answer = answerData["text"]; 
   
    res.status(200).json( { answer } );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error'})
  }
};

export default handler;
