import { Plugin } from '@/types/plugin';

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
