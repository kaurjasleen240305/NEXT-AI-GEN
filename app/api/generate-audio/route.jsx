import { NextResponse } from 'next/server';
import {getDownloadURL,ref,uploadBytes} from 'firebase/storage'
import { storage } from '@/configs/FirebaseConfig';

const textToSpeech = require('@google-cloud/text-to-speech');

const client = new textToSpeech.TextToSpeechClient({
    apiKey:process.env.NEXT_PUBLIC_TEXT_TO_SPEECH
});

const fs = require('fs');
const util = require('util');

export async function POST(req){
   const {text,id} = await req.json();

   const storageRef = ref(storage,'ai-short-video-files/'+id+'.mp3')
   
   const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  const [response] = await client.synthesizeSpeech(request);
  
  const audioBuffer = Buffer.from(response.audioContent,'binary');

  await uploadBytes(storageRef,audioBuffer,{contentType:'audio/mp3'});

  const downloadUrl = await getDownloadURL(storageRef);

  console.log('Audio content written to file: output.mp3');

  console.log(downloadUrl);

  return NextResponse.json({Result:downloadUrl});
}