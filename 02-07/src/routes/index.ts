import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validateUser } from "../middlewares/validateUser";
import { PostController } from "../controllers/PostController";
import { validatePost } from "../middlewares/ValidatePost";

export const routes = Router()

const userController = new UserController()
const postController = new PostController()

routes.get('/users', userController.list.bind(userController))
routes.get('/users/:id',userController.getById.bind(userController))
routes.post('/users', validateUser, userController.create.bind(userController))
routes.put('/users/:id', validateUser, userController.update.bind(userController))
routes.delete('/users/:id', userController.delete.bind(userController))

routes.get('/posts', postController.list.bind(postController))
routes.get('/posts/:id', postController.getById.bind(postController))
routes.post('/posts',  postController.create.bind(postController))
routes.put('/posts/:id', postController.update.bind(postController))
routes.delete('/posts/:id', postController.delete.bind(postController))