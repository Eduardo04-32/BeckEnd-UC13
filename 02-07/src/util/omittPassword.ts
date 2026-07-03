import {User} from "../models/User"

export function omitPassword(user:User){
    const { password , ...rest} = user 
    return rest 
}