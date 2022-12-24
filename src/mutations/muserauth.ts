import db from "../database";
import { IUauthInput } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import verifyip from "../lib/util/verification/checkip";
import { MissingError } from "../reporting/rdb";
import { iuserauth } from "../resolvers/ruserauth";
import { UUIDV4 } from "sequelize";
export default async function muserauth(_arguments: IUauthInput, ip: string) {
    // (A+B+C)(C+D)
    if ((_arguments.password === undefined || _arguments.birthday === undefined || _arguments.gender === undefined) && 
    (_arguments.phonenum === undefined || _arguments.email === undefined)) {
        const report: Irepoting = {
            severity: 0,
            ip: ip,
            filename: 'muserauth',
            values: _arguments
        }
        MissingError(report)
        return {state: "Missing arg", userauth: null}
    }
    // create uid
    console.log(UUIDV4.key)
    const createdua: iuserauth = await db.userauth.create({
        userid: UUIDV4,
        password: _arguments.password,
        birthday: _arguments.birthday,
        gender: _arguments.gender,
        phonenum: _arguments.phonenum,
        email: _arguments.email,
        ipaddr: ip,

    }).catch((err: any) => {
        console.log(err)
    })
    console.log(createdua.userid)
    return {state: "Sucess", createdua}


     
}