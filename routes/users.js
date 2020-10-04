const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/users_controller')

console.log("router loaded")
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);
router.get('/sign-out',usersController.destroySession);
router.post('/create',usersController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/sign-in'
    },
),usersController.CreateSession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.CreateSession);
module.exports=router;