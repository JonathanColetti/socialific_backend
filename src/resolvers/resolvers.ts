import resolveProfiles from "./rprofiles";
import resolveUserAuth from "./ruserauth";
import resolvePosts from "./rposts";
import resolveComments from "./rcomments";

const resolvers = {
    /* Every query resolver must have parent, args, context, info */
    Query: {
        userauth: async (parent: any, args: {userid: string, email: string, phonenum: string, password: string}, context: any, info: any) => {
            return await resolveUserAuth(args.userid, args.email, args.phonenum, args.password, context.request.req.clientIp);
        },
        profiles: async (parent: any, args: {uid: string,username: string, id: number}, context: any, info: any) => {
            return await resolveProfiles(args.uid, args.username, args.id);
        },
        posts: async (parent: any, args: {uid: string, tid: number, pid: number, sndid: number, mid: number}, context: any, info: any) => {
            return await resolvePosts(args.uid, args.tid, args.pid, args.sndid, args.mid, context.request.req.headers);
        },
        Comments: async (parent: any, args: {uid: string, postid: number}, context: any, info: any) => {
            return await resolveComments(args.uid, args.postid, context.request.req.clientIp)
        }, 
    },
    Mutation: {
        cprofile: async (parent: any, args: {uid: string,username: string, id: number}, context: any, info: any) => {
            return null
        }
    }
}

export default resolvers;