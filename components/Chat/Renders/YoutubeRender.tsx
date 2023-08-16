import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import styles from './YoutubeVideo.module.css'; // Importa el archivo CSS

interface YoutubeVideoProps {
  apiKey: string;
  searchTerm: string;
}

interface VideoItem {
  id: { videoId: string };
  snippet: { title: string };
}

const YoutubeVideo: FC<YoutubeVideoProps> = ({ apiKey, searchTerm }) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchTerm}&key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.items.length > 0) {
          setVideoItems(data.items);
          setVideoId(data.items[0].id.videoId);
        }
      })
      .catch(error => console.error('Error:', error));
  }, [apiKey, searchTerm]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setVideoId(event.target.value);
  };

  return (
    videoId ? (
      <div className={styles.youtubeContainer}>
        <select title="select video" className={styles.videoSelector} value={videoId} onChange={handleSelectChange}>
          {videoItems.map((item) => (
            <option key={item.id.videoId} value={item.id.videoId}>
              {item.snippet.title}
            </option>
          ))}
        </select>
        <iframe
          className={styles.videoFrame}
          src={`https://www.youtube.com/embed/${videoId}`}
          style={{width: '100%' ,height:'80%'}}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    ) : null
  );
}

export default YoutubeVideo;