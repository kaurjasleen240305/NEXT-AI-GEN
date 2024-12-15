// npm install assemblyai

import { AssemblyAI } from 'assemblyai'
import { NextResponse } from 'next/server';

const client = new AssemblyAI({
  apiKey: process.env.NEXT_PUBLIC_ASSEMBLY_API_KEY
})

export async function POST(req){
    console.log("fhevhjf");
    console.log(req);
    const x = await req.json();

    const fileUrl = x.audioFileURL;

    const config = {
      audio: fileUrl
    }

    const transcript = await client.transcripts.transcribe(config)
    console.log(transcript.words)
    return NextResponse.json({'result':transcript.words});
  
}