import db from "../database";
import { IProfileInput } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import { AuthError, MissingError } from "../reporting/rdb";
import { iuserauth } from "../resolvers/ruserauth";
import profiles from "../models/profiles"
import { verify } from "crypto";
import verifyip from "../lib/util/verification/checkip";
/* Make a profile using muations
    - 
    @param arguments    IProfileInput
*/
export default async function mprofile( _arguments: IProfileInput, ip: string ) {


    if (_arguments.uid === undefined || _arguments.username === undefined || _arguments.propic === undefined
        || _arguments.bio === undefined) {
        // report and return null
        const report: Irepoting = {
            ip: ip,
            severity: 0,
            filename: 'mprofile',
            values: _arguments
        }
        await MissingError(report)
        return null
    };

    const useracc: iuserauth = await db.userauth.findAll({
        where: {
            userid: _arguments.uid
        }
    })
    // if (useracc.userid === undefined) return null
    // if (!verifyip(ip, useracc)) return null

    const createdaccount = db.profiles.create({
        username: _arguments.username,
        bio: _arguments.bio

    }).catch((err: any) => {
        // handle 
        if (err.name == 'SequelizeUniqueConstraintError') {
            // if duplicate username
            return null
        }
    })
    return null
    
    
}