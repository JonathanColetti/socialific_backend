import db from "../database"
import { Irepoting } from "../lib/util/interfaces/reports";
import { MissingError } from "../reporting/rdb";

export const postactions: any = async (_arguments: { uid: string, postid: number }, ip: string, addorrm: string): Promise<null | string> => {
    if (_arguments.uid === undefined && _arguments.postid === undefined ) {
        const report: Irepoting = {
            ip: ip,
            severity: 0,
            filename: "likes.ts",
            values: _arguments,
            pid: 0
        }
        await MissingError(report)
        return null;
    }
    const theauth = await db.userauth.findOne({
        where: {
            userid: _arguments.uid
        }
    })
    if (theauth.id === undefined) return null;
    if (addorrm === "add") {
        console.log("Ran")
        const likedpost = await db.postlikes.create({
            auid: theauth.id,
            postid: _arguments.postid
        }).catch((err: any) => {console.error(err)} )
        return "Sucess"
    } 
    else if (addorrm === "rm") {
        const todelete = await db.postlikes.findOne({
            where: {
                auid: theauth.id,
                postid: _arguments.postid
            }
        }).catch((err: any) => {console.log(err)})
        // console.log(todelete.destory())
        await todelete.destroy();
        return "Sucess"
    } 
    else {
        await db.postviews.create({
            auid: theauth.id,
            postid: _arguments.postid,
        }).catch((err: any) => console.error(err))
        return "Sucess";
    }
}