import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload, Secret } from "jsonwebtoken"


const verifytoken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as JwtPayload
}


const auth = (...roles: string[]) => {
     return async ( req: Request & {user?: any}, res: Response, next: NextFunction)=> {
        try {
            const token = req.cookies.accesstoken

            if (!token){
                throw new Error ("there are somethin worng ")
            }

            const verifyuser = verifytoken(token, "abcd")

            req.user = verifyuser

            if(roles.length &&  !roles.includes (verifyuser.role)){
                throw new Error ("there are somethin worng ")
            }

            next()
        } catch (err) {
            next(err)
        }
    }
}

export default auth