import db from "../database"
import verifyip from "../lib/util/verification/checkip"

export interface iuserauth {
    id: number,
    userid: string,
    phonenum: string,
    gender: string,
    email: string,
    userpass: string,
    ipaddr: any,
    coins: number,
    lastlgn: any,
    birthday: any,
    time_created: any,
    time_updated: any,
}


export default async function resolveUserAuth(uid: string, email: string, password: string, phonenum: string, ipaddr: string) {

    /* 
    TODO
        - Add two factor auth
    Get top level authentication
        a. find user data based on given uid i.e validation
        b. check if ip matches and no sus behaviour
        c. Login i.e trade email or phonenum for uid
        */
    var retuserauth: iuserauth | null = null;

    if (uid !== undefined) {
        // Get profile based on uid
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
    if (!verifyip(ipaddr, retuserauth!)) return null; 
     

    return retuserauth;

}
