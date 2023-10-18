import { Router } from "express";


import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCardController } from "./controllers/user/CreateCardController";

const router = Router();

router.post('/user', new CreateUserController().handle)
router.post('/card', new CreateCardController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/userinfo', isAuthenticated, new DetailUserController().handle)



export { router };