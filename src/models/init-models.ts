var DataTypes = require("sequelize").DataTypes;
var _commentlikes = require("./commentlikes");
var _comments = require("./comments");
var _history = require("./history");
var _mediatype = require("./mediatype");
var _mediatyperatings = require("./mediatyperatings");
var _postlikes = require("./postlikes");
var _posts = require("./posts");
var _posttags = require("./posttags");
var _profilelikes = require("./profilelikes");
var _profiles = require("./profiles");
var _replies = require("./replies");
var _replylikes = require("./replylikes");
var _reports = require("./reports");
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
  var postlikes = _postlikes(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var posttags = _posttags(sequelize, DataTypes);
  var profilelikes = _profilelikes(sequelize, DataTypes);
  var profiles = _profiles(sequelize, DataTypes);
  var replies = _replies(sequelize, DataTypes);
  var replylikes = _replylikes(sequelize, DataTypes);
  var reports = _reports(sequelize, DataTypes);
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
  replies.belongsToMany(profiles, { as: 'profileid_profiles_replylikes', through: replylikes, foreignKey: "rplyid", otherKey: "profileid" });
  tags.belongsToMany(posts, { as: 'postid_posts_posttags', through: posttags, foreignKey: "tagid", otherKey: "postid" });
  userauth.belongsToMany(profiles, { as: 'profileid_profiles_profilelikes', through: profilelikes, foreignKey: "userauthid", otherKey: "profileid" });
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
  commentlikes.belongsTo(profiles, { as: "profile", foreignKey: "profileid"});
  profiles.hasMany(commentlikes, { as: "commentlikes", foreignKey: "profileid"});
  history.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(history, { as: "histories", foreignKey: "pid"});
  mediatyperatings.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(mediatyperatings, { as: "mediatyperatings", foreignKey: "pid"});
  postlikes.belongsTo(profiles, { as: "profile", foreignKey: "profileid"});
  profiles.hasMany(postlikes, { as: "postlikes", foreignKey: "profileid"});
  posts.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(posts, { as: "posts", foreignKey: "pid"});
  profilelikes.belongsTo(profiles, { as: "profile", foreignKey: "profileid"});
  profiles.hasMany(profilelikes, { as: "profilelikes", foreignKey: "profileid"});
  replies.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(replies, { as: "replies", foreignKey: "pid"});
  replylikes.belongsTo(profiles, { as: "profile", foreignKey: "profileid"});
  profiles.hasMany(replylikes, { as: "replylikes", foreignKey: "profileid"});
  reports.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(reports, { as: "reports", foreignKey: "pid"});
  tagratings.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(tagratings, { as: "tagratings", foreignKey: "pid"});
  userratings.belongsTo(profiles, { as: "pid_profile", foreignKey: "pid"});
  profiles.hasMany(userratings, { as: "userratings", foreignKey: "pid"});
  replylikes.belongsTo(replies, { as: "rply", foreignKey: "rplyid"});
  replies.hasMany(replylikes, { as: "replylikes", foreignKey: "rplyid"});
  posttags.belongsTo(tags, { as: "tag", foreignKey: "tagid"});
  tags.hasMany(posttags, { as: "posttags", foreignKey: "tagid"});
  tagratings.belongsTo(tags, { as: "tag", foreignKey: "tagid"});
  tags.hasMany(tagratings, { as: "tagratings", foreignKey: "tagid"});
  profilelikes.belongsTo(userauth, { as: "userauth", foreignKey: "userauthid"});
  userauth.hasMany(profilelikes, { as: "profilelikes", foreignKey: "userauthid"});
  userratings.belongsTo(userauth, { as: "uauth_userauth", foreignKey: "uauth"});
  userauth.hasMany(userratings, { as: "userratings", foreignKey: "uauth"});

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
    replies,
    replylikes,
    reports,
    tagratings,
    tags,
    userauth,
    userratings,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
