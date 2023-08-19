import { OPENAI_API_TYPE } from '../utils/app/const';

export interface OpenAIModel {
  id: string;
  name: string;
  maxLength: number; // maximum length of a message
  tokenLimit: number;
  streaming: boolean;
  key?: string;
}

export enum OpenAIModelID {
  GPT_3_5 = 'gpt-3.5-turbo-16k',
  GPT_3_5_AZ = 'gpt-35-turbo-16k',
  GPT_4 = 'gpt-4',
  GPT_4_32K = 'gpt-4-32k',
  CLAUDE_2 = 'anthropic.claude-v2',
  CLAUDE_V1 = 'anthropic.claude-v1',
  CLAUDE_V2 = 'anthropic.claude-v2',
  CLAUDE_INSTANT_V1 = 'anthropic.claude-instant-v1',
  AMAZON_TITAN_TG1_LARGE = 'amazon.titan-tg1-large',
  AI21_J2_ULTRA = 'ai21.j2-ultra',
  AI21_J2_MID = 'ai21.j2-mid'
}

// in case the `DEFAULT_MODEL` environment variable is not set or set to an unsupported model
export const fallbackModelID = OpenAIModelID.GPT_3_5;

export const OpenAIModels: Record<OpenAIModelID, OpenAIModel> = {
  [OpenAIModelID.GPT_3_5]: {
    id: OpenAIModelID.GPT_3_5,
    name: 'GPT-3.5',
    maxLength: 12000,
    tokenLimit: 4000,
    streaming: true
  },
  [OpenAIModelID.GPT_3_5_AZ]: {
    id: OpenAIModelID.GPT_3_5_AZ,
    name: 'Azure GPT-3.5',
    maxLength: 12000,
    tokenLimit: 4000,
    streaming: true
  },
  [OpenAIModelID.GPT_4]: {
    id: OpenAIModelID.GPT_4,
    name: 'GPT-4',
    maxLength: 24000,
    tokenLimit: 8000,
    streaming: true
  },
  [OpenAIModelID.GPT_4_32K]: {
    id: OpenAIModelID.GPT_4_32K,
    name: 'GPT-4-32K',
    maxLength: 96000,
    tokenLimit: 32000,
    streaming: true
  },
  [OpenAIModelID.CLAUDE_V1]: {
    id: OpenAIModelID.CLAUDE_V1,
    name: 'Antrophic - Claude V1',
    maxLength: 96000,
    tokenLimit: 32000,
    streaming: false,
    key: process.env.GLOBANT_AWS_SECRET_KEY
  },
  [OpenAIModelID.CLAUDE_V2]: {
    id: OpenAIModelID.CLAUDE_V2,
    name: 'Antrophic - Claude V2',
    maxLength: 96000,
    tokenLimit: 32000,
    streaming: false,
    key: process.env.GLOBANT_AWS_SECRET_KEY
  },
  [OpenAIModelID.CLAUDE_INSTANT_V1]: {
    id: OpenAIModelID.CLAUDE_INSTANT_V1,
    name: 'Antrophic - Claude Instant V1',
    maxLength: 96000,
    tokenLimit: 32000,
    streaming: false,
    key: process.env.GLOBANT_AWS_SECRET_KEY
  },
  [OpenAIModelID.AMAZON_TITAN_TG1_LARGE]: {
    id: OpenAIModelID.AMAZON_TITAN_TG1_LARGE,
    name: 'Amazon - Titan TG1 Large',
    maxLength: 96000,
    tokenLimit: 32000,
    streaming: false,
    key: process.env.GLOBANT_AWS_SECRET_KEY
  },
  [OpenAIModelID.AI21_J2_ULTRA]: {
    id: OpenAIModelID.AI21_J2_ULTRA,
    name: 'AI21 - J2 Ultra',
    maxLength: 96000,
    tokenLimit: 32000,
    streaming: false,
    key: process.env.GLOBANT_AWS_SECRET_KEY
  },
  [OpenAIModelID.AI21_J2_MID]: {
    id: OpenAIModelID.AI21_J2_MID,
    name: 'AI21 - J2 Mid',
    maxLength: 96000,
    tokenLimit: 32000,
    streaming: false,
    key: process.env.GLOBANT_AWS_SECRET_KEY
  }
  
};
