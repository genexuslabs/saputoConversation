import { ReactNode } from "react";
import YoutubeVideo from '../Renders/YoutubeRender';
import { ChartRender } from "./ChartRender";
import { MemoizedReactMarkdown } from "@/components/Markdown/MemoizedReactMarkdown";
import { Message } from "/Users/gmilano/chatgptui/globantGPT/types/chat";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/Markdown/CodeBlock";

export function renderContent(content: string): ReactNode {
    const saiaRegex = /<saia render="(?<render>[^"]*)">(?<content>[\s\S]*?)<\/saia>/;
    const match = saiaRegex.exec(content);
    if (match?.groups) {
      const renderType = match.groups['render'];
      const renderContent = match.groups['content'];
      return renderFactory(renderType, renderContent);
    }
    return null;
}

export function renderFactory(renderType: string, renderContent: string): ReactNode {
  switch (renderType) {
    case 'highcharts':
      return <ChartRender chartString={renderContent} />;
    case 'youtube':
      return <YoutubeVideo searchTerm={renderContent.replace("youtube:", "")} apiKey={process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || ''} />;
    default:
      return null;
    }
}

export function renderMarkdown(message: Message, messageIsStreaming: boolean, messageIndex: number, selectedConversation: import("/Users/gmilano/chatgptui/globantGPT/types/chat").Conversation | undefined): ReactNode {
    return <MemoizedReactMarkdown
      className="prose dark:prose-invert flex-1"
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          if (children.length) {
            if (children[0] == '▍') {
              return <span className="animate-pulse cursor-default mt-1">▍</span>;
            }
  
            children[0] = (children[0] as string).replace("`▍`", "▍");
          }
          const match = /language-(\w+)/.exec(className || '');
          return !inline ? (
            <CodeBlock
              key={Math.random()}
              language={(match && match[1]) || ''}
              value={String(children).replace(/\n$/, '')}
              {...props} />
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
      {`${message.content}${messageIsStreaming && messageIndex == (selectedConversation?.messages.length ?? 0) - 1 ? '`▍`' : ''}`}
    </MemoizedReactMarkdown>;
  }
  