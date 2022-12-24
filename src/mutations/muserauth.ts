import db from "../database";
import { IUauthInput } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import verifyip from "../lib/util/verification/checkip";
import { MissingError } from "../reporting/rdb";
import { iuserauth } from "../resolvers/ruserauth";
import { v4 as uuidv4 } from "uuid";

/*
    TODO
        - Verify birthday
        - Think about UUID collision
        - Error Formatting
*/
export default async function muserauth(_arguments: IUauthInput, ip: string) {
    // (A+B+C)(C+D)
    if ((_arguments.password === undefined || _arguments.birthday === undefined || _arguments.gender === undefined) && 
    (_arguments.phonenum === undefined || _arguments.email === undefined)) {
        const report: Irepoting = {
            severity: 0,
            pid: 0,
            ip: ip,
            filename: 'muserauth',
            values: _arguments
        }
        MissingError(report)
        return {state: "Missing arg", userauth: null}
    }
    if (_arguments.phonenum !== undefined) {}
    if (_arguments.email !== undefined) {}
    
    const createdua: iuserauth = await db.userauth.create({
        userid: uuidv4(),
        password: _arguments.password,
        birthday: _arguments.birthday,
        gender: _arguments.gender,
        phonenum: _arguments.phonenum,
        email: _arguments.email,
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
    return {state: "Sucess", createdua}


     
}