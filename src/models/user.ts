import { model, Schema, Document } from "mongoose"
// import bcrypt from "bcrypt"
import md5 from "md5"

export interface IUser extends Document{
    email: string,
    password: string
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre<IUser>('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();

    // const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(user.password, salt);
    const hash = md5(user.password);

    user.password = hash;
    next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean>{
    // return await bcrypt.compare(password, this.password);
    if(md5(password) === this.password)
    return true;
};

export default model<IUser>('User', userSchema);