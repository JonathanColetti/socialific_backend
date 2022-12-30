import db, { sequelize } from "../database";
import { IPostsInput } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import checkvalid from "../lib/util/verification/checkvalid";
import { MissingError } from "../reporting/rdb";
import mmediatype from "./mmediatype";
import keyword_extractor from "keyword-extractor";
import { iposts, iuserauth } from "../lib/util/interfaces/tables";


/*
Make a post on server
    a. check validity of args / report
    b. create the post
    c. if post is for everyone extract keyword from title else dont
    d. if post is everyone add relationships
TODO 
    a. tfa
    b. check ip
    c. make relation ships 
*/
export default async function mpost(args: IPostsInput, ip: string): Promise<any> {
    if ( args.uid === undefined || args.whosees === undefined || args.caption === undefined ) {
        const report: Irepoting = {
            ip: ip,
            severity: 0,
            filename: "mpost",
            values: args,
            pid: 0
        }
        MissingError(report)
        return {state: "Missing args", post: null}
    }

    const theauth: iuserauth = await db.userauth.findOne({
        where: {
            userid: args.uid
        }
    });
    if (theauth === null) {console.log("AUTH NULL")}
    
    const thepost: iposts = await db.posts.create({
        auid:  theauth.id,
        soundid: args.soundid,
        ctid: args.ctid,
        caption: args.caption,
        plocation: args.plocation,
        medialnk: args.medialnk,
        whosees: args.whosees
    }).catch((err: any) => {
        return {state: err.message, post: null}
    })
    if (args.whosees !== "all") {
        return {state: "sucess", post: thepost}        
    }
    const keywords: string[] = keyword_extractor.extract(args.caption, {
        language: "english",
        remove_digits: false,
        return_chained_words: false,
        remove_duplicates: true,
        return_changed_case: true,
    })
    // try to make new media types
    // add mediatype and postid to relationdb
    keywords.forEach(async element => {
        const mtid = await mmediatype({uid: args.uid, name: element}, ip).catch((err: any) => {console.error(err, "Hello")});
        if (mtid !== null) {
            await db.postmediatype.create({
                postid: thepost.id,
                mediat: mtid.id
            }).catch((err: any) => {console.error(err, "LOL")})
        }
    });
    
    return {
        state: "Sucess",
        post: thepost
    }
}