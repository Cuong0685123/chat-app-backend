import Friend from "../models/friends.model.js";

export const addFriend = async (req, res) =>{
    try {
        const {userId} = req.body
        const friend = await Friend.findById({
            userId
        })
        if(!friend){
            return res.status(400).json({
                message: "friend not found"
            })
       }
        const newFriend = new Friend({
            userId
        })
        await newFriend.save()
       return res.status(201).json({message: done})
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
        
    }
}