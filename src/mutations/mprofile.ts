import db from "../database";
import { IProfileInput } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import { AuthError, MissingError } from "../reporting/rdb";

import { iprofiles, iuserauth } from "../lib/util/interfaces/tables";
import checkvalid from "../lib/util/verification/checkvalid";
/* 
Make a profile using muations
    a. Check if valid args are sent if not report
    b. check validitity of args
    c. create account catch any errors
    d. return profile and state
TODO
    - fix checkvalid 
*/
export default async function mprofile( args: IProfileInput, ip: string ) {
    if ( args.username === undefined || args.uid === undefined ) {
        // report and return null
        const report: Irepoting = {
            ip: ip,
            severity: 0,
            filename: 'mprofile',
            pid: 0,
            values: args
        }
        await MissingError(report)
        return {state: "Missing Args", profile: null}
    };
    // check valid uid
    const useracc: iuserauth = await db.userauth.findOne({
        where: {
            userid: args.uid
        }
    })
    if (useracc.userid === undefined) return {state:"Non valid uid", profile: null}
    // check valid ip
    // if (!verifyip(ip, useracc)) {
    //     // 2fa
    // }
    // create account
    const createdaccount: iprofiles | string = await db.profiles.create({
        username: args.username,
        auid: useracc.id,
        bio: args.bio,
        rname: args.rname

    }).catch((err: any) => {
        // handle
        if (err.name == "SequelizeUniqueConstraintError") {
            return "Error: username is taken"
        } else {
            return "Error: unkown"
        }
    })
    if (typeof createdaccount == 'string' ) return {state: createdaccount, profile: null}
    return {state: "Sucess", profile: createdaccount}
}