
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
        cmediatype(input: MediatypeInput): String
        postlike(input: PostActionInput): String
        rmpostlike(input: PostActionInput): String
        viewpost(input: PostActionInput): String
        prlike(input: PrActionInput): String
        rmprlike(input: PrActionInput): String
        viewpr(input: PrActionInput): String
        editprofile(input: ProfileInput): String
        editua(input: UActionInput): String
        rmprofile(input: RmPrInput): String
        rmuserauth(input: RmUaInput): String
        rmpost(input: RmPostInput): String
        addemoiji(input: EmojiInput): String
    }
    input EmojiInput {
        uid: String
        commentid: Int
        emoji: String
    }
    input RmPrInput {
        uid: String
    }
    input RmUaInput {
        uid: String
        password: String
    }
    input RmPostInput {
        uid: String
        postid: Int
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
        whosees: String
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
        whosees: String
        border: String
        uid: String
        name: String
        font: String
        location: String
        bio: String
        pubbg: String
    }
    input CommentInput {
        uid: String
        postid: Int
        comment: String
        commentlnk: String
    }
    input MediatypeInput {
        comment: String 
    }
    input PostActionInput {
        uid: String
        postid: Int
    }
    input PrActionInput {
        uid: String
        profileid: Int
    }
    input UActionInput {
        uid: String
        phonenum: String
        email: String
        userpass: String
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
        whosees: String
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
        whosees: String
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