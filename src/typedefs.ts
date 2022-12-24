
const typeDefs = `
    type Query {
        profiles(username: String, id: ID): [Profile]
        userauth(userid: String, phonenum: String, email: String, userpass: String): Userauth
        posts(uid: String): [Posts]
        Comments(uid: String, postid: Int): [Comments]
    }
    type Mutation {
        cuserauth(input: UserAuthInput): UserauthWErr
        cprofile(input: ProfileInput): ProfileWErr
        cpost(input: PostsInput): PostsWErr
        ccomment(input: CommentInput): CommentsWErr
    }
    input UserAuthInput {
        phonenum: String
        gender: String
        email: String
        password: String
        birthday: String
    }
    input PostsInput {
        uid: String
        ctid: Int
        medialnk: String
        caption: String
        plocation: String
    }
    input ProfileInput {
        username: String
        rname: String
        propic: String
        bg: String
        stickers: String
        cmntstickers: String
        border: String
        uid: String
        name: String
        font: String
        location: String
        bio: String
    }
    input CommentInput {
        uid: String
        postid: Int
        comment: String
        commentlnk: String
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
        caption: String
        medialnk: String
        plocation: String
        pinned: Int
        time_created: String
        time_updated: String
    }
    type Comments {
        id: ID!
        postid: Int
        pid: Int
        comment: String
        commentlnk: String
        time_created: String
        time_updated: String  
    }
    type Tagratings {
        id: ID!
        auid: Int
        tagid: Int
        score: Int
        time_created: String
        time_updated: String
    }
    type Userratings {
        id: ID!
        auid: Int
        pid: Int
        score: Int
        time_created: String
        time_updated: String
    }
    type Soundratings {
        id: ID!
        auid: Int
        sndid: Int
        score: Int
        time_created: String
        time_updated: String
    }
    type Mediatyperatings {
        id: ID!
        auid: Int
        ctid: Int
        score: Int
        time_created: String
        time_updated: String
    }
    type UserauthWErr {
        state: String!
        userauth: Userauth
    }
    type ProfileWErr {
        state: String!
        profile: Profile
    }
    type PostsWErr {
        state: String!
        post: Posts
    }
    type CommentsWErr {
        state: String!
        comment: Comments
    }

    
`

export default typeDefs;