import db from "../database";
import { ICommentsInput } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import { MissingError } from "../reporting/rdb";
import { iuserauth } from "../resolvers/ruserauth";



/*
Make a comment
    a. check validity of args / report
    b. catch error 
TODO
    - 2fa 
    -  
*/
export default async function mcomments(_arguments: ICommentsInput, ip: string) {

    if (_arguments.uid === undefined || _arguments.comment === undefined || _arguments.post === undefined) {
            const report: Irepoting = {
                severity: 0,
                pid: 0,
                ip: ip,
                filename: 'mcomments',
                values: _arguments
            }
            MissingError(report)
            return {
                state: "Missing values",
                comments: null
            }
    }
    const theuser: iuserauth = await db.userauth.findOne({
        where: {
            userid: _arguments.uid
        }
    })
    if (theuser.id === undefined) {}
    const createdcomment: any = db.comments.create({
        postid: _arguments.post,
        auid: theuser.id,
        comment: _arguments.comment,
        commentlnk: _arguments.medialnk

    }).catch((err: any) => {})
    return {
        state: "Sucess",
        comment: createdcomment

    }



}