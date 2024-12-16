import React, { use, useEffect } from 'react'
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { useVideoConfig } from 'remotion';

function RemotionVideo({audioFileUrl,captions,setfps_s}) {
    const {fps} = useVideoConfig();
    const frame = useCurrentFrame();


    const getCurrentCaptions=()=>{
        const currentTime=(frame/30)*1000;
        const currentCaption = captions.find((word)=> currentTime>=word.start && currentTime<=word.end);
        return currentCaption?.text;
    }

    return(
        <div>
         <AbsoluteFill>
            <h2 className='text-black justify-center items-center h-full bottom-10 h-[150px] top-0'>{getCurrentCaptions()}</h2>
         </AbsoluteFill>
         <Audio src={audioFileUrl} />
        </div>
    )
}

export default RemotionVideo
