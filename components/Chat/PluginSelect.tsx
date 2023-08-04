import { FC, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { Plugin, PluginList, PluginName } from '@/types/plugin';

interface Props {
  plugin: Plugin | null;
  onPluginChange: (plugin?: Plugin) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLSelectElement>) => void;
}

export const PluginSelect: FC<Props> = ({
  plugin,
  onPluginChange,
  onKeyDown,
}) => {
  const [assistantNames, setAssistantNames] = useState([]);
  const { t } = useTranslation('chat');

  const selectRef = useRef<HTMLSelectElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSelectElement>) => {
    const selectElement = selectRef.current;
    const optionCount = selectElement?.options.length || 0;

    if (e.key === '/' && e.metaKey) {
      e.preventDefault();
      if (selectElement) {
        selectElement.selectedIndex =
          (selectElement.selectedIndex + 1) % optionCount;
        selectElement.dispatchEvent(new Event('change'));
      }
    } else if (e.key === '/' && e.shiftKey && e.metaKey) {
      e.preventDefault();
      if (selectElement) {
        selectElement.selectedIndex =
          (selectElement.selectedIndex - 1 + optionCount) % optionCount;
        selectElement.dispatchEvent(new Event('change'));
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectElement) {
        selectElement.dispatchEvent(new Event('change'));
      }

      onPluginChange(
        PluginList.find(
          (plugin) =>
            plugin.name === selectElement?.selectedOptions[0].innerText,
        ) as Plugin,
      );
    } else {
      onKeyDown(e);
    }
  };

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const fetchPlugins = async () => {
      const response = await fetch('api/plugins', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data : any = await response.json();
      var assistants = data.data.assistants.map( (assistant : any) => assistant.assistantName);
      assistants.push("Search Documents");
      setAssistantNames(assistants);
    };

    fetchPlugins();
  }, [setAssistantNames]);

  

  return (
    <div className="flex flex-col">
      <div className="mb-1 w-full rounded border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
        <select
          title={t('Select plugin') || ''}
          ref={selectRef}
          className="w-full cursor-pointer bg-transparent p-2"
          placeholder={t('Select a plugin') || ''}
          value={plugin?.id || ''}
          onChange={(e) => {
            if (e.target.value == "google") {
              var plugin : Plugin = {
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
              };
              onPluginChange(plugin);
            }
            else {
              var ass = assistantNames.find((assistant) => assistant == e.target.value);
              if (ass)
              {
                var plugin : Plugin = {
                  name : ass,
                  id : ass,
                  requiredKeys :[]
                }
                onPluginChange(plugin);
              } else {
                onPluginChange(undefined);
              }
          }
          }}
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
        >
          <option
            key="chatgpt"
            value="chatgpt"
            className="dark:bg-[#343541] dark:text-white"
          >ChatGPT</option>
           <option
            key="google"
            value="google"
            className="dark:bg-[#343541] dark:text-white"
          >Google Search</option>
       
          {assistantNames.map((assistant) => (
            <option
              key={assistant}
              value={assistant}
              className="dark:bg-[#343541] dark:text-white"
            >
              {assistant}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
