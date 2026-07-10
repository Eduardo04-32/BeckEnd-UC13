import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validateUser } from "../middlewares/validateUser";

export const routes = Router()
const userController = new UserController()

routes.get('/users', userController.list.bind(userController))
routes.get('/users/:id',userController.getById.bind(userController))
routes.post('/users', validateUser, userController.create.bind(userController))
routes.put('/users/:id', validateUser, userController.update.bind(userController))
routes.delete('/users/:id', userController.delete.bind(userController))

 export default routes;