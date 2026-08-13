import OpenAI from "openai";
import sql from "../configs/db";
import { clerkClient } from "@clerk/express";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const genArticle = async (req, res) => {
    try {
        const userId = req.auth();
        const { prompt, length } = req.body;
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
            temperature:0.7,
            max_completion_tokens = length
        });

        console.log(response.choices[0].message);
        const content = response.choices[0].message.content;

        await sql`INSERT INTO creations (user_id,prompt,content,type)
        VALUES(${userId},${prompt},${content},"article")`;

        if(plan !== 'premium')
            await clerkClient.users.updateUserMetadata(userId,{
                privateMetadata:{
                    free_usage: free_usage+1,
                }
        })

        response.json({success:true,content})
    } catch (err) {
        console.log(err.message);
        response.json({success:false,message:err.message});
        
    }
}