import { NextFunction, Request, Response } from "express";

export function errorHandler(error: any,  rep: Request, res: Response, next: NextFunction){

    console.log("Erro cacturtado pela errorHandler: ", error )

    if (error.code === 'ER_DUP_ENTRY'){
        return res.status(409).json({
            mensage: "Registro duplicado (email já existentes)"
        })
    }

    return res.status(500).json({
        mensage: "Erro interno do servidor. Traduzindo: DEU RUIM, GURIZADA!"
    })
}