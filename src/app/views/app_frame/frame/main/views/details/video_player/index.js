import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({url}) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  }

  const onReady = ( event ) => {
    event.target.pauseVideo()
  }

  const YouTubeGetID = ( url ) => {
    var ID = '';

    url = url.replace( /(>|<)/gi,'' ).split( /(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/ );
    if ( url[2] !== undefined ) {
      ID = url[2].split( /[^0-9a-z_\-]/i );
      ID = ID[0];
    }
    else {
      ID = url;
    }

    return ID;
  }

  const id = YouTubeGetID( url )

  return (
    <YouTube
      videoId={id}
      opts={opts}
      onReady={onReady}
    />
  );
}

export default VideoPlayer
