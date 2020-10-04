const User=require('../models/user');
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"profile",
            profile_user:user
        })

    })
    
    
}
module.exports.update= async function(req,res){
    if(req.user.id== req.params.id){
        try{

            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('*****Multer Error:',err)}
                console.log(req.file);
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');

        }
        
    }else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
    
    
}
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"SignUP"
    })
    
}
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"SignIn"
    })
    
}
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding the user');return}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating the user');return}
                return res.redirect('/users/sign-in');
            })
        }else{  
            return res.redirect('back');
                
        }
           
    })
    
}
module.exports.CreateSession=function(req,res){
    req.flash('success','logged in successfully');
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','You have logged out');
    

    return res.redirect('/');
}