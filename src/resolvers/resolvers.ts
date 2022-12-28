import resolveProfiles from "./rprofiles";
import resolveUserAuth from "./ruserauth";
import resolvePosts from "./rposts";
import resolveComments from "./rcomments";
import muserauth from "../mutations/muserauth";
import mprofile from "../mutations/mprofile";
import mpost from "../mutations/mposts";
import mcomments from "../mutations/mcomments";
import { postactions } from "../updators/postactions";
import { practions } from "../updators/practions";

const resolvers = {
    /* Every query resolver must have parent, args, context, info */
    Query: {
        userauth: async (_parent: any, args: {userid: string, email: string, phonenum: string, password: string}, context: any, _info: any) => {
            return await resolveUserAuth(args.userid, args.email, args.phonenum, args.password, context.request.connection.remoteAddress);
        },
        profiles: async (_parent: any, args: {uid: string,username: string, id: number}, _context: any, _info: any) => {
            return await resolveProfiles(args.uid, args.username, args.id);
        },
        posts: async (_parent: any, args: {uid: string, tid: number, pid: number, sndid: number, mid: number}, context: any, _info: any) => {
            return await resolvePosts(args.uid, args.tid, args.pid, args.sndid, args.mid, context.request.req.headers);
        },
        Comments: async (_parent: any, args: {uid: string, postid: number}, context: any, _info: any) => {
            return await resolveComments(args.uid, args.postid, context.request.connection.remoteAddress)
        }, 
    },
    Mutation: {
        cuserauth: async (_parent: any, args: {input:{uid: string,birthday: string, email: string, gender: string, password: string, phonenum: string}}, context: any, _info: any) => {
            return await muserauth(args.input, context.request.connection.remoteAddress)
        },
        cprofile: async (_parent: any, args: {
            input: {uid: string,propic: string, username: string, bg: string, stickers: string, name: string, location: string, font: string, cmntstickers: string, border: string, bio: string, whosees: string, rname: string}}
            , context: any, _info: any) => {
            return await mprofile(args.input, context.request.connection.remoteAddress)
        },
        cpost: async (_parent: any, args: {input:{uid: string, caption: string, medialnk: string, plocation: string, ctid: number, soundid: number, whosees: string }}, context: any, _info: any) => {
            return await mpost(args.input, context.request.connection.remoteAddress)
        },
        ccomment: async (_parent: any, args: {input:{uid: string, comment: string, medialnk:string, post: number}}, context: any, _info: any) => {
            return await mcomments(args.input, context.request.connection.remoteAddress)
        },
        postlike: async (_parent: any, args: {input: {uid: string, postid: number}}, context: any, _info: any) => {
            return await postactions(args.input, context.request.connection.remoteAddress, "add")
        },
        rmpostlike: async (_parent: any, args: {input: {uid: string, postid: number } }, context: any, _info: any) => {
            return await postactions(args.input, context.request.connection.remoteAddress, "rm")
        },
        viewpost: async (_parent: any, args: {input: {uid: string, postid: number } }, context: any, _info: any) => {
            return await postactions(args.input, context.request.connection.remoteAddress, "view")
        },
        prlike: async (_parent: any, args: {input: {uid: string, profileid: number } }, context: any, _info: any) => {
          return await practions(args.input, context.request.connection.remoteAddress, "add")
        },
        rmprlike: async (_parent: any, args: {input: {uid: string, profileid: number } }, context: any, _info: any) => {
            return await practions(args.input, context.request.connection.remoteAddress, "rm");
        },
        viewpr: async (_parent: any, args: {input: {uid: string, profileid: number } }, context: any, _info: any) => {
            return await practions(args.input, context.request.connection.remoteAddress, "view");
        },

    },
}

export default resolvers;