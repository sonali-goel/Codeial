const Like=require('../models/like');
const Comment=require('../models/comment');
const Post=require('../models/post');
module.exports.togglelike=async function(req,res){
    try{
        let likeable;
        let deleted=false;
        if(req.query.type=='Post'){
            likeable=await  Post.findById(req.query.id).populated('likes');
        }else{
            likeable=await Comment.findById(req.query.id).populated('likes');
        }
        //check if a like already exists
        let existingLike=await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted:true;
        }else{
            let newLike=await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type,
             });
             likeable.likes.push(like._id);
             likeable.save();
        }
        return res.json(200,{
            message:"request Sucessfull",
            data:{
                deleted:deleted
            }
        })


    }catch(err){
        console.log( err);
        return res.json(200,{
            message:"internal server error"
        })


    }

}