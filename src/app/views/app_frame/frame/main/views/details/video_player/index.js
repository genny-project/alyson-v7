import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = () => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  }

  const onReady = ( event ) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  return (
    <YouTube
      videoId="2g811Eo7K8U"
      opts={opts}
      onReady={onReady}
    />
  );
}

export default VideoPlayer
