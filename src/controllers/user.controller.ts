import { Request, Response } from "express"
import User, { IUser } from "../models/user"

export const signUp = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({msg: 'Please send your email and password'});
    }
    const user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({msg: 'the user already exists'});
    }
}

export const signIn = (req: Request, res: Response) => {
    res.send('signin');
}