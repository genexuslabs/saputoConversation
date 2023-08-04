import { KeyValuePair } from './data';

export interface Plugin {
  id: string;
  name: PluginName;
  requiredKeys: KeyValuePair[];
}

export interface PluginKey {
  pluginId: string;
  requiredKeys: KeyValuePair[];
}



export enum PluginName {
  GOOGLE_SEARCH = 'Google Search',
}




export const Plugins: Record<string, Plugin> = {
  ['google-search']: {
    id: 'google-search',
    name: PluginName.GOOGLE_SEARCH,
    requiredKeys: [
      {
        key: 'GOOGLE_API_KEY',
        value: '',
      },
      {
        key: 'GOOGLE_CSE_ID',
        value: '',
      },
    ],
  }
};



export const PluginList = Object.values(Plugins);
