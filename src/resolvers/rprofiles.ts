import db from "../database";
import fuzzymatch from "../lib/util/algorithms/fuzzymatch";

interface iprofiles {
    id: number,
    username: string,
    propic: string,
    bg: string,
    pubbg: string,
    stickers: string,
    border: string,
    font: string,
    rname: string,
    bio: string,
    sviews: boolean,
    slikes: number,
    time_created: any,
    time_updated: any,
}
// find profiles based on variables
//  a. check if id or username is set and get profiles based on that
//  b. default is most popular creators / creators they would like 
export default async function resolveProfiles(uid: string, username: string, id: number): Promise<any> {
    /* 
    TODO
        - Improve fuzzysearch alg
        - Get profiles they would like if username is or id is mt (based on score)
    */
    
    // Get all profiles in a object
    const allprofiles: Array<iprofiles> = await db.profiles.findAll()
    let retval: Array<iprofiles> = []
    // filter out people trying to find everyone i.e mass queries
    if (username === undefined && id === undefined) return null

    // find user by their unique id before checking username
    else if (id !== undefined) {
        // O(N)
        allprofiles.map((pro: iprofiles, index: number) => {
            if (pro.id == id) retval.push(allprofiles[index])
        })
    } 

    // get 5 of the most relevant users 
    else if (username !== undefined) {
        // O(N) 
        allprofiles.map((pro: iprofiles, index: number) => {            
            // O(N^2)
            if (fuzzymatch(pro.username, username)) {
                retval.push(allprofiles[index]) 
            }
            else if (pro.username == username) {
                retval[0] = allprofiles[index];
            }  
        })
    }

    return retval;    

}