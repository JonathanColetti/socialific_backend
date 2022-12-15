import db, { sequelize } from "../database";
import {iuserauth} from "./ruserauth";
import { ratinghashmap } from "../lib/datastructures/hashmap";
import verifyip from "../lib/util/verification/checkip";
interface iposts {
    id: number,
    ctid: number,
    pid: number,
    caption: string,
    medialnk: string,
    plocation: string,
    pinned: number

}

// TODO
//  - Write interfaces for ratings
//  - Resolve posts using an algorithm to find best posts based on users
// find the best posts by given a certain variable.
//  Check if user is looking for somethings specific
// if so return based on that
// else 
// find generally the best content for home page  
// @param uid the user looking for the data
// @param content-id if the user is looking for certain content
// @param tag-id if user looking for tag content
// @param profile-id if the user looking for profile content
// @param sound-id if the user is looking through sounds
// @param ipaddr users ip to verify stuff
export default async function resolvePosts(uid: string, tid: number, pid: number, sndid: number, mid: number, ipaddr: string) {
    // Return 6 x 6 posts based on the user
    if (uid === undefined) return null;
    // check hashmap for user if doesnt exist return null
    if (ratinghashmap[uid] === undefined) return null;
    // fetch contenttyperratings, tagratings, userrating based on uid
    let posts: Array<iposts> = [];

    // Get ID based on given uid
    const theaccount: iuserauth = await db.userauth.findOne({
        where: {
            userid: uid
        }
    });
    if (!verifyip(ipaddr, theaccount)) return null;
    if (tid !== undefined) {
        // find best posts for user based on certain tid (unseen)
        return null;
    }
    else if (pid !== undefined) {
        // find top rated posts by user (unseen) 
        return null;
    }
    else if (sndid !== undefined) {
        // find top rated posts based on sound (unseen)
        return null;
    }
    else if (mid !== undefined) {
        // find top rate posts based on mediatype (unseen)
        return null;
    }
    // find 6 posts 
    /* 

        Order of returning data 6 * 6 (6 rows 6 peices of media)
            - Highlights with or without favourite media type
            - Favourite profile or most popular profile w media type
            - Favourite tag or most popular tag
            - 
            - 
    */
    
    
    
}




