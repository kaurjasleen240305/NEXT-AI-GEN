import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Player } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { VideoData as VideoDataModel } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
  

function PlayerDialog({playVideo,videoId}) {
 
    const [openDialog,setDialog]=useState(false);
    const [videoData,setvideoData]=useState();
    const [duration,setduration] = useState(100);
    const router = useRouter();
    const cons = 30;

    const GetVideoData = async()=>{
       const result = await db.select().from(VideoDataModel).where(eq(VideoDataModel.id,videoId));
       console.log(result);
       const captions = result[0].captions;
       setduration(((captions[captions.length-1].end)/1000)*cons);
       setvideoData(result[0]);
    }

    useEffect(()=>{
       setDialog(!openDialog);
       videoId && GetVideoData();
    },[playVideo])

  return (
    <Dialog open={openDialog}>
  <DialogContent className="bg-white flex flex-col items-center">  
    <DialogHeader>
      <DialogTitle className="text-3xl font-bold my-5">Your Video is ready</DialogTitle>
      <DialogDescription>
        <Player
      component={RemotionVideo}
      durationInFrames={Number(duration.toFixed(0))}
      compositionWidth={300}
      compositionHeight={450}
      fps={30}
      controls={true}
      inputProps={{
        audioFileUrl:videoData?.audioFileURL,
        captions:videoData?.captions,
      }}
    />
      </DialogDescription>
      <div className='flex gap-10 justify-between'>
        <Button variant="ghost" onClick={()=>{router.replace('/dashboard');setDialog(false)}}>Cancel</Button>
        <Button>Export</Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default PlayerDialog
