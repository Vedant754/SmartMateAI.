
// Middleware to check userId and hasPremium
import { clerkClient, getAuth } from '@clerk/express'

export const auth = async (req,res,next)=>{
    try{
        const { userId } = getAuth(req);
        
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        
        const hasPremiumPlan = true; // You may need to check this with Clerk's API
        const user = await clerkClient.users.getUser(userId);

        if(!hasPremiumPlan && user.privateMetadata?.free_usage){
            req.free_usage = user.privateMetadata.free_usage; 
        }else{
            await clerkClient.users.updateUserMetadata(userId,{
                privateMetadata:{
                    free_usage : 0
                }
            })
            req.free_usage = 0;
        }
        req.plan = hasPremiumPlan ? 'premium' : 'free';
        req.userId = userId;
        next();

    }catch(err){
            res.json({success:false , message:err.message})
    }
}