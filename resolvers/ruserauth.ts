import db from "../database"
import verify from "../lib/verification";

export interface iuserauth {
    id: number,
    userid: string,
    phonenum: string,
    gender: string,
    email: string,
    userpass: string,
    ipaddr: string,
    coins: number,
    lastlgn: any,
    birthday: any,
    time_created: any,
    time_updated: any,
}


export default async function resolveUserAuth(uid: string, email: string, password: string, phonenum: string, ipaddr: string) {

    /* 
    TODO
        - Parse through JSON ip addr 
    Get top level authentication i.e verify user
        a. find user data based on given uid i.e validation
        b. Login i.e trade email or phonenum for uid
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
    } if (retuserauth !== null && retuserauth.ipaddr !== ipaddr) {
        // verify user through SMS or email. This is handled in the front end thus throw custom error
        const message: string = "";
        const phone: string | null = null;
        const email: string | null = null;
        verify(message, phone, email);
        return null;
    }

    return retuserauth;

}
