import db from "../database";
import { IUauthInput } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import verifyip from "../lib/util/verification/checkip";
import { MissingError } from "../reporting/rdb";
import { v4 as uuidv4 } from "uuid";
import { iuserauth } from "../lib/util/interfaces/tables";

/*
    TODO
        - Verify birthday
        - Think about UUID collision
        - Error Formatting
*/
export default async function muserauth(args: IUauthInput, ip: string) {
    // (A+B+C)(C+D)
    if ((args.password === undefined || args.birthday === undefined || args.gender === undefined) && 
    (args.phonenum === undefined || args.email === undefined)) {
        const report: Irepoting = {
            severity: 0,
            pid: 0,
            ip: ip,
            filename: 'muserauth',
            values: 'args'
        }
        MissingError(report)
        return {state: "Missing arg", userauth: null}
    }
    const checkphone: iuserauth = await db.userauth.findOne({
        where: {
            phonenum: args.phonenum
        }
    })
    if (checkphone.phonenum == args.phonenum) return {state: "Duplicate phone", userauth: null}
    const checkemail: iuserauth = await db.userauth.findOne({
        where: {
            email: args.email
        }
    })
    if (checkemail.email == args.email) return {state: "Duplicate email", userauth: null}
    const createdua: iuserauth = await db.userauth.create({
        userid: uuidv4(),
        password: args.password,
        birthday: args.birthday,
        gender: args.gender,
        phonenum: args.phonenum,
        email: args.email,
        ipaddr: ip,

    }).catch((err: any) => {
        if (err.message.startsWith("notNull")) {
            // TODO format the error to show which field is null
            return {
                state: err.message,
                userauth: null
            }
        }
        return {state: err.message, userauth: null}
    })
    return {state: "Sucess", userauth: createdua}


     
}