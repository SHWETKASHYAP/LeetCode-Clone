const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');

const  userSchema=new mongoose.Schema({
    emailId : {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required:true,
    },
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
});

userSchema.method.matchPassword= async function(enteredPassword ){
    return await bcrypt.compare(enteredPassword,this.password);
};

const User=mongoose.model('User',userSchema);
module.exports= User;
