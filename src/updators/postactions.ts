import db from "../database"
import { IPostactions } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import { MissingError } from "../reporting/rdb";

export const postactions = async (args: IPostactions, ip: string, addorrm: string): Promise<null | string> => {
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


export const editpost = (args: any, ip: string) => {

}