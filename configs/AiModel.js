const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  console.log(apiKey)
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a script to generate 30secs video on topic : interesting historical story with AI image prompt in realistic format for each and give me result in json format with imagePrompt and ContentText as field\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"imagePrompt\": \"A detailed, realistic oil painting of a determined, young woman dressed in simple clothes, her face illuminated by the soft glow of a gas lamp, carefully examining a complex, hand-drawn astronomical chart on a wooden table, with a shelf of old books in the background. The scene should convey a sense of focused scientific pursuit in the 18th century.\",\n    \"ContentText\": \"In the 18th century, women were often excluded from scientific study. However, Caroline Herschel, a German astronomer, defied expectations. She meticulously cataloged stars, discovered comets, and assisted her brother William in his astronomical research, proving her brilliance in a field dominated by men.\"\n  },\n {\n    \"imagePrompt\": \"A realistic digital painting showing a vast, arid desert landscape under a bright blue sky, with a long caravan of camels silhouetted against the horizon. Some camels carry colorful, heavy chests, and men in traditional robes walk alongside, their faces showing determination. The overall feel should be of a long, arduous journey through the Sahara desert.\",\n     \"ContentText\": \"The legendary salt caravans that crisscrossed the Sahara Desert for centuries connected North and West Africa, facilitating trade of gold, salt, and other precious goods. This arduous journey played a crucial role in shaping the cultures and economies of the region.\"\n  },\n  {\n    \"imagePrompt\": \"A photorealistic image of a bustling city harbor with tall wooden ships with intricate rigging. People are busy loading and unloading cargo crates. The sky is slightly overcast, giving a sense of activity and industry of the early 17th century. Focus on details of the ships and their flags.\",\n    \"ContentText\":\"In the 17th century, the Dutch East India Company was a global superpower. Their ships dominated trade routes, bringing spices, silks, and other treasures back to Europe. This massive operation helped to lay the foundation for modern capitalism.\"\n  },\n{\n    \"imagePrompt\": \"A photorealistic image of a small, wooden schoolhouse on a snowy, winter day in rural America. Inside, a young, African American girl is intently reading a book while a stern teacher with glasses looks on approvingly. The scene should feel hopeful and inspiring, showcasing the pursuit of education.\",\n    \"ContentText\": \"After the Civil War, the fight for education among freed slaves was intense. Despite facing prejudice and hardship, many former slaves sought learning opportunities, building schools and communities, demonstrating an unwavering commitment to literacy and empowerment.\"\n  },\n  {\n    \"imagePrompt\": \"A realistic, detailed illustration of a Viking longship with a large, square sail, sailing on a choppy, grey sea. A small group of fierce-looking Viking warriors is on board. The clouds are dark, creating an atmosphere of both adventure and foreboding.\",\n    \"ContentText\": \"The Vikings, known for their fearless seafaring, didn't just raid. They also explored vast new territories, establishing trade routes and settlements across Europe, Greenland, and even North America, leaving a lasting impact on history.\"\n    },\n  {\n    \"imagePrompt\":\"A realistic image of a crowded marketplace in ancient Rome, with vendors selling various goods, like pottery, spices, and textiles. Roman citizens in togas walk around the area, showcasing the hustle and bustle of everyday life in the Roman Empire.\",\n     \"ContentText\":\"The Roman Empire was a center of commerce and innovation. Their sophisticated road network allowed trade to flourish, and their urban marketplaces became vibrant hubs for both goods and ideas, transforming the ancient world.\"\n    },\n    {\n     \"imagePrompt\":\"A detailed, realistic digital artwork of a group of women, dressed in simple, practical clothing, working together in a code-breaking room. They use different machines like an Enigma machine and are focused on their work during World War II.\",\n      \"ContentText\":\"During World War II, brilliant women played a critical role in codebreaking, including the work at Bletchley Park. They cracked secret enemy codes, providing crucial intelligence and ultimately contributing to the Allied victory.\"\n  },\n  {\n    \"imagePrompt\": \"A photorealistic image of a grand, opulent ballroom with crystal chandeliers and elegantly dressed people dancing the waltz. The atmosphere should feel romantic and graceful, capturing the height of European high society in the 19th century.\",\n    \"ContentText\":\"The 19th century was a period of lavish balls and social gatherings, which reflected the extravagance of the European aristocracy. These events showcased fashion, culture, and the intricate social structures of the time.\"\n  },\n{\n    \"imagePrompt\":\"A realistic digital painting of an Incan city high in the Andes Mountains, with complex stone structures built on terraces. The city should appear majestic and well-planned with intricate architecture. The mountains are green and the skies are clear.\",\n     \"ContentText\":\"The Inca civilization built massive stone structures like Machu Picchu and developed innovative farming techniques to thrive in the challenging mountainous environment. They had a rich culture and a complex political system.\"\n  },\n  {\n    \"imagePrompt\":\"A photorealistic image of a printing press in the 15th century with a man placing pages inside. Ink and papers surround it, capturing the revolutionary impact of the printing press and the spread of knowledge.\",\n     \"ContentText\":\"The invention of the printing press in the 15th century revolutionized the world. It allowed for the mass production of books, accelerating the spread of knowledge and influencing the Renaissance and the Reformation.\"\n   }\n]\n```\n"},
          ],
        },
      ],
    });
