import db from "../database";
import fuzzymatch from "../lib/fuzzymatch";

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

export default async function resolveProfiles(username: string, id: number): Promise<any> {
    /* 
    TODO
        - Improve fuzzysearch alg
    ResolveProfiles this function that finds profiles. 
    mainly used in searching or clicking 
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