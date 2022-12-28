import db from "../database";
import { IProfileInput } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports"
import { iprofiles, iuserauth } from "../lib/util/interfaces/tables";
import checkProperties from "../lib/util/verification/checkvalid";
import { MissingError } from "../reporting/rdb"

/* like, rmlike, view profile
    a. Check valid args
    b. add rm or view
    c. return sucess or null
TODO
    1. check if view already exists
*/
export const practions = async (_arguments: {uid: string, profileid: number }, ip: string, addorrm: string): Promise<null | string> => {
    if (_arguments.uid === undefined || _arguments.profileid === undefined) {
        const report: Irepoting = {
            ip: "",
            severity: 0,
            filename: "",
            values: undefined,
            pid: 0
        }
        MissingError(report);
        return null;
    }
    const theauth: iuserauth = db.userauth.findOne({
        where: {
            userid: _arguments.uid
        }
    })
    if (theauth.id === undefined) {
        // auth error
        return null;
    }
    if (addorrm === "add") {
        await db.profilelikes.create({
            auid: theauth.id,
            profileid: _arguments.profileid
        }).catch((err: any) => console.error(err))
        return "Sucess"
    }
    else if (addorrm === "rm") {
        const todelete = await db.profilelikes.findOne({
            where: {
                auid: theauth.id,
                profileid: _arguments.profileid
            }
        }).catch((err: any) => console.error(err))
        await todelete.destory()
        return "Sucess"
    } else {
        await db.profileviews.create({
            auid: theauth.id,
            profileid: _arguments.profileid
        }).catch((err: any) => console.error(err))
        return "Sucess"
    }
}


const pprofileactions = async (_arguments: IProfileInput , ip: string, ) => {
    if (!checkProperties(_arguments)) {
        const report: Irepoting = {
            ip: "",
            severity: 0,
            filename: "",
            values: undefined,
            pid: 0
        }
        MissingError(report)
        return null;
    }
    const theauth: iuserauth = await db.userauth.findOne({
        where: {
            userid: _arguments.uid
        }
    })
    const profile: any = await db.profiles.findOne({
        where: {
            auid: theauth.id      
        }
    })
    profile.set({
        
    })
}