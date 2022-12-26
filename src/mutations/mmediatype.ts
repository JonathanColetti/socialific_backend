import db from "../database";
import { IMediatype } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import { MissingError } from "../reporting/rdb";
/*
Make a media type
    a. check validity of arguments
    b. check if already exists (maybe add it to the relationship)
    c. create media type
*/
export default async function mmediatype(_arguments: IMediatype, ip: string) {
    if (_arguments.uid === undefined || _arguments.name === undefined) {
        const report: Irepoting  = {
            ip: ip,
            severity: 0,
            filename: "mmediatype",
            values: _arguments,
            pid: 0
        }
        MissingError(report)
        return "Missing args"          
    }
    // check if name exists
    const doesexist = await db.mediatype.findAll({
        where: {
            category: _arguments.name
        }
    })
    if (doesexist.category !== null) return doesexist.category
    
    const mediatype = await db.mediatype.create({
        category: _arguments.name
    }).catch((err: any) => {console.log(err)})
    return mediatype


}