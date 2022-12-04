import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

const typeDefs: DocumentNode = gql`
    type Query {
        profiles(username: String, id: ID): [Profile]
        userauth(userid: String, phonenum: String, email: String, userpass: String): Userauth
        posts(uid: String): [Posts]
    }
    type Userauth {
        id: ID!
        userid: String
        phonenum: String
        gender: String
        email: String
        userpass: String
        idaddr: String
        coins: String
        lastlgn: String
        birthday: String
        time_created: String
        time_updated: String
    }
    type Profile {
        id: ID!
        username: String
        propic: String
        bg: String
        pubbg: String
        stickers: String
        border: String
        font: String
        rname: String
        bio: String
        views: Int
        sviews: Boolean
        slikes: Boolean
        time_created: String
        time_updated: String
    }
    type Posts {
        id: ID!
        ctid: Int
        pid: Int
        caption: String
        medialnk: String
        plocation: String
        pinned: Int
        time_created: String
        time_updated: String
    }
    
`

export default typeDefs;