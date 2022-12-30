import db from "../database"
import { IAddEmoji, IEditpost, IPostactions, IRmPost } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import { iuserauth } from "../lib/util/interfaces/tables";
import { MissingError } from "../reporting/rdb";

export const postactions = async (args: IPostactions, ip: string, addorrm: string): Promise<null | "Sucess"> => {
    if (args.uid === undefined && args.postid === undefined ) {
        const report: Irepoting = {
            ip: ip,
            severity: 0,
            filename: "likes.ts",
            values: args,
            pid: 0
        }
        await MissingError(report)
        return null;
    }
    const theauth = await db.userauth.findOne({
        where: {
            userid: args.uid
        }
    })
    if (theauth.id === undefined) return null;
    if (addorrm === "add") {
        const likedpost = await db.postlikes.create({
            auid: theauth.id,
            postid: args.postid
        }).catch((err: any) => {console.error(err)} )
        return "Sucess"
    } 
    else if (addorrm === "rm") {
        const todelete = await db.postlikes.findOne({
            where: {
                auid: theauth.id,
                postid: args.postid
            }
        }).catch((err: any) => {console.log(err, "Helll;o")})
        await todelete.destroy();
        return "Sucess"
    } 
    else {
        await db.postviews.create({
            auid: theauth.id,
            postid: args.postid,
        }).catch((err: any) => console.error(err, "TEST"))
        return "Sucess";
    }
}


export const editpost = async (args: IEditpost, ip: string): Promise<null | "Sucess"> => {
    if (args.uid === undefined) {
        const report: Irepoting = {
            ip: ip,
            severity: 0,
            filename: "editpost",
            values: undefined,
            pid: 0
        }
        MissingError(report)
        return null;
    }
    // add foreign key of auid to userauth
    const theauth: iuserauth = await db.userauth.findOne({
        where: {
            userid: args.uid
        }
    })
    const thepost = await db.posts.findOne({
        where: {}
    })
    if (args.caption !== undefined) {
        await thepost.update({
            caption: args.caption
        })
    }
    if (args.pinned !== undefined) {
        await thepost.update({
            pinned: args.pinned
        })
    }
    if (args.soundid !== undefined) {
        await thepost.update({
            soundid: args.soundid
        })
    }
    return "Sucess";
}


export const removepost = async (args: IRmPost , ip: string): Promise<null | "Sucess"> => {
    if (args.uid === undefined || args.postid === undefined) {
        const report: Irepoting = {
            ip: ip,
            severity: 0,
            filename: "removePost",
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
    if ( theauth.id === null ) return null
    const thepost = await db.posts.findOne({
        where: {
            auid: theauth.id
        }
    })
    await thepost.destory()
    return "Sucess"

}


export const addEmoji = async (args: IAddEmoji, ip: string): Promise<null | 'Sucess'> => {
    if (args.uid === undefined || args.commentid === undefined) {
        const report: Irepoting = {
            ip: ip,
            severity: 0,
            filename: "addEmoji",
            values: args,
            pid: 0
        }
        MissingError(report);
        return null;
    }
    const theauth = await db.userauth.findOne({
        where: { userid: args.uid }
    })
    if (theauth === null) return null;
    await db.postcommentemoji.create({
        commentid: args.commentid,
        auid: theauth.id
    }).catch((err: any) => {
        console.error(err);
    })
    return "Sucess";


}