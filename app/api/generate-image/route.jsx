import { NextResponse } from "next/server";
import { storage } from "@/configs/FirebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export async function POST(req) {
        try {
            const {prompt}  = await  req.json();
            const response = await fetch('https://api.imagepig.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': process.env.NEXT_PUBLIC_IMAGE_PIG_API_KEY,
                },
                body: JSON.stringify({prompt}),
            });
            console.log(response);
            const json = await response.json();
            console.log(json);
            const fileName = "ai-short-video-files"+Date.now()+".png"
            const storageRef = ref(storage,fileName)
            await uploadString(storageRef,json.image_data,'data_url');
            const downloadUrl = getDownloadURL(storageRef);
            console.log(downloadUrl);
            return NextResponse.json({"result":json.image_data});
        } catch (error) {
            console.error('Error generating  jrgnjerg image:', error);
            return NextResponse.json({ error: 'Failed to generate image' });
        }
}
