
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    cpf: string;
    nome: string;
}

class AuthUserService {
    async excute({ nome, cpf }: AuthRequest) {
        const user = await prismaClient.usuario.findFirst({
            where: {
                cpf: cpf,
                nome: nome
            }
        })

        if (!user) {
            throw new Error("usuario ou cpf essta incorretos !!!")
        }


        const token = sign(
            {
                nome: user.nome,
                cpf: user.cpf
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '10m'
            }
        )

        return {
            id: user.id,
            nome: user.nome,
            cpf: user.cpf,
            token: token
        }
    }
}
export { AuthUserService };