import db from "../database";
import { IProfileInput } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import { AuthError, MissingError } from "../reporting/rdb";

import { iuserauth } from "../resolvers/ruserauth";
import { iprofiles } from "../resolvers/rprofiles";
import checkvalid from "../lib/util/verification/checkvalid";
/* Make a profile using muations
    - 
    @param arguments    IProfileInput
*/
export default async function mprofile( _arguments: IProfileInput, ip: string ) {


    if ( checkvalid(_arguments.uid) ||  checkvalid(_arguments.username) || checkvalid(_arguments.propic)
        || checkvalid(_arguments.bio)) {
        // report and return null
        const report: Irepoting = {
            ip: ip,
            severity: 0,
            filename: 'mprofile',
            pid: 0,
            values: _arguments
        }
        await MissingError(report)
        return {state: "Missing Args", profile: null}
    };
    const useracc: iuserauth = await db.userauth.findAll({
        where: {
            userid: _arguments.uid
        }
    })
    // if (useracc.userid === undefined) {}
    // if (!verifyip(ip, useracc)) return null

    const createdaccount: iprofiles = db.profiles.create({
        username: _arguments.username,
        bio: _arguments.bio,
        rname: _arguments.rname

    }).catch((err: any) => {
        // handle
        if (err.name === "SequelizeUniqueConstraintError") {
            return {state: "Username is taken", profile: null}
        }
        return {state: "Error", profile: null}
    })
    return {state: "Sucess", profile: createdaccount}
    // return null
    
    
}