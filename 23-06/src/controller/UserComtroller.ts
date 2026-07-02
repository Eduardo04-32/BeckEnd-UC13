import {Request, Response} from "express";

export class UserController{

    async getAll(req: Request, res: Response): Promise<Response>{
        return res.status(200).json({user:''})
    }

}