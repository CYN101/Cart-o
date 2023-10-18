import { Request, Response } from "express";
import prismaClient from "../../prisma";

interface UserRequest {
    numero: string,
    codigo: string,
    senha: string,
    id_usuario: string
}

class CreateCardService {
    async execute({ numero, codigo, senha, id_usuario }: UserRequest) {
        if (!numero) {
            throw new Error("numero nao foi enviado, erro desconhecido ")
        }

        const UserAlreadyExists = await prismaClient.cartao.findFirst({
            where: {
                numero: numero
            }
        })

        if (UserAlreadyExists) {
            throw new Error("Número já cadastrado");
        }


        const card = await prismaClient.cartao.create({
            data: {
                numero: numero,
                codigo: codigo,
                senha: senha,
                id_usuario: id_usuario,
            },
            select: {
                id: true,
                numero: true,
                senha: true,
                id_usuario: true,
            }
        })
        return card;

    }
}

export { CreateCardService }