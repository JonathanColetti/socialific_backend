import db from "../database";
import { ICommentsInput } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import { iuserauth } from "../lib/util/interfaces/tables";
import { MissingError } from "../reporting/rdb";



/*
Make a comment
    a. check validity of args / report
    b. catch error 
TODO
    - 2fa 
    -  
*/
export default async function mcomments(args: ICommentsInput, ip: string) {

    if (args.uid === undefined || args.comment === undefined || args.post === undefined) {
            const report: Irepoting = {
                severity: 0,
                pid: 0,
                ip: ip,
                filename: 'mcomments',
                values: args
            }
            MissingError(report)
            return {
                state: "Missing values",
                comments: null
            }
    }
    const theuser: iuserauth = await db.userauth.findOne({
        where: {
            userid: args.uid
        }
    })
    if (theuser.id === undefined) {}
    const createdcomment: any = db.comments.create({
        postid: args.post,
        auid: theuser.id,
        comment: args.comment,
        commentlnk: args.medialnk

    }).catch((err: any) => {})
    return {
        state: "Sucess",
        comment: createdcomment

    }



}