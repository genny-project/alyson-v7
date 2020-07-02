import React from 'react'
import YouTube from 'react-youtube'
import getId from './helpers/get-id'

const VideoPlayer = ({ url = '' }) => (
  <YouTube
    videoId={getId(url)}
    opts={{
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
      },
    }}
  />
)

export default VideoPlayer
