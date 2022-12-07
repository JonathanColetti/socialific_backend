import { DataTypes } from "sequelize";
import _commentlikes from "./commentlikes";
import _comments from "./comments";
import _history from "./history";
import _mediatype from "./mediatype";
import _mediatyperatings from "./mediatyperatings";
import _postlikes from "./postlikes";
import _posts from "./posts";
import _posttags from "./posttags";
import _profilelikes from "./profilelikes";
import _profiles from "./profiles";
import _profileviews from "./profileviews";
import _replies from "./replies";
import _replylikes from "./replylikes";
import _reports from "./reports";
import _soundratings from "./soundratings";
import _sounds from "./sounds";
import _tagratings from "./tagratings";
import _tags from "./tags";
import _userauth from "./userauth";
import _userratings from "./userratings";

export function initModels(sequelize) {
  var commentlikes = _commentlikes(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var history = _history(sequelize, DataTypes);
  var mediatype = _mediatype(sequelize, DataTypes);
  var mediatyperatings = _mediatyperatings(sequelize, DataTypes);
  var postlikes = _postlikes(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var posttags = _posttags(sequelize, DataTypes);
  var profilelikes = _profilelikes(sequelize, DataTypes);
  var profiles = _profiles(sequelize, DataTypes);
  var profileviews = _profileviews(sequelize, DataTypes);
  var replies = _replies(sequelize, DataTypes);
  var replylikes = _replylikes(sequelize, DataTypes);
  var reports = _reports(sequelize, DataTypes);
  var soundratings = _soundratings(sequelize, DataTypes);
  var sounds = _sounds(sequelize, DataTypes);
  var tagratings = _tagratings(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var userauth = _userauth(sequelize, DataTypes);
  var userratings = _userratings(sequelize, DataTypes);

  comments.belongsToMany(profiles, { as: 'profileid_profiles', through: commentlikes, foreignKey: "cmtid", otherKey: "profileid" });
  posts.belongsToMany(profiles, { as: 'profileid_profiles_postlikes', through: postlikes, foreignKey: "postid", otherKey: "profileid" });
  posts.belongsToMany(tags, { as: 'tagid_tags', through: posttags, foreignKey: "postid", otherKey: "tagid" });
  profiles.belongsToMany(comments, { as: 'cmtid_comments', through: commentlikes, foreignKey: "profileid", otherKey: "cmtid" });
  profiles.belongsToMany(posts, { as: 'postid_posts', through: postlikes, foreignKey: "profileid", otherKey: "postid" });
  profiles.belongsToMany(replies, { as: 'rplyid_replies', through: replylikes, foreignKey: "profileid", otherKey: "rplyid" });
  profiles.belongsToMany(userauth, { as: 'userauthid_userauths', through: profilelikes, foreignKey: "profileid", otherKey: "userauthid" });
  profiles.belongsToMany(userauth, { as: 'userauthid_userauth_profileviews', through: profileviews, foreignKey: "profileid", otherKey: "userauthid" });
  replies.belongsToMany(profiles, { as: 'profileid_profiles_replylikes', through: replylikes, foreignKey: "rplyid", otherKey: "profileid" });
  tags.belongsToMany(posts, { as: 'postid_posts_posttags', through: posttags, foreignKey: "tagid", otherKey: "postid" });
  userauth.belongsToMany(profiles, { as: 'profileid_profiles_profilelikes', through: profilelikes, foreignKey: "userauthid", otherKey: "profileid" });
  userauth.belongsToMany(profiles, { as: 'profileid_profiles_profileviews', through: profileviews, foreignKey: "userauthid", otherKey: "profileid" });
  commentlikes.belongsTo(comments, { as: "cmt", foreignKey: "cmtid"});
  comments.hasMany(commentlikes, { as: "commentlikes", foreignKey: "cmtid"});
  replies.belongsTo(comments, { as: "cmt", foreignKey: "cmtid"});
  comments.hasMany(replies, { as: "replies", foreignKey: "cmtid"});
  mediatyperatings.belongsTo(mediatype, { as: "ct", foreignKey: "ctid"});
  mediatype.hasMany(mediatyperatings, { as: "mediatyperatings", foreignKey: "ctid"});
  posts.belongsTo(mediatype, { as: "ct", foreignKey: "ctid"});
  mediatype.hasMany(posts, { as: "posts", foreignKey: "ctid"});
  comments.belongsTo(posts, { as: "post", foreignKey: "postid"});
  posts.hasMany(comments, { as: "comments", foreignKey: "postid"});
  history.belongsTo(posts, { as: "vid_post", foreignKey: "vid"});
  posts.hasMany(history, { as: "histories", foreignKey: "vid"});
  postlikes.belongsTo(posts, { as: "post", foreignKey: "postid"});
  posts.hasMany(postlikes, { as: "postlikes", foreignKey: "postid"});
  posttags.belongsTo(posts, { as: "post", foreignKey: "postid"});
  posts.hasMany(posttags, { as: "posttags", foreignKey: "postid"});
  tags.belongsTo(posts, { as: "pst", foreignKey: "pstid"});
  posts.hasMany(tags, { as: "tags", foreignKey: "pstid"});
  commentlikes.belongsTo(profiles, { as: "profile", foreignKey: "profileid"});
  profiles.hasMany(commentlikes, { as: "commentlikes", foreignKey: "profileid"});
  comments.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(comments, { as: "comments", foreignKey: "pid"});
  history.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(history, { as: "histories", foreignKey: "pid"});
  postlikes.belongsTo(profiles, { as: "profile", foreignKey: "profileid"});
  profiles.hasMany(postlikes, { as: "postlikes", foreignKey: "profileid"});
  posts.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(posts, { as: "posts", foreignKey: "pid"});
  profilelikes.belongsTo(profiles, { as: "profile", foreignKey: "profileid"});
  profiles.hasMany(profilelikes, { as: "profilelikes", foreignKey: "profileid"});
  profileviews.belongsTo(profiles, { as: "profile", foreignKey: "profileid"});
  profiles.hasMany(profileviews, { as: "profileviews", foreignKey: "profileid"});
  replies.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(replies, { as: "replies", foreignKey: "pid"});
  replylikes.belongsTo(profiles, { as: "profile", foreignKey: "profileid"});
  profiles.hasMany(replylikes, { as: "replylikes", foreignKey: "profileid"});
  reports.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(reports, { as: "reports", foreignKey: "pid"});
  sounds.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(sounds, { as: "sounds", foreignKey: "pid"});
  userratings.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(userratings, { as: "userratings", foreignKey: "pid"});
  replylikes.belongsTo(replies, { as: "rply", foreignKey: "rplyid"});
  replies.hasMany(replylikes, { as: "replylikes", foreignKey: "rplyid"});
  posts.belongsTo(sounds, { as: "sound", foreignKey: "soundid"});
  sounds.hasMany(posts, { as: "posts", foreignKey: "soundid"});
  soundratings.belongsTo(sounds, { as: "snd", foreignKey: "sndid"});
  sounds.hasMany(soundratings, { as: "soundratings", foreignKey: "sndid"});
  posttags.belongsTo(tags, { as: "tag", foreignKey: "tagid"});
  tags.hasMany(posttags, { as: "posttags", foreignKey: "tagid"});
  tagratings.belongsTo(tags, { as: "tag", foreignKey: "tagid"});
  tags.hasMany(tagratings, { as: "tagratings", foreignKey: "tagid"});
  mediatyperatings.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(mediatyperatings, { as: "mediatyperatings", foreignKey: "auid"});
  profilelikes.belongsTo(userauth, { as: "userauth", foreignKey: "userauthid"});
  userauth.hasMany(profilelikes, { as: "profilelikes", foreignKey: "userauthid"});
  profileviews.belongsTo(userauth, { as: "userauth", foreignKey: "userauthid"});
  userauth.hasMany(profileviews, { as: "profileviews", foreignKey: "userauthid"});
  soundratings.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(soundratings, { as: "soundratings", foreignKey: "auid"});
  tagratings.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(tagratings, { as: "tagratings", foreignKey: "auid"});
  userratings.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(userratings, { as: "userratings", foreignKey: "auid"});

  return {
    commentlikes,
    comments,
    history,
    mediatype,
    mediatyperatings,
    postlikes,
    posts,
    posttags,
    profilelikes,
    profiles,
    profileviews,
    replies,
    replylikes,
    reports,
    soundratings,
    sounds,
    tagratings,
    tags,
    userauth,
    userratings,
  };
}
const _initModels = initModels;
export { _initModels as initModels };
const _default = initModels;
export { _default as default };
