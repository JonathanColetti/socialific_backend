import db from "../database"
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
export default async function resolveUserAuth(uid: string, email: string, password: string, phonenum: string, ipaddr: string) {


    var retuserauth: iuserauth | null = null;

    if (uid !== undefined) {
        retuserauth = await db.userauth.findOne({
            where: {
                userid: uid
        }});

    } else if (email !== undefined && password !== undefined) {
        // Get profile based on email and password
        retuserauth = await db.userauth.findOne({
            where: {
                email: email,
                password: password
        }});
    } else if (phonenum !== undefined && password !== undefined) {
        // Get profile based on phone number and password
        retuserauth = await db.userauth.findOne({
            where: {
                phonenum: phonenum,
                password: password
        }});
    } 
    if (retuserauth === null) return null;
    if (!verifyip(ipaddr, retuserauth)) {
        // 2fa here
    } 
     
    return retuserauth;

}
