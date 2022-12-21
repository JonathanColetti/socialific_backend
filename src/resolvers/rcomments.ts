import db, { sequelize } from "../database";
import verifyip from "../lib/util/verification/checkip";
import { iuserauth } from "./ruserauth";

interface icomments {
    id: number,
    postid: number,
    pid: number,
    comment: string,
    commentlnk: string,
    time_created: string,
    time_updated: string,
}
/* Resolve comments in a post
    @param uid string   for scoring and abuse purposes
    @param ip  string   for abuse purposes
    @param postid number   which post to resolve comments
*/
export default async function resolveComments(uid: string,  postid: number, ipaddr: string,) {
    if (uid === undefined) return null;
    const theaccount: iuserauth = await db.userauth.findOne({
        where: {
            userid: uid
        }
    });
    if (!verifyip(ipaddr, theaccount)) return null;
    // friend / following comments come first, then most popular

    const comments: icomments = await db.comments.findAll({
        where: {
            userid: uid,
            postid: postid
        },
        // order: sequelize.literal('likes DESC'),
        limit: 10,
    })
    return comments;

}