import React from 'react'
import YouTube from 'react-youtube'
import getId from './helpers/get-id'

const VideoPlayer = ({ url = '', mini }) => (
  <YouTube
    videoId={getId(url)}
    opts={{
      height: mini ? '195' : '390',
      width: mini ? '320' : '640',
      playerVars: {
        autoplay: 0,
      },
    }}
  />
)

export default VideoPlayer
