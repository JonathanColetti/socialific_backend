import db from "../database"
import { IRmUa } from "../lib/util/interfaces/inputs"
import { Irepoting } from "../lib/util/interfaces/reports"
import { iuserauth } from "../lib/util/interfaces/tables"
import { MissingError } from "../reporting/rdb"

export interface UActionInput {
    uid: string
    phonenum: string
    email: string
    userpass: string
}


/* edit userauth
    a. check args
    b. return updated
TODO 
    return new userauth
    
    
*/
export const userauthedit = async (args: UActionInput, ip: string): Promise<string | null> => {
    
    if (args.uid === undefined) return null;
    const theauth: any = await db.userauth.findOne({
        where: {
            userid: args.uid
        }
    })
    if (args.phonenum !== undefined) {
        // check valid phonenum
        let phonere: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        if (!phonere.test(args.phonenum)) return "invalid phone";
        theauth.update({
            phonenum: args.phonenum
        })
    }
    if (args.email !== undefined) {
        // 2fa with new email n send report of changed
        let emailre: RegExp = /\S+@\S+\.\S+/;
        if (!emailre.test(args.email)) return "invalid email";
        theauth.update({
            email: args.email
        })
    }
    if (args.userpass !== undefined) {
        // valid password between 8,26 chars
        var passre: RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,26}$/;
        if (!passre.test(args.userpass)) return "invalid pass"
        theauth.update({
            userpass: args.userpass
        })
    }
    return "Sucess";
}

/* delete userauth
    a. check args
    b. find one
    c. 
*/
export const deleteua = async (args: IRmUa, ip: string): Promise<null | "Sucess"> => {
    if (args.uid === undefined && args.password === undefined) {
        const report: Irepoting = {
            ip: ip,
            severity: 0,
            filename: "deleteua",
            values: undefined,
            pid: 0
        }
        MissingError(report)
        return null;
    }
    const theauth = await db.userauth.findOne({
        where: {
            userid: args.uid,
            password: args.password
        }
    }).catch((err: any) => {console.error(err)})
    await theauth.destory();
    return "Sucess";
}