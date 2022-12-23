import resolveProfiles from "./rprofiles";
import resolveUserAuth from "./ruserauth";
import resolvePosts from "./rposts";
import resolveComments from "./rcomments";
import muserauth from "../mutations/muserauth";
import mprofile from "../mutations/mprofile";
import mpost from "../mutations/mposts";
import mcomments from "../mutations/mcomments";

const resolvers = {
    /* Every query resolver must have parent, args, context, info */
    Query: {
        userauth: async (_parent: any, args: {userid: string, email: string, phonenum: string, password: string}, context: any, _info: any) => {
            return await resolveUserAuth(args.userid, args.email, args.phonenum, args.password, context.request.req.clientIp);
        },
        profiles: async (_parent: any, args: {uid: string,username: string, id: number}, _context: any, _info: any) => {
            return await resolveProfiles(args.uid, args.username, args.id);
        },
        posts: async (_parent: any, args: {uid: string, tid: number, pid: number, sndid: number, mid: number}, context: any, _info: any) => {
            return await resolvePosts(args.uid, args.tid, args.pid, args.sndid, args.mid, context.request.req.headers);
        },
        Comments: async (_parent: any, args: {uid: string, postid: number}, context: any, _info: any) => {
            return await resolveComments(args.uid, args.postid, context.request.req.clientIp)
        }, 
    },
    Mutation: {
        cuserauth: async (_parent: any, args: {input:{uid: string,birthday: string, email: string, gender: string, password: string, phonenum: string}}, context: any, _info: any) => {
            return await muserauth(args.input, context.request.req.clientIp)
        },
        cprofile: async (_parent: any, args: {
            input: {uid: string,propic: string, username: string, bg: string, stickers: string, name: string, location: string, font: string, cmntstickers: string, border: string, bio: string}}
            , context: any, _info: any) => {
            return await mprofile(args.input, context.request.req.clientIp)
        },
        cpost: async (_parent: any, args: {input:{uid: string, caption: string, medialnk: string, plocation: string, ctid: number, soundid: number, pid: number }}, context: any, _info: any) => {
            return await mpost(args.input, context.request.req.clientIp)
        },
        ccomment: async (_parent: any, args: {input:{uid: string, comment: string, medialnk:string}}, context: any, _info: any) => {
            return await mcomments(args.input, context.request.req.clientIp)
        },
    },
}

export default resolvers;