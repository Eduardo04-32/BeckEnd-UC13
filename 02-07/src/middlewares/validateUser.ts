//Ele valida se os campos estão tudo certinhos (email, name e password)

import { NextFunction, Request, Response } from "express";

export function validateUser(req:Request, res: Response, next: NextFunction){
    // pega os dados que variam do corpor da requisição
    const {name, email, password} = req.body

    // vamos faer a validação agora
    if(!name || !email || !password){
        // status 400 é bad Request (requisição mal formada)
        mensagem: ""
    }

    if(password.length < 6){
        return res.status(400).json({
            mensage: "A senha deve ter mais de 6 caracteres, não 5,99999999999 "
        })
    }

    next();
    
}


