export const DEFAULT_SYSTEM_PROMPT =
  process.env.NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT ||
  "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.";

export const OPENAI_API_HOST =
  process.env.OPENAI_API_HOST || 'https://api.openai.com';

export const SAIA_API_HOST =
  process.env.SAIA_API_HOST || 'https://api.beta.saia.ai/v1';

export const DEFAULT_TEMPERATURE = 
  parseFloat(process.env.NEXT_PUBLIC_DEFAULT_TEMPERATURE || "1");

export const OPENAI_API_TYPE =
  process.env.OPENAI_API_TYPE || 'openai';

export const OPENAI_API_VERSION =
  process.env.OPENAI_API_VERSION || '2023-03-15-preview';

export const OPENAI_ORGANIZATION =
  process.env.OPENAI_ORGANIZATION || '';

export const AZURE_DEPLOYMENT_ID =
  process.env.AZURE_DEPLOYMENT_ID || '';

export const AZURE_AD_CLIENT_ID = 
  process.env.AZURE_AD_CLIENT_ID || '27b865dd-01fd-46ed-bb96-cab652626103';

export const AZURE_AD_TENANT_ID_URL = 
  process.env.AZURE_AD_TENANT_ID || 'https://login.microsoftonline.com/5ec7bbf9-1872-46c9-b201-a1e181996b35';

