import { Request, Response } from 'express';
import User from './../model/member-model';

export const signUp = async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    console.log(req.body);
    console.log(user);

    res.status(201).json({
        status: 'success',
        msg: 'user is sign up successfully',
        user
    })
}