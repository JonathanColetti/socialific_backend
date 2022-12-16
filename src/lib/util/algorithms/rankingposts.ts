// we have to find the probability that if they like one post they will like another
// factors that will affect what post they will like
//  - History  (a)
//  - Friends  (b)
//  - Location (c)
//  - Age      (d)

import { irating } from "../../datastructures/hashmap";


export class RankingPosts {
    country: string = "";
    city: string = "";
    constructor(location: string[], ratings: irating) {
        this.country = location[0];
        this.city = location[1];
    }
}