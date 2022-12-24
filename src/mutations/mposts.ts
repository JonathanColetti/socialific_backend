import db from "../database";
import { IPostsInput } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import checkvalid from "../lib/util/verification/checkvalid";
import { MissingError } from "../reporting/rdb";
import { iuserauth } from "../resolvers/ruserauth";


export default async function mpost(_arguments: IPostsInput, ip: string) {
    if ((!checkvalid(_arguments.uid)) && (!checkvalid(_arguments.caption) || !checkvalid(_arguments.medialnk)) ) {
        const report: Irepoting = {
            ip: ip,
            severity: 0,
            filename: "mpost",
            values: _arguments,
            pid: 0
        }
        MissingError(report)
        return {state: "Missing args", post: null}
    }

    const theauth: iuserauth = await db.userauth.findOne({
        where: {
            userid: _arguments.uid
        }
    });
    // if (theauth === null) {console.log("AUTH NULL")}
    console.log(_arguments.ctid)
    const thepost = db.posts.create({
        auid:  theauth.id,
        ctid: _arguments.ctid,
        soundid: _arguments.soundid,
        caption: _arguments.caption,
        plocation: _arguments.plocation,
        medialnk: _arguments.medialnk,
    }).catch((err: any) => {
        console.log(err)
        return {state: err.message, post: null}
    })
    return {
        state: "Sucess",
        post: thepost
    }
}