import db from "../database";
import { IPostsInput } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import checkvalid from "../lib/util/verification/checkvalid";
import { MissingError } from "../reporting/rdb";
import { iuserauth } from "../resolvers/ruserauth";
import mmediatype from "./mmediatype";
import keyword_extractor from "keyword-extractor";

export default async function mpost(_arguments: IPostsInput, ip: string) {
    if ((!checkvalid(_arguments.uid)) && (!checkvalid(_arguments.caption) || !checkvalid(_arguments.medialnk)) ) {
        const report: Irepoting = {
            ip: ip,
            severity: 0,
            filename: "mpost",
            values: _arguments,
            pid: 0
        }
        MissingError(report)
        return {state: "Missing args", post: null}
    }

    const theauth: iuserauth = await db.userauth.findOne({
        where: {
            userid: _arguments.uid
        }
    });
    if (theauth === null) {console.log("AUTH NULL")}
    

    const thepost = await db.posts.create({
        auid:  theauth.id,
        soundid: _arguments.soundid,
        caption: _arguments.caption,
        plocation: _arguments.plocation,
        medialnk: _arguments.medialnk,
        whosees: _arguments.whosees
    }).catch((err: any) => {
        console.log(err)
        return {state: err.message, post: null}
    })
    if (_arguments.whosees !== "all") {
        
    }
    const keywords: string[] = keyword_extractor.extract(_arguments.caption, {
        language: "english",
        remove_digits: false,
        return_chained_words: false,
        remove_duplicates: true,
        return_changed_case: true,
    })
    // try to make new media types
    // add mediatype and postid to relationdb
    keywords.forEach(async element => {
        await mmediatype({uid: _arguments.uid, name: element}, ip);
        
    });

    return {
        state: "Sucess",
        post: thepost
    }
}