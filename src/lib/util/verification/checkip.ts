import { iuserauth } from "../interfaces/tables";
import { twofactorauth } from "./verification";
import {lookup} from 'geoip-lite';

/* verify ip address to make sure user is LGTM
    @param ipaddr       ip address to verify
    @param retuserauth  account ip is trying to access
    @return boolean     if allowed
*/
export default function verifyip(ipaddr: String, retuserauth: iuserauth): boolean {
    var sameIp: boolean = false;
    var i: number = 0;
    const jsonips: any = JSON.parse(retuserauth!.ipaddr);
    while (jsonips[i] !== undefined) {
        if (jsonips[i] !== ipaddr) i++;
        else {
            sameIp = true;
            break;
        }

    }
    if (!sameIp) {
        // verify user through SMS or email. This is handled in the front end thus throw custom error
        const message: string = "";
        const phone: string | null = null;
        const email: string | null = null;
        twofactorauth(message, phone, email);
    }
    return sameIp;
    
}