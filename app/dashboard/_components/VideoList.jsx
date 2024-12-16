import React, { useState } from 'react'
import { Thumbnail } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import PlayerDialog from './PlayerDialog';

function VideoList({videoList}) {

  const [openDialog,setopenDialog]=useState(false);
  const [videoId,setvideoId]=useState(1);
  return (
    <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7'>
      {videoList.map((item,index)=>(
        <div className='cursor-pointer hover:scale-105 transition-all' onClick={()=>{setopenDialog(Date.now());setvideoId(item.id)}}>
             <Thumbnail
      component={RemotionVideo}
      compositionWidth={150}
      compositionHeight={300}
      frameToDisplay={30}
      durationInFrames={120}
      fps={30}
      style={{
        border:'solid black 2px'
      }}
      inputProps={{
        audioFileUrl:item.audioFileURL,
        captions:item.captions
      }}
    />
        </div>
      ))}
     <PlayerDialog playVideo={openDialog} videoId={videoId}/>
    </div>
  )
}

export default VideoList
