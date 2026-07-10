import { Request, Response, NextFunction } from 'express';
import { PostServices } from '../services/PostServices';

export class PostController {
    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await PostServices.listAll();
            return res.json(posts);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const post = await PostServices.getById(id);
            return res.json(post);
        } catch (error) {
            next(error);
        }
    }

    async listMyPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const loggedUser = (req as any).user
            const myPosts = PostServices.listMyPost(loggedUser.id)

            return res.status(200).json(myPosts)

            
        } catch (error) {
            next(error);
        }
    }



    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, userId } = req.body;
            const post = await PostServices.create({ title, userId });
            return res.status(201).json(post);
        } catch (error) {
            next(error);
        }
    }



    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const { title, userId } = req.body;
            const post = await PostServices.update(id, { title, userId });
            return res.json(post);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            await PostServices.delete(id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}