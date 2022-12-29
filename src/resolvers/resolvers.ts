import resolveProfiles from "./rprofiles";
import resolveUserAuth from "./ruserauth";
import resolvePosts from "./rposts";
import resolveComments from "./rcomments";
import muserauth from "../mutations/muserauth";
import mprofile from "../mutations/mprofile";
import mpost from "../mutations/mposts";
import mcomments from "../mutations/mcomments";
import { postactions } from "../updators/postactions";
import { editprofile, practions } from "../updators/practions";
import { ICommentsInput, IPostactions, IPostsInput, IProfileactions, IProfileInput, IRcomments, IRposts, IRprofiles, IRuserauth, IUauthInput } from "../lib/util/interfaces/inputs";
import { iuserauth } from "../lib/util/interfaces/tables";
import { UActionInput, userauthedit } from "../updators/uaactions";

const resolvers = {
    /* Every query resolver must have parent, args, context, info */
    Query: {
        userauth: async (_parent: any, args: IRuserauth,context: any, _info: any) => {
            return await resolveUserAuth(args, context.request.connection.remoteAddress);
        },
        profiles: async (_parent: any, args: IRprofiles, context: any, _info: any) => {
            return await resolveProfiles(args, context.request.connection.remoteAddress);
        },
        posts: async (_parent: any, args: IRposts, context: any, _info: any) => {
            return await resolvePosts(args, context.request.req.headers);
        },
        Comments: async (_parent: any, args: IRcomments, context: any, _info: any) => {
            return await resolveComments(args, context.request.connection.remoteAddress)
        }, 
    },
    Mutation: {
        cuserauth: async (_parent: any, args: {input: IUauthInput}, context: any, _info: any) => {
            return await muserauth(args.input, context.request.connection.remoteAddress)
        },
        cprofile: async (_parent: any, args: {input:  IProfileInput}, context: any, _info: any) => {
            return await mprofile(args.input, context.request.connection.remoteAddress)
        },
        cpost: async (_parent: any, args: {input:  IPostsInput}, context: any, _info: any) => {
            return await mpost(args.input, context.request.connection.remoteAddress)
        },
        ccomment: async (_parent: any, args: {input:  ICommentsInput} , context: any, _info: any) => {
            return await mcomments(args.input, context.request.connection.remoteAddress)
        },
        postlike: async (_parent: any, args: {input:  IPostactions}, context: any, _info: any) => {
            return await postactions(args.input, context.request.connection.remoteAddress, "add")
        },
        rmpostlike: async (_parent: any, args: {input:  IPostactions}, context: any, _info: any) => {
            return await postactions(args.input, context.request.connection.remoteAddress, "rm")
        },
        viewpost: async (_parent: any, args: {input:  IPostactions}, context: any, _info: any) => {
            return await postactions(args.input, context.request.connection.remoteAddress, "view")
        },
        prlike: async (_parent: any, args: {input: IProfileactions}, context: any, _info: any) => {
          return await practions(args.input, context.request.connection.remoteAddress, "add")
        },
        rmprlike: async (_parent: any, args: {input: IProfileactions}, context: any, _info: any) => {
            return await practions(args.input, context.request.connection.remoteAddress, "rm");
        },
        viewpr: async (_parent: any, args: {input: IProfileactions}, context: any, _info: any) => {
            return await practions(args.input, context.request.connection.remoteAddress, "view");
        },

        editprofile: async (_parent: any, args: {input:  IProfileInput}, context: any, _info: any) => {
            return await editprofile(args.input, context.request.connection.remoteAddress)
        },
        editua: async (_parent: any, args: {input: UActionInput}, context: any, _info: any) => {
            return await userauthedit(args.input, context.request.connection.remoteAddress)
        }
    },
}

export default resolvers;