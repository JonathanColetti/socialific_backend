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


export default async function resolvePosts(uid: string, ipaddr: string) {
    // Return 6 x 6 posts based on the user
    if (uid === undefined) return null;

    // fetch contenttyperratings, tagratings, userrating based on uid
    let posts: Array<any> = [];

    // Get ID based on given uid
    const theaccount: iuserauth = db.userauth.findOne({where: {
        userid: uid
    }})
    const tagrating: any = db.tagratings.findAll({
        where: {uaid: theaccount.id},
        order: sequelize.literal('score')
    })
    const profilerating: any = db.userratings.findAll({
        where: {uaid: theaccount.id},
        order: sequelize.literal('score')
    })
    const soundrating: any = db.soundratings.findAll({
        where: {uaid: theaccount.id},
        order: sequelize.literal('score')
    })
    const mediatyperating: any = db.mediatyperating.findAll({
        where: {uaid: theaccount.id},
        order: sequelize.literal('score')
    })
    console.log(mediatyperating[0].score)
    return null; 
    /* 
        
        Order of returning data 
            - Highlights with or without favourite media type
            - Favourite profile or most popular profile w media type
            - Favourite tag or most popular tag
            - 
            - 
    */
    
    
    
}




