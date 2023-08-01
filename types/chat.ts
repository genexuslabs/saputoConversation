import { OpenAIModel } from './openai';

export type Role = 'assistant' | 'user' | 'function';

export interface Message {
  role: Role;
  name?: string;
  content: string;
  plugin?: string;
}

export interface ChatBody {
  model: OpenAIModel;
  messages: Message[];
  key: string;
  prompt: string;
  temperature: number;
}

export interface Conversation {
  id: string;
  name: string;
  messages: Message[];
  model: OpenAIModel;
  prompt: string;
  temperature: number;
  folderId: string | null;
}
