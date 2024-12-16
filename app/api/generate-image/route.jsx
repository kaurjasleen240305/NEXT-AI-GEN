import { NextResponse } from "next/server";
import { storage } from "@/configs/FirebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export async function POST(req) {
        try {
            const {prompt}  = await  req.json();
            const response = await fetch('https://app.imggen.ai/v1/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-IMGGEN-KEY': process.env.NEXT_PUBLIC_IMAGE_PIG_API_KEY,
                },
                body:JSON.stringify({
                    "prompt":prompt,
                    "aspect_ratio":"square",
                    "model":"imggen-base-fast"
                }),
            });
            console.log("Response of inbhkmage api")
            console.log(response);
            const json = await response.json();
            console.log(json);
            // const image_data = json.images[0];
            // console.log(image_data);
            // const fileName = "ai-short-video-files"+Date.now()+".png"
            // const storageRef = ref(storage,fileName)
            // await uploadString(storageRef,image_data,'data_url');
            // const downloadUrl = getDownloadURL(storageRef);
            // console.log(downloadUrl);
            return NextResponse.json({"result":"hell"});
        } catch (error) {
            console.error('Error generating  jrgnjerg image:', error);
            return NextResponse.json({ error: 'Failed to generate image' });
        }
}
