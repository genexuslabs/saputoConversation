export const DEFAULT_SYSTEM_PROMPT =
  process.env.NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT ||
  "You are an Assistant, a large language model trained with lot of data. Follow the user's instructions carefully. Respond using markdown.";



export const SAIA_API_TOKEN =
  process.env.SAIA_API_TOKEN || '';

export const SAIA_API_HOST =
  process.env.SAIA_API_HOST || 'https://api.beta.saia.ai/proxy/openai';

export const SAIA_API_ASSISTANT =
  process.env.SAIA_API_ASSISTANT || 'https://api.beta.saia.ai/v1';

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
  process.env.AZURE_AD_CLIENT_ID || /*'d1c6898f-d90a-48b3-9904-7ca065f98bf5' */'c84497e7-0bca-4141-a253-9c59d47a2e3c';

export const AZURE_AD_TENANT_ID_URL = 
  process.env.AZURE_AD_TENANT_ID || /*'https://login.microsoftonline.com/c160a942-c869-429f-8a96-f8c8296d57db';*/'https://login.microsoftonline.com/5ec7bbf9-1872-46c9-b201-a1e181996b35';

