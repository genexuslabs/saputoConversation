import {
  IconCheck,
  IconCopy,
  IconEdit,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import { FC, memo, useContext, useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap';
import mapModule from 'highcharts/modules/map';

import { useTranslation } from 'next-i18next';

import { updateConversation } from '@/utils/app/conversation';

import { Message } from '@/types/chat';

import HomeContext from '@/pages/api/home/home.context';

import { CodeBlock } from '../Markdown/CodeBlock';
import { MemoizedReactMarkdown } from '../Markdown/MemoizedReactMarkdown';

//import rehypeMathjax from 'rehype-mathjax';
//import remarkGfm from 'remark-gfm';
//import remarkMath from 'remark-math';
import { IconProduct } from './IconProduct';
import { IconSaia } from '../Auth/Login';
import YoutubeVideo from './Renders/YoutubeRender';

const options =  {
  chart: {
      type: 'bar'
  },
  title: {
      text: 'Elecciones Argentina'
  },
  xAxis: {
      categories: ['Partido']
  },
  yAxis: {
      title: {
          text: 'Votos'
      }
  },
  series: [{
      name: 'LA LIBERTAD AVANZ',
      data: [30.04]
  }, {
      name: 'JUNTOS POR EL CAMBIO',
      data: [28.28]
  }, {
      name: 'UNION POR LA PATRIA',
      data: [27.7]
  }]
};


interface ChartComponentProps {
  chartString: string;
}


function convertToJson(str : string) {
  let inQuotes = false;
  let escaped = false;

  const result = str.split('').map((char, index) => {
    if (char === '\\' && !escaped) {
      escaped = true;
      return char;
    }

    if (char === '"' && !escaped) {
      inQuotes = !inQuotes;
    }

    if (char === "'" && str[index - 1] !== ':' && !inQuotes && !escaped) {
      return '"';
    }

    escaped = false;
    return char;
  }).join('');
  
  return result.replace(/(\w+):/g, '"$1":').replace('"percentage"', 'percentage')
  .replace('Highcharts.maps[custom/world]', `"Highcharts.maps[custom/world]"`)
  .replace('Highcharts.maps["custom/world"]', `"Highcharts.maps[custom/world]"`)
  .replace(`."percentage"`,'.percentage');
  ;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ chartString }) => {
  const correctedString = convertToJson(chartString);//.replace(/(\w+):/g, '"$1":');
  let options;
  heatmap(Highcharts);
  mapModule(Highcharts);

  try {
    
    options = JSON.parse(correctedString);
  } catch (e) {
    console.error("Error al parsear el contenido del mensaje:", e);
    return <div>{correctedString}</div>;
  }

  return (
    <div>
      {<HighchartsReact highcharts={Highcharts} options={options} />}
    </div>
  );
};



export interface Props {
  message: Message;
  messageIndex: number;
  onEdit?: (editedMessage: Message) => void
}

export const ChatMessage: FC<Props> = memo(({ message, messageIndex, onEdit }) => {
  const { t } = useTranslation('chat');

  const {
    state: { selectedConversation, conversations, currentMessage, messageIsStreaming },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState(message.content);
  const [messagedCopied, setMessageCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageContent(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleEditMessage = () => {
    if (message.content != messageContent) {
      if (selectedConversation && onEdit) {
        onEdit({ ...message, content: messageContent });
      }
    }
    setIsEditing(false);
  };

  const handleDeleteMessage = () => {
    if (!selectedConversation) return;

    const { messages } = selectedConversation;
    const findIndex = messages.findIndex((elm) => elm === message);

    if (findIndex < 0) return;

    if (
      findIndex < messages.length - 1 &&
      messages[findIndex + 1].role === 'assistant'
    ) {
      messages.splice(findIndex, 2);
    } else {
      messages.splice(findIndex, 1);
    }
    const updatedConversation = {
      ...selectedConversation,
      messages,
    };

    const { single, all } = updateConversation(
      updatedConversation,
      conversations,
    );
    homeDispatch({ field: 'selectedConversation', value: single });
    homeDispatch({ field: 'conversations', value: all });
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !isTyping && !e.shiftKey) {
      e.preventDefault();
      handleEditMessage();
    }
  };

  const copyOnClick = () => {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(message.content).then(() => {
      setMessageCopied(true);
      setTimeout(() => {
        setMessageCopied(false);
      }, 2000);
    });
  };

  useEffect(() => {
    setMessageContent(message.content);
  }, [message.content]);

  const [isShowingYoutubeVideo, setIsShowingYoutubeVideo] = useState<boolean>(false);

  useEffect(() => {
    setIsShowingYoutubeVideo(message.content.indexOf('youtube:') >= 0);
  }, [message.content]);


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  return (
    <div
      className={`group md:px-4 ${
        message.role === 'assistant'
          ? 'border-b border-black/10 bg-gray-50 text-gray-800 dark:border-gray-900/50 dark:bg-[#444654] dark:text-gray-100'
          : 'border-b border-black/10 bg-white text-gray-800 dark:border-gray-900/50 dark:bg-[#343541] dark:text-gray-100'
      }`}
      style={{ overflowWrap: 'anywhere', height: isShowingYoutubeVideo ? '500px' : 'auto'  }}
    >
      <div className="relative m-auto flex p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="min-w-[40px] text-right font-bold">
        {message.role === 'assistant' ? (
          message.plugin != 'google-search' ? <IconSaia size={30} /> : <IconProduct size={30} />
        ) : (
          <IconUser size={30} />
        )}

        </div>

        <div className="prose mt-[-2px] w-full dark:prose-invert">
          {message.role === 'user' ? (
            <div className="flex w-full">
              {isEditing ? (
                <div className="flex w-full flex-col">
                  <textarea
                    title='user message'
                    ref={textareaRef}
                    className="w-full resize-none whitespace-pre-wrap border-none dark:bg-[#343541]"
                    value={messageContent}
                    onChange={handleInputChange}
                    onKeyDown={handlePressEnter}
                    onCompositionStart={() => setIsTyping(true)}
                    onCompositionEnd={() => setIsTyping(false)}
                    style={{
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      lineHeight: 'inherit',
                      padding: '0',
                      margin: '0',
                      overflow: 'hidden',
                    }}
                  />

                  <div className="mt-10 flex justify-center space-x-4">
                    <button
                      className="h-[40px] rounded-md bg-green-500 px-4 py-1 text-sm font-medium text-white enabled:hover:bg-green-600 disabled:opacity-50"
                      onClick={handleEditMessage}
                      disabled={messageContent.trim().length <= 0}
                    >
                      {t('Save & Submit')}
                    </button>
                    <button
                      className="h-[40px] rounded-md border border-neutral-300 px-4 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                      onClick={() => {
                        setMessageContent(message.content);
                        setIsEditing(false);
                      }}
                    >
                      {t('Cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose whitespace-pre-wrap dark:prose-invert flex-1">
                  {message.content}
                </div>
              )}

              {!isEditing && (
                <div className="md:-mr-8 ml-1 md:ml-0 flex flex-col md:flex-row gap-4 md:gap-1 items-center md:items-start justify-end md:justify-start">
                  <button
                    title='editing'
                    className="invisible group-hover:visible focus:visible text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={toggleEditing}
                  >
                    <IconEdit size={20} />
                  </button>
                  <button
                    title='delete'
                    className="invisible group-hover:visible focus:visible text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={handleDeleteMessage}
                  >
                    <IconTrash size={20} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
         
           <div className="flex flex-row" style={{ height: isShowingYoutubeVideo ? '500px' : 'auto' }}>
              {message.content.indexOf('youtube:') >= 0 ? <YoutubeVideo searchTerm={message.content.replace("youtube:", "")} apiKey={process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || ''} /> : 
               message.content.indexOf('chart')   >= 0  ? <ChartComponent chartString={message.content} /> :
              <MemoizedReactMarkdown
                className="prose dark:prose-invert flex-1"
       //         remarkPlugins={[remarkGfm, remarkMath]}
         //       rehypePlugins={[rehypeMathjax]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    if (children.length) {
                      if (children[0] == '▍') {
                        return <span className="animate-pulse cursor-default mt-1">▍</span>
                      }

                      children[0] = (children[0] as string).replace("`▍`", "▍")
                    }

                    const match = /language-(\w+)/.exec(className || '');

                    return !inline ? (
                      <CodeBlock
                        key={Math.random()}
                        language={(match && match[1]) || ''}
                        value={String(children).replace(/\n$/, '')}
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  table({ children }) {
                    return (
                      <table className="border-collapse border border-black px-3 py-1 dark:border-white">
                        {children}
                      </table>
                    );
                  },
                  th({ children }) {
                    return (
                      <th className="break-words border border-black bg-gray-500 px-3 py-1 text-white dark:border-white">
                        {children}
                      </th>
                    );
                  },
                  td({ children }) {
                    return (
                      <td className="break-words border border-black px-3 py-1 dark:border-white">
                        {children}
                      </td>
                    );
                  },
                }}
              >
                {`${message.content}${
                  messageIsStreaming && messageIndex == (selectedConversation?.messages.length ?? 0) - 1 ? '`▍`' : ''
                }`}
              </MemoizedReactMarkdown>}

              <div className="md:-mr-8 ml-1 md:ml-0 flex flex-col md:flex-row gap-4 md:gap-1 items-center md:items-start justify-end md:justify-start">
                {messagedCopied ? (
                  <IconCheck
                    size={20}
                    className="text-green-500 dark:text-green-400"
                  />
                ) : (
                  <button
                    title='copy'
                    className="invisible group-hover:visible focus:visible text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={copyOnClick}
                  >
                    <IconCopy size={20} />
                  </button>
                )}
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
ChatMessage.displayName = 'ChatMessage';
