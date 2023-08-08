import { NextApiRequest, NextApiResponse } from 'next';

import { SAIA_API_ASSISTANT, SAIA_API_HOST } from '@/utils/app/const';



const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const {  messages } = req.body ;
  
    let request : any = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.SAIA_SEARCH_TOKEN
      },
      method: 'POST',
      body: JSON.stringify({
        'profile': 'demodocuments',
        'question': messages[0].content
      })
    };
    const answerRes = await fetch(`${SAIA_API_ASSISTANT}/search/execute`, request);
    const answerData = await answerRes.json();
    const answer = answerData["text"]; 
    res.status(200).json( { answer } );

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error'})
  }
};

export default handler;
