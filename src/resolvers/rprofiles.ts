import db from "../database";
import fuzzymatch from "../lib/util/algorithms/fuzzymatch";
import { IRprofiles } from "../lib/util/interfaces/inputs";
import { iprofiles } from "../lib/util/interfaces/tables";


// find profiles based on variables
//  a. check if id or username is set and get profiles based on that
//  b. default is most popular creators / creators they would like 
export default async function resolveProfiles(args: IRprofiles, ip: string): Promise<Array<iprofiles> | null> {
    /* 
    TODO
        - Improve fuzzysearch alg
        - Get profiles they would like if username is or id is mt (based on score)
        - Improve file speed
    */
    
    // Get all profiles in a object
    const allprofiles: Array<iprofiles> = await db.profiles.findAll()
    let retval: Array<iprofiles> = []
    // filter out people trying to find everyone i.e mass queries
    if (args.username === undefined && args.id === undefined) return null

    // find user by their unique id before checking username
    else if (args.id !== undefined) {
        allprofiles.map((pro: iprofiles, index: number) => {
            if (pro.id == args.id) retval.push(allprofiles[index])
        })
    } 

    // get 5 of the most relevant users 
    else if (args.username !== undefined) {
        allprofiles.map((pro: iprofiles, index: number) => {            
            if (fuzzymatch(pro.username, args.username)) {
                retval.push(allprofiles[index]) 
            }
            else if (pro.username == args.username) {
                retval[0] = allprofiles[index];
            }  
        })
    }
    return retval;    
}