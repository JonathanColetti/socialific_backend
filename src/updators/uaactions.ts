import db from "../database"
import { iuserauth } from "../lib/util/interfaces/tables"

interface UActionInput {
    uid: string
    phonenum: string
    email: string
    userpass: string
}

const userauthedit = async (args: UActionInput, ip: string): Promise<string | null> => {
    
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
        var passre: RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,26}$/;
        if (!passre.test(args.userpass)) return "invalid pass"
        theauth.update({
            userpass: args.userpass
        })
    }
    return "Sucess"
}