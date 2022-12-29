var DataTypes = require("sequelize").DataTypes;
var _commentlikes = require("./commentlikes");
var _comments = require("./comments");
var _history = require("./history");
var _mediatype = require("./mediatype");
var _mediatyperatings = require("./mediatyperatings");
var _postcommentemoji = require("./postcommentemoji");
var _postlikes = require("./postlikes");
var _postmediatype = require("./postmediatype");
var _posts = require("./posts");
var _posttags = require("./posttags");
var _postviews = require("./postviews");
var _profilelikes = require("./profilelikes");
var _profiles = require("./profiles");
var _profileviews = require("./profileviews");
var _replies = require("./replies");
var _replylikes = require("./replylikes");
var _reports = require("./reports");
var _soundratings = require("./soundratings");
var _sounds = require("./sounds");
var _tagratings = require("./tagratings");
var _tags = require("./tags");
var _userauth = require("./userauth");
var _userratings = require("./userratings");

function initModels(sequelize) {
  var commentlikes = _commentlikes(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var history = _history(sequelize, DataTypes);
  var mediatype = _mediatype(sequelize, DataTypes);
  var mediatyperatings = _mediatyperatings(sequelize, DataTypes);
  var postcommentemoji = _postcommentemoji(sequelize, DataTypes);
  var postlikes = _postlikes(sequelize, DataTypes);
  var postmediatype = _postmediatype(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var posttags = _posttags(sequelize, DataTypes);
  var postviews = _postviews(sequelize, DataTypes);
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
  mediatype.belongsToMany(posts, { as: 'postid_posts_postmediatypes', through: postmediatype, foreignKey: "mediat", otherKey: "postid" });
  posts.belongsToMany(mediatype, { as: 'mediat_mediatypes', through: postmediatype, foreignKey: "postid", otherKey: "mediat" });
  posts.belongsToMany(tags, { as: 'tagid_tags', through: posttags, foreignKey: "postid", otherKey: "tagid" });
  posts.belongsToMany(userauth, { as: 'auid_userauths', through: postlikes, foreignKey: "postid", otherKey: "auid" });
  posts.belongsToMany(userauth, { as: 'auid_userauth_postviews', through: postviews, foreignKey: "postid", otherKey: "auid" });
  profiles.belongsToMany(comments, { as: 'cmtid_comments', through: commentlikes, foreignKey: "profileid", otherKey: "cmtid" });
  profiles.belongsToMany(replies, { as: 'rplyid_replies', through: replylikes, foreignKey: "profileid", otherKey: "rplyid" });
  profiles.belongsToMany(userauth, { as: 'auid_userauth_profilelikes', through: profilelikes, foreignKey: "profileid", otherKey: "auid" });
  profiles.belongsToMany(userauth, { as: 'auid_userauth_profileviews', through: profileviews, foreignKey: "profileid", otherKey: "auid" });
  replies.belongsToMany(profiles, { as: 'profileid_profiles_replylikes', through: replylikes, foreignKey: "rplyid", otherKey: "profileid" });
  tags.belongsToMany(posts, { as: 'postid_posts_posttags', through: posttags, foreignKey: "tagid", otherKey: "postid" });
  userauth.belongsToMany(posts, { as: 'postid_posts', through: postlikes, foreignKey: "auid", otherKey: "postid" });
  userauth.belongsToMany(posts, { as: 'postid_posts_postviews', through: postviews, foreignKey: "auid", otherKey: "postid" });
  userauth.belongsToMany(profiles, { as: 'profileid_profiles_profilelikes', through: profilelikes, foreignKey: "auid", otherKey: "profileid" });
  userauth.belongsToMany(profiles, { as: 'profileid_profiles_profileviews', through: profileviews, foreignKey: "auid", otherKey: "profileid" });
  commentlikes.belongsTo(comments, { as: "cmt", foreignKey: "cmtid"});
  comments.hasMany(commentlikes, { as: "commentlikes", foreignKey: "cmtid"});
  replies.belongsTo(comments, { as: "cmt", foreignKey: "cmtid"});
  comments.hasMany(replies, { as: "replies", foreignKey: "cmtid"});
  mediatyperatings.belongsTo(mediatype, { as: "ct", foreignKey: "ctid"});
  mediatype.hasMany(mediatyperatings, { as: "mediatyperatings", foreignKey: "ctid"});
  postmediatype.belongsTo(mediatype, { as: "mediat_mediatype", foreignKey: "mediat"});
  mediatype.hasMany(postmediatype, { as: "postmediatypes", foreignKey: "mediat"});
  comments.belongsTo(posts, { as: "post", foreignKey: "postid"});
  posts.hasMany(comments, { as: "comments", foreignKey: "postid"});
  history.belongsTo(posts, { as: "vid_post", foreignKey: "vid"});
  posts.hasMany(history, { as: "histories", foreignKey: "vid"});
  postcommentemoji.belongsTo(posts, { as: "post", foreignKey: "postid"});
  posts.hasMany(postcommentemoji, { as: "postcommentemojis", foreignKey: "postid"});
  postlikes.belongsTo(posts, { as: "post", foreignKey: "postid"});
  posts.hasMany(postlikes, { as: "postlikes", foreignKey: "postid"});
  postmediatype.belongsTo(posts, { as: "post", foreignKey: "postid"});
  posts.hasMany(postmediatype, { as: "postmediatypes", foreignKey: "postid"});
  posttags.belongsTo(posts, { as: "post", foreignKey: "postid"});
  posts.hasMany(posttags, { as: "posttags", foreignKey: "postid"});
  postviews.belongsTo(posts, { as: "post", foreignKey: "postid"});
  posts.hasMany(postviews, { as: "postviews", foreignKey: "postid"});
  tags.belongsTo(posts, { as: "pst", foreignKey: "pstid"});
  posts.hasMany(tags, { as: "tags", foreignKey: "pstid"});
  commentlikes.belongsTo(profiles, { as: "profile", foreignKey: "profileid"});
  profiles.hasMany(commentlikes, { as: "commentlikes", foreignKey: "profileid"});
  profilelikes.belongsTo(profiles, { as: "profile", foreignKey: "profileid"});
  profiles.hasMany(profilelikes, { as: "profilelikes", foreignKey: "profileid"});
  profileviews.belongsTo(profiles, { as: "profile", foreignKey: "profileid"});
  profiles.hasMany(profileviews, { as: "profileviews", foreignKey: "profileid"});
  replylikes.belongsTo(profiles, { as: "profile", foreignKey: "profileid"});
  profiles.hasMany(replylikes, { as: "replylikes", foreignKey: "profileid"});
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
  comments.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(comments, { as: "comments", foreignKey: "auid"});
  history.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(history, { as: "histories", foreignKey: "auid"});
  mediatyperatings.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(mediatyperatings, { as: "mediatyperatings", foreignKey: "auid"});
  postcommentemoji.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(postcommentemoji, { as: "postcommentemojis", foreignKey: "auid"});
  postlikes.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(postlikes, { as: "postlikes", foreignKey: "auid"});
  posts.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(posts, { as: "posts", foreignKey: "auid"});
  postviews.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(postviews, { as: "postviews", foreignKey: "auid"});
  profilelikes.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(profilelikes, { as: "profilelikes", foreignKey: "auid"});
  profiles.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(profiles, { as: "profiles", foreignKey: "auid"});
  profileviews.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(profileviews, { as: "profileviews", foreignKey: "auid"});
  replies.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(replies, { as: "replies", foreignKey: "auid"});
  reports.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(reports, { as: "reports", foreignKey: "auid"});
  soundratings.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(soundratings, { as: "soundratings", foreignKey: "auid"});
  sounds.belongsTo(userauth, { as: "au", foreignKey: "auid"});
  userauth.hasMany(sounds, { as: "sounds", foreignKey: "auid"});
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
    postcommentemoji,
    postlikes,
    postmediatype,
    posts,
    posttags,
    postviews,
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
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
