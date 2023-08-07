export interface ProcessEnv {
  SAIA_API_KEY: string;
  SAIA_API_HOST?: string;
  OPENAI_API_TYPE?: 'openai' | 'azure';
  OPENAI_API_VERSION?: string;
  OPENAI_ORGANIZATION?: string;
}
