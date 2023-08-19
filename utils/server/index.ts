import { Message } from '@/types/chat';
import { OpenAIModel, OpenAIModels } from '@/types/openai';

import { AZURE_DEPLOYMENT_ID, SAIA_API_HOST, OPENAI_API_TYPE, OPENAI_API_VERSION, OPENAI_ORGANIZATION } from '../app/const';

import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from 'eventsource-parser';
import { getCompletionUrl } from '../app/api';
import { Readable } from 'stream';

export class OpenAIError extends Error {
  type: string;
  param: string;
  code: string;

  constructor(message: string, type: string, param: string, code: string) {
    super(message);
    this.name = 'OpenAIError';
    this.type = type;
    this.param = param;
    this.code = code;
  }
}

export const OpenAIStream = async (
  model: OpenAIModel,
  systemPrompt: string,
  temperature : number,
  key: string,
  messages: Message[],
) => {
  let url = getCompletionUrl(model.id);

  const aiModel = OpenAIModels[model.id as keyof typeof OpenAIModels];

  console.log(JSON.stringify(aiModel));
  let streaming : boolean = aiModel.streaming;
  console.log(url);
  key = `Bearer ${process.env.SAIA_API_KEY}`;
  console.log(key);
  var body = JSON.stringify({
    ...(OPENAI_API_TYPE === 'openai' && {model: aiModel.id}),
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...messages,
    ],
    max_tokens: 1000,
    temperature: temperature,
    stream: streaming,
  });
  const request = {
    headers: {
      'x-api-key': "iOr6XdQEGk3IbpgkQmURAa0jvRn7mfYu3eTLv8KS",
      'Content-Type': 'application/json',
      ...(true && {
        Authorization: (aiModel.key ? aiModel.key : key)
      }),
      ...((OPENAI_API_TYPE === 'openai' && OPENAI_ORGANIZATION) && {
        'OpenAI-Organization': OPENAI_ORGANIZATION,
      }),
    },
    method: 'POST',
    body: body,
  };
  
  let newStr = JSON.stringify(request).replace(/'/g, "");
  const res = await fetch(url, JSON.parse(newStr));
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const result = await res.json();
    if (result.error) {
      throw new OpenAIError(
        result.error.message,
        result.error.type,
        result.error.param,
        result.error.code,
      );
    } else {
      throw new Error(
        `OpenAI API returned an error: ${
          decoder.decode(result?.value) || result.statusText
        }`,
      );
    }
  }
  if (!streaming) {
    const responseBody = await res.json(); // Convertir el cuerpo de la respuesta a un objeto JavaScript
    const assistantMessage = responseBody.choices[0].message.content; // Extraer el contenido del mensaje del asistente
    
    // Crear un ReadableStream con el contenido del mensaje
    return assistantMessage;
  }
  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data;

          try {
            const json = JSON.parse(data);
            if (json.choices[0].finish_reason != null) {
              controller.close();
              return;
            }
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};



