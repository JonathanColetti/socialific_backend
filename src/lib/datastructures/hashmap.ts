import db from "../../database"
import { iuserauth } from "../../resolvers/ruserauth"
import { imediatyperatings, iprofilerating, isoundratings, itagratings } from "../util/interfaces/ratings"

// maps contain (key = tagid etc), (value = score)
interface iratings {
    [userid: string]: irating
    
}
export interface irating {
    // (tagid), (score)...
    tratings?: Map<number, number>
    mtratings?: Map<number, number>
    pratings?: Map<number, number>
    sratings?: Map<number, number>
    // (postid), (score)
    history?: Map<number, number>
}


// inst hashmaps 
export let ratinghashmap: iratings = {};
let htagratings: Map<number, number> = new Map<number, number>();
let hmediatyperatings: Map<number, number> = new Map<number, number>();
let hprofileratings: Map<number, number> = new Map<number, number>();
let hsoundratings: Map<number, number> = new Map<number, number>();
let hhistory: Map<number, number> = new Map<number, number>();
ratinghashmap["uid"] = {
    tratings: htagratings,
    mtratings: hmediatyperatings,
    pratings: hprofileratings,
    sratings: hsoundratings,
    history: hhistory
}

// Rebuild hashmap. Ran when the server is reran 
export const loadhashmap = async () => {
    const allaccounts: Array<iuserauth> = await db.userauth.findAll();
    allaccounts.map(async (theaccount: iuserauth) => {
        await sethashmap(theaccount);
    })
}
/*
    add a account to the rating hashmap
        - check if user exists in database
            - Initalize mt rating hashmaps 
        - get all ratings tied to the account
        - write the data to the lists
        - sort the data lists 
*/
export const sethashmap = async (theaccount: iuserauth) => {
    if (ratinghashmap[theaccount.userid] === undefined) {
        ratinghashmap[theaccount.userid] = {
            pratings: new Map<number, number>(),
            tratings: new Map<number, number>(),
            mtratings: new Map<number, number>(),
            sratings: new Map<number, number>(),
            history: new Map<number, number>()
        }
    }
    
    const tagrating: Array<itagratings> = await db.tagratings.findAll({
        where: {auid: theaccount.id},
    })
    const profilerating: Array<iprofilerating> = await db.userratings.findAll({
        where: {auid: theaccount.id},
    })
    const soundrating: Array<isoundratings> = await db.soundratings.findAll({
        where: {auid: theaccount.id},
    })

    const mediatyperating: Array<imediatyperatings> = await db.mediatyperatings.findAll({
        where: {auid: theaccount.id},
    })
    const history: Array<any> = await db.history.findAll({
        where: {auid: theaccount.id}
    })
    // write the lists to 
    tagrating.map((thetag: itagratings) => {
        ratinghashmap[theaccount.userid] = {
            tratings: ratinghashmap[theaccount.userid].tratings?.set(thetag.id, thetag.score)
        }
    })
    if (ratinghashmap[theaccount.userid].tratings !== undefined) {
        ratinghashmap[theaccount.userid] = { 
            tratings: new Map([...ratinghashmap[theaccount.userid].tratings!.entries()].sort((a, b) => b[1] - a[1]))
        }
    }
    
    profilerating.map((theprofile: iprofilerating) => {
        ratinghashmap[theaccount.userid] = {
            pratings: ratinghashmap[theaccount.userid].pratings?.set(theprofile.id, theprofile.score)
        }
    })
    if (ratinghashmap[theaccount.userid].pratings !== undefined) {
        ratinghashmap[theaccount.userid] = {
            pratings: new Map([...ratinghashmap[theaccount.userid].pratings!.entries()].sort((a, b) => b[1] - a[1]))
        }
    }
    
    soundrating.map((thesound: isoundratings ) => {
        ratinghashmap[theaccount.userid] = {
            sratings: ratinghashmap[theaccount.userid].sratings?.set(thesound.id, thesound.score)
        }
    })
    if (ratinghashmap[theaccount.userid].sratings !== undefined) {
        ratinghashmap[theaccount.userid] = {
            sratings: new Map([...ratinghashmap[theaccount.userid].sratings!.entries()].sort((a, b) => b[1] - a[1]))
        }
    }
    
    mediatyperating.map((mediatype: imediatyperatings) => {
        ratinghashmap[theaccount.userid] = {
            mtratings: ratinghashmap[theaccount.userid].mtratings?.set(mediatype.id, mediatype.score)
        }
    })
    if (ratinghashmap[theaccount.userid].mtratings !== undefined) {
        ratinghashmap[theaccount.userid] = {
            mtratings: new Map([...ratinghashmap[theaccount.userid].mtratings!.entries()].sort((a, b) => b[1] - a[1]))
        }
    }
    history.map((hvid: any) => {
        ratinghashmap[theaccount.userid] = {
            history: ratinghashmap[theaccount.userid].history?.set(hvid.id, hvid.score)
        }
    })
    if (ratinghashmap[theaccount.userid].history !== undefined) {
        ratinghashmap[theaccount.userid] = {
            history: new Map([...ratinghashmap[theaccount.userid].history!.entries()].sort((a, b) => b[1] - a[1]))
        }
    }
    
}