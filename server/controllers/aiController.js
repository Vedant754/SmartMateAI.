import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { uploadImageToCloudinary } from "../configs/cloudinary.js";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const genArticle = async (req, res) => {
    try {
        const userId = req.userId;
        const { prompt, length } = req.body;
        console.log(prompt);

        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            res.json({ success: false, message: "Limit Reached" })
        }

        const response = await openai.chat.completions.create({
            model: "gemini-3.6-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length
        });

        console.log(response.choices[0].message);
        const content = response.choices[0].message.content;

        await sql` INSERT INTO creations (user_id,prompt,content,type)
        VALUES(${userId},${prompt},${content},'article')`;

        if (plan !== 'premium')
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1,
                }
            })

        res.json({ success: true, content })
    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message });

    }
}

export const genBlog = async (req, res) => {
    try {
        const userId = req.userId;
        const { prompt, total = 5 } = req.body;

        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== 'premium' && free_usage >= 10) {
            res.json({ success: false, message: "Limit Reached" })
        }
        console.log(`${prompt}.For this idea generate SEO optimized a total of ${total} titles`);
        const sentence = `${prompt}.For this idea generate SEO optimized a total of ${total} titles`

        const response = await openai.chat.completions.create({
            model: "gemini-3.6-flash",
            messages: [
                {
                    role: "user",
                    content: sentence,
                },
            ],
            temperature: 0.7,
            max_tokens: 300
        });
        const content = response.choices[0].message.content;

        await sql` INSERT INTO creations (user_id,prompt,content,type)
        VALUES(${userId},${prompt},${content},'blog')`;

        if (plan !== 'premium')
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1,
                }
            })

        res.json({ success: true, content })
    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message });

    }
}

export const genImg = async (req, res) => {
    try {
        const userId = req.userId;
        const { prompt } = req.body;

        const plan = req.plan;

        if (plan !== 'premium') {
            return res.json({ success: false, message: "Premium only feature" })
        }

        const form = new FormData()
        form.append('prompt', prompt)

        // Await the axios response
        const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', form, {
            headers: {
                'x-api-key': process.env.CLIP_API,
            },
            responseType: "arraybuffer"
        });

        const imageBuffer = response.data;
        // Upload to Cloudinary
        const cloudinaryResponse = await uploadImageToCloudinary(
            imageBuffer,
            `quicksol-${userId}-${Date.now()}`, // Unique public ID
            `quicksol/${userId}/images` // Folder structure
        );

        const imageUrl = cloudinaryResponse.secure_url;
        const publicId = cloudinaryResponse.public_id;

        // Store image URL in database
        await sql` INSERT INTO creations (user_id,prompt,content,type)
        VALUES(${userId},${prompt},${imageUrl},'image')`;

        if (plan !== 'premium')
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: (req.free_usage || 0) + 1,
                }
            })

        // Send image URL to client
        res.json({ success: true, imageUrl: imageUrl, publicId: publicId, prompt: prompt })
    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message });
    }
}