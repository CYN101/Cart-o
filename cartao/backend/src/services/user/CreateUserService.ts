import { Request, response, Response } from "express";
import prismaClient from "../../prisma";


interface UserRequest {
    nome: string,
    cpf: string

}

class CreateUserservice {

    async execute({ nome, cpf }: UserRequest) {

        if (!cpf) {
            throw new Error("CPF não foi enviado !!!")
        }

        const UserAlreadyExists = await prismaClient.usuario.findFirst({
            where: {
                cpf: cpf
            }
        })

        if (UserAlreadyExists) {
            throw new Error("CPF já foi cadastrado !!!");
        }

        const user = await prismaClient.usuario.create({
            data: {
                nome: nome,
                cpf: cpf,
            },
            select: {
                id: true,
                nome: true,
                cpf: true,
            }
        })
        return user;
    }
}

export { CreateUserservice }