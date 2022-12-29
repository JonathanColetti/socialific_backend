import db from "../database";
import { IProfileInput, IRmPr } from "../lib/util/interfaces/inputs";
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
export const practions = async (args: {uid: string, profileid: number }, ip: string, addorrm: string): Promise<null | string> => {
    if (args.uid === undefined || args.profileid === undefined) {
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
            userid: args.uid
        }
    })
    if (theauth.id === undefined) {
        // auth error
        return null;
    }
    if (addorrm === "add") {
        await db.profilelikes.create({
            auid: theauth.id,
            profileid: args.profileid
        }).catch((err: any) => console.error(err))
        return "Sucess"
    }
    else if (addorrm === "rm") {
        const todelete = await db.profilelikes.findOne({
            where: {
                auid: theauth.id,
                profileid: args.profileid
            }
        }).catch((err: any) => console.error(err))
        await todelete.destory()
        return "Sucess"
    } 

    else {
        await db.profileviews.create({
            auid: theauth.id,
            profileid: args.profileid
        }).catch((err: any) => console.error(err))
        return "Sucess"
    }
}


export const editprofile = async (args: IProfileInput , ip: string, ) => {
    
    if (args.uid === undefined) {
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
            userid: args.uid
        }
    })
    if (theauth.id === undefined) return null;

    const profile: any = await db.profiles.findOne({
        where: {
            auid: theauth.id      
        }
    })
    if (profile === undefined) return null;
    if (args.bio !== undefined) {
        profile.update({
            bio: args.bio
        })
    }
    if (args.rname !== undefined) {
        profile.update({
            rname: args.rname
        })
    }
    if (args.font  !== undefined) {
        profile.update({
            font: args.font
        })
    }
    if (args.username !== undefined) {
        profile.update({
            username: args.username
        })
    }
    if (args.bg !== undefined) {
        profile.update({
            bg: args.bg
        })
    }
    if (args.propic !== undefined) {
        profile.update({
            propic: args.propic
        })
    }
    if (args.cmntstickers !== undefined) {
        profile.update({
            cmntstickers: args.cmntstickers
        })
    }
    if (args.stickers !== undefined) {
        profile.update({
            stickers: args.stickers
        })
    }
    if (args.border !== undefined) {
        profile.update({
            border: args.border
        })
    }
    if (args.location !== undefined) {
        profile.update({
            location: args.location
        })
    }
    if (args.pubbg !== undefined) {
        profile.update({
            pubbg: args.pubbg
        })
    }
    return "Sucess"
}


export const deletepr = async (args: IRmPr, ip: string) => {

    if (args.uid === undefined) {
        const report: Irepoting = {
            ip: ip,
            severity: 0,
            filename: "deletepr",
            values: undefined,
            pid: 0
        }
        MissingError(report)
        return null;
    }
    const theauth: iuserauth = await db.userauth.findOne({
    where: {
            userid: args.uid
        }
    })
    if (theauth === null) return null;
    const theprofile = await db.profiles.findOne({
        where: {
            auid: theauth.id
        }
    })
    await theprofile.destory();
    return "Sucess";
}