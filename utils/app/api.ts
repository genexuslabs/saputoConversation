import { Plugin } from '@/types/plugin';
import { OPENAI_API_TYPE, SAIA_API_HOST } from './const';

export const getEndpoint = (plugin: Plugin | null) => {
  if (!plugin) {
    return 'api/chat';
  }

  if (plugin.id.indexOf('Search') >= 0) {
    return 'api/saia-search';
  }

  if (plugin.id === 'google-search') {
    return 'api/google';
  }
  if (plugin.id) {
    return 'api/saia';
  }

  return 'api/chat';
};

export function getCompletionUrl(model : string | null) {
  if (model && model.toLowerCase().indexOf("gpt") < 0)
    return "https://ll3y5wnsh9.execute-api.us-east-1.amazonaws.com/Prod/v1/chat/completions";
  var url = `${SAIA_API_HOST}/v1/chat/completions`;
  if (OPENAI_API_TYPE === 'azure') {
    url = `${SAIA_API_HOST}`
  }
  return url;
}