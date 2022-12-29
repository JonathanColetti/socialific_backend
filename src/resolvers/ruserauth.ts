import db from "../database"
import { IRuserauth } from "../lib/util/interfaces/inputs";
import { iuserauth } from "../lib/util/interfaces/tables";
import verifyip from "../lib/util/verification/checkip"

/* 
    TODO
    - Add two factor auth
    Get top level authentication
        a. find user data based on given uid i.e validation
        b. check if ip matches and no sus behaviour
        c. Login i.e trade email or phonenum for uid
*/
export default async function resolveUserAuth(args: IRuserauth, ipaddr: string): Promise<iuserauth | null> {


    var retuserauth: iuserauth | null = null;

    if (args.uid !== undefined) {
        retuserauth = await db.userauth.findOne({
            where: {
                userid: args.uid
        }});

    } else if (args.email !== undefined && args.password !== undefined) {
        // Get profile based on email and password
        retuserauth = await db.userauth.findOne({
            where: {
                email: args.email,
                password: args.password
        }});
    } else if (args.phonenum !== undefined && args.password !== undefined) {
        // Get profile based on phone number and password
        retuserauth = await db.userauth.findOne({
            where: {
                phonenum: args.phonenum,
                password: args.password
        }});
    } 
    if (retuserauth === null) return null;
    if (!verifyip(ipaddr, retuserauth)) {
        // 2fa here
    } 
    return retuserauth;
}
