const nodemailer=require('../config/nodemailer');
const { getMaxListeners } = require('../models/user');
exports.newComment=(comment)=>{
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    console.log('inside new comment mailer',comment);
    nodemailer.transporter.sendMail({
        from:'jainpiyush.hsr@gmail.com',
        to:comment.user.email,
        subject:"new comment published",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message send',info);
            return;

    })
}