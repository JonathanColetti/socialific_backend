import db, { sequelize } from "../database";
import { ratinghashmap } from "../lib/datastructures/hashmap";
import verifyip from "../lib/util/verification/checkip";
import { RankingPosts } from "../lib/util/algorithms/rankingposts";
import { iuserauth } from "../lib/util/interfaces/tables";
import { IRposts } from "../lib/util/interfaces/inputs";


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
export default async function resolvePosts(args: IRposts, ipaddr: string) {
    // Return 6 x 6 posts based on the user
    if (args.uid === undefined) {
        // report 
        return null;
    };
    // check hashmap for user if doesnt exist return null as it is impossible to not be in the hashmap 
    if (ratinghashmap[args.uid] === undefined) {
        // report to system
        return null;
    };
    
    // fetch contenttyperratings, tagratings, userrating based on uid

    // Get ID based on given uid
    const theaccount: iuserauth = await db.userauth.findOne({
        where: {
            userid: args.uid
        }
    });
    if (!verifyip(ipaddr, theaccount)) return null;    
    // const rateposts = new RankingPosts()
    if (args.tid !== undefined) {
        // find best posts for user based on certain tid (unseen)
        // two posibilities / no history or history
        
        
        return null;
    }
    else if (args.pid !== undefined) {
        // find top rated posts by user (unseen) 
        
        return null;
    }
    else if (args.sndid !== undefined) {
        
        // find top rated posts based on sound (unseen)
        return null;
    }
    else if (args.mid !== undefined) {
    // find top rate posts based on mediatype (unseen)
        
        return null;
    }
    /*  Scoring system
            Ea = 1/1+10(Ra - Rb)/ 400
            - comment           -> 100
            - liked             -> 80
            - watched full      -> 50
            
            - disliked video    -> -80
    */
    /* 

        Order of returning data 6 * 6 (6 rows 6 peices of media)
            - Highlights with or without favourite media type
            - Favourite profile or most popular profile w media type
            - Favourite tag or most popular tag
            - 
            - 
    */
    
    
    
}




