import resolveProfiles from "./rprofiles";
import resolveUserAuth from "./ruserauth";
import resolvePosts from "./rposts";

const resolvers = {
    /* Every query resolver must have parent, args, context, info */
    Query: {
        userauth: async (parent: any, args: {userid: string, email: string, phonenum: string, password: string}, context: any, info: any) => {
            return await resolveUserAuth(args.userid, args.email, args.phonenum, args.password, context.request.req.clientIp);
        },
        profiles: async (parent: any, args: {username: string, id: number}, context: any, info: any) => {
            return await resolveProfiles(args.username, args.id);
        },
        posts: async (parent: any, args: {uid: string}, context: any, info: any) => {
            return await resolvePosts(args.uid, context.request.req.headers);
        } 
        
    },
}

export default resolvers;