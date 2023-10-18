import { Request, response, Response } from "express";
import { CreateUserservice } from "../../services/user/CreateUserService";


class CreateUserController {

    async handle(req: Request, res: Response) {
        console.log(req.body)
        const { nome, cpf } = req.body;

        const createUserService = new CreateUserservice();
        const user = await createUserService.execute({ nome, cpf });

        return res.json({ user })
    }
}

export { CreateUserController }