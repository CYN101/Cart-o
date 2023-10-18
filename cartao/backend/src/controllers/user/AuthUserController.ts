import { Request, Response } from 'express';
import { AuthUserService } from '../../services/user/AuthUserService';

class AuthUserController {
    async handle(req: Request, res: Response) {
        const { nome, cpf } = req.body;
        const authUserService = new AuthUserService();
        const auth = await authUserService.excute({
            nome,
            cpf
        })
        return res.json(auth);
    }
}
export { AuthUserController }