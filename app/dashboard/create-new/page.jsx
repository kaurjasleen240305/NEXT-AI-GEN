"use client"
import React, { useState, useContext, useEffect } from "react";
import SelectTopic from "./_components/selectTopic";
import SelectStyle from "./_components/selectStyle";
import SelectDuration from "./_components/selectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import CustomLoading from "./_components/CustomLoading";
import { videoDataContext } from "@/app/_context/VideoDataContext";
import { db } from "@/configs/db";
import { useUser } from "@clerk/nextjs";
import { VideoData as VideoDataModel } from "@/configs/schema";
import PlayerDialog from "../_components/PlayerDialog";

function CreateNew({children}){
    const [formData,setFormData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [videoScript,setvideoScript] = useState();
    const [audioFileURL,setAudioFileURL] = useState();
    const [captions,setCaptions] = useState();
    const [imagesData,setImages] = useState();
    const [videoData,setVideoData]=useContext(videoDataContext);
    const [playVideo,setplayVideo]=useState(false);
    const [videoId,setvideoId] = useState(2);
    const {user} = useUser()

    const onHandleInputChange = (fieldName,fieldValue)=>{
      console.log(fieldName,fieldValue)
      setFormData(prev=>({
        ...prev,
        [fieldName]:fieldValue
      }))
    }

    const onClickCreateHandler = ()=>{
        GetVideoScript();
    }

    //GET VIDEO SCRIPT 
    const GetVideoScript = async()=>{
      setLoading(true);
      const prompt = "Write a script to generate "+formData.duration +" video on topic : interesting "+formData.topic+ " story with AI image prompt in "+formData.imageStyle+" format for each and give me result in json format with imagePrompt and ContentText as field"
      const result = await axios.post('/api/get-video-script',{
        prompt:prompt
    }).then((resp)=>{
        console.log(resp.data);
        setVideoData(prev=>({
          ...prev,
          'scriptData':resp.data.result
        }))
        setvideoScript(resp.data.result);
        GenerateAudioFile(resp.data.result);
    })
      setLoading(false);
    }

    const GenerateAudioFile = async(videoScriptData)=>{
      let script = '';
      const id = uuidv4(); 
      videoScriptData.forEach(async(item)=>{
        script = script+ item.ContentText+" ";
      })
      setLoading(true);
      const result=await axios.post('/api/generate-audio',{
        text:script,
        id:id
      }).then(resp=>{
        console.log(resp.data);
        setVideoData(prev=>({
          ...prev,
          'audioFileURL':resp.data.Result
        }))
        setAudioFileURL(resp.data.Result);
        console.log("reached marked")
        GenerateAudioCaption(resp.data.Result,videoScriptData);
      })
      setLoading(false)
    }

    const GenerateAudioCaption = async(fileURL,videoScriptData)=>{
       setLoading(true);
       console.log(fileURL);
       const result = await axios.post('/api/generate-caption',{
        audioFileURL:fileURL,
       }).then(resp=>{
        console.log(resp?.data?.result);
        setVideoData(prev=>({
          ...prev,
          'videoCaptions':resp.data.result
        }))
        setCaptions(resp?.data?.result);
       })
       setLoading(false);
    }

    const GenerateImage =  (videoScriptData) => {
      let images=[]
      console.log("started");
      videoScriptData.forEach(async(element)=>{
        console.log(element.imagePrompt)
        await axios.post("/api/generate-image",{
          prompt:element.imagePrompt
        }).then(resp=>{
           images.push(resp.data.result);
          //  setVideoData(prev=>({
          //   ...prev,
          //   'imagesData':resp.data.result
          // }))
           setImages(images);
        });
      })
      console.log(images);
  };


  useEffect(()=>{
    console.log("njregnj")
    console.log(Object.keys(videoData).length);
     if(Object.keys(videoData).length==3){
        SaveVideoData(videoData);
     }
  },[videoData])

  const SaveVideoData=async(videoData)=>{
    setLoading(true);
    console.log("Visited");
    console.log(user);
    console.log(videoData);

    const result = await db.insert(VideoDataModel).values({
      script:videoData.scriptData,
      audioFileURL:videoData.audioFileURL,
      captions:videoData.videoCaptions,
      createdBy:user.primaryEmailAddress.emailAddress,
    }).returning({id:VideoDataModel.id});

    setvideoId(result[0].id);
    setplayVideo(true);
    setLoading(false);
  }


    return(
       <div className='md:px-20'>
        <h2 className="font-bold text-4xl text-primary text-center">CreateNew</h2>
        <div>
            {/* Select topic */}
            <div className="mt-10 shadow-md p-10">
              <SelectTopic onUserSelect={onHandleInputChange}/>
            </div>
            {/* Select Style  */}
            <div className="mt-10 shadow-md p-10">
              <SelectStyle onUserselect={onHandleInputChange}/>
            </div>
            {/* Duration  */}
              <SelectDuration onUserSelect={onHandleInputChange}/>
            {/* Create Button */}
            <Button className='mt-10 w-full' onClick={onClickCreateHandler}>Create Short Video</Button>
        </div>
        <CustomLoading loading={loading}/>
        <PlayerDialog playVideo={playVideo} videoId={videoId}/>
       </div>
    )
}

export default CreateNew;