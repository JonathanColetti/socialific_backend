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
export default async function mmediatype(args: IMediatype, ip: string): Promise<null | any> {
    if (args.uid === undefined || args.name === undefined) {
        const report: Irepoting  = {
            ip: ip,
            severity: 0,
            filename: "mmediatype",
            values: args,
            pid: 0
        }
        MissingError(report)
        return null;      
    }
    // check if name exists
    const doesexist = await db.mediatype.findOne({
        where: {
            category: args.name
        }
    }).catch((err: any) => console.error(err, "HH"))
    if (doesexist !== null && doesexist.category !== undefined) return doesexist
    const mediatype: IMediatype = await db.mediatype.create({
        category: args.name
    }).catch((err: any) => {console.log(err, "hello")})
    return mediatype
}