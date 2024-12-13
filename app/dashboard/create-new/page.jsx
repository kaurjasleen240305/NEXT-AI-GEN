"use client"
import React from "react";
import SelectTopic from "./_components/selectTopic";
import SelectStyle from "./_components/selectStyle";
import SelectDuration from "./_components/selectDuration";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import CustomLoading from "./_components/CustomLoading";

function CreateNew({children}){
    const [formData,setFormData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [videoScript,setvideoScript] = useState();
    const [audioFileURL,setAudioFileURL] = useState();
    const [captions,setCaptions] = useState();

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
        setvideoScript(resp.data.result);
        GenerateAudioFile(resp.data.result);
    })
      setLoading(false);
    }

    const GenerateAudioFile = async(videoScriptData)=>{
      let script = '';
      const id = uuidv4(); 
      videoScriptData.forEach(item=>{
        script = script+ item.ContentText+" ";
      })
      setLoading(true);
      await axios.post('/api/generate-audio',{
        text:script,
        id:id
      }).then(resp=>{
        console.log(resp.data);
        setAudioFileURL(resp.data.result);
        GenerateAudioCaption(resp.data.result);
      })
      setLoading(false)
    }

    const GenerateAudioCaption = async(fileURL)=>{
       setLoading(true);
       await axios.post('/api/generate-caption',{
        "audioFileURL":fileURL
       }).then(resp=>{
        console.log(resp.data.result);
        setCaptions(resp.data.result);
       })
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
       </div>
    )
}

export default CreateNew;