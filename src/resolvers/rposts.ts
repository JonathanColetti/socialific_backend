import db, { sequelize } from "../database";
import {iuserauth} from "./ruserauth";
 
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

    // fetch contenttyperratings, tagratings, userrating based on uid
    let posts: Array<iposts> = [];

    // Get ID based on given uid
    const theaccount: iuserauth = await db.userauth.findOne({
        where: {
            userid: uid
        }
    })
    const tagrating: any = await db.tagratings.findAll({
        where: {auid: theaccount.id},
        order: sequelize.literal('score')
    })
    const profilerating: any = await db.userratings.findAll({
        where: {auid: theaccount.id},
        order: sequelize.literal('score')
    })
    const soundrating: any = await db.soundratings.findAll({
        where: {auid: theaccount.id},
        order: sequelize.literal('score')
    })

    const mediatyperating: any = await db.mediatyperatings.findAll({
        where: {auid: theaccount.id},
        order: sequelize.literal('score')
    })

    // Testing purposes
    profilerating.forEach((element: any) => {
        console.log(element.auid);
        
    });

    soundrating.forEach((element: any) => {
        console.log(element.auid);
        
    });

    tagrating.forEach((element: any) => {
        console.log(element.auid);
        
    });
    mediatyperating.forEach((element: any) => {
        console.log(element.auid);
        
    });

    return null; 
    /* 

        Order of returning data 6 * 6 (6 rows 6 peices of media)
            - Highlights with or without favourite media type
            - Favourite profile or most popular profile w media type
            - Favourite tag or most popular tag
            - 
            - 
    */
    
    
    
}




