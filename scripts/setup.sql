DROP DATABASE socialific;
CREATE DATABASE socialific;
USE socialific;

CREATE TABLE userauth(
    id int NOT NULL AUTO_INCREMENT, 
    userid varchar(100) NOT NULL UNIQUE,  
    phonenum VARCHAR(20) NOT NULL,
    gender VARCHAR(1) NOT NULL,
    email varchar(100),
    userpass varchar(128),
    ipaddr varchar(100) NOT NULL,
    coins int DEFAULT 1,
    birthday DATE NOT NULL,  
    lastlgn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE profiles(
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(25) NOT NULL UNIQUE,
    propic VARCHAR(500),
    bg VARCHAR(500),
    pubbg VARCHAR(500),
    stickers VARCHAR(500),
    cmntstickers VARCHAR(500),
    border VARCHAR(100),
    font VARCHAR(100),
    rname VARCHAR(100),
    bio VARCHAR(100) NOT NULL,
    sviews TINYINT DEFAULT 1,
    slikes TINYINT DEFAULT 1,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)

);

CREATE TABLE mediatype(
    id int NOT NULL AUTO_INCREMENT,
    category varchar(20) NOT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
CREATE TABLE sounds(
    id int NOT NULL AUTO_INCREMENT,
    soundlnk varchar(300) NOT NULL,
    pid int,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pid) REFERENCES profiles(id),
    PRIMARY KEY (id)
);
CREATE TABLE posts(
    id int NOT NULL,
    ctid int NOT NULL,
    pid int NOT NULL,
    soundid int,
    caption varchar(100),
    medialnk varchar(500),
    plocation varchar(200),
    pinned TINYINT DEFAULT 0,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (soundid) REFERENCES sounds(id),
    FOREIGN KEY (ctid) REFERENCES mediatype(id),
    FOREIGN KEY (pid) REFERENCES profiles(id),
    PRIMARY KEY (id)
);

CREATE TABLE tags(
    id int NOT NULL AUTO_INCREMENT,
    tagname varchar(50) NOT NULL,
    pstid int NOT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pstid) REFERENCES posts(id),
    PRIMARY KEY (id)
);

CREATE TABLE comments(
    id int NOT NULL AUTO_INCREMENT,
    postid int NOT NULL,
    pid int NOT NULL,
    comment varchar(100),
    commentlnk varchar(100),
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (postid) REFERENCES posts(id),
    FOREIGN KEY (pid) REFERENCES profiles(id),
    PRIMARY KEY (id)
);

CREATE TABLE replies(
    id int NOT NULL AUTO_INCREMENT,
    cmtid int NOT NULL,
    pid int NOT NULL,
    comment varchar(100),
    commentlnk varchar(100),
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pid) REFERENCES profiles(id),
    FOREIGN KEY (cmtid) REFERENCES comments(id),
    PRIMARY KEY (id)
);

CREATE TABLE history(
    id int NOT NULL AUTO_INCREMENT,
    pid int NOT NULL,
    vid int NOT NULL,
    score int NOT NULL DEFAULT 1600, 
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pid) REFERENCES profiles(id),
    FOREIGN KEY (vid) REFERENCES posts(id),
    PRIMARY KEY (id)

);


CREATE TABLE reports(
    id int NOT NULL AUTO_INCREMENT,
    severity int,
    info varchar(300),
    pid int,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pid) REFERENCES profiles(id),
    PRIMARY KEY(id)
);


CREATE TABLE userratings(
    id int NOT NULL AUTO_INCREMENT,
    auid int NOT NULL,
    pid int NOT NULL,
    score int DEFAULT 1600,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pid) REFERENCES profiles(id),
    FOREIGN KEY (auid) REFERENCES userauth(id),
    PRIMARY KEY (id)

);

CREATE TABLE mediatyperatings(
    id int NOT NULL AUTO_INCREMENT,
    ctid int NOT NULL,
    auid int NOT NULL,
    score int DEFAULT 1600,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ctid) REFERENCES mediatype(id),
    FOREIGN KEY (auid) REFERENCES userauth(id),
    PRIMARY KEY (id)
);

CREATE TABLE tagratings(
    id int NOT NULL AUTO_INCREMENT,
    tagid int NOT NULL,
    auid int NOT NULL,
    score int DEFAULT 1600,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tagid) REFERENCES tags(id),
    FOREIGN KEY (auid) REFERENCES userauth(id),
    PRIMARY KEY (id)
);

CREATE TABLE soundratings(
    id int NOT NULL AUTO_INCREMENT,
    auid int NOT NULL,
    sndid int NOT NULL,
    score int DEFAULT 1600,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sndid) REFERENCES sounds(id), 
    FOREIGN KEY (auid) REFERENCES userauth(id),
    PRIMARY KEY (id)
);

CREATE TABLE replylikes(
    profileid int NOT NULL,
    rplyid int NOT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profileid) REFERENCES profiles(id),
    FOREIGN KEY (rplyid) REFERENCES replies(id),
    PRIMARY KEY (profileid, rplyid)
);

CREATE TABLE commentlikes(
    profileid int NOT NULL,
    cmtid int NOT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profileid) REFERENCES profiles(id),
    FOREIGN KEY (cmtid) REFERENCES comments(id),
    PRIMARY KEY (profileid, cmtid)
);

CREATE TABLE postlikes(
    profileid int NOT NULL,
    postid int NOT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profileid) REFERENCES profiles(id),
    FOREIGN KEY (postid) REFERENCES posts(id),
    PRIMARY KEY (profileid, postid)
);
CREATE TABLE posttags(
    postid int NOT NULL,
    tagid int NOT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (postid) REFERENCES posts(id),
    FOREIGN KEY (tagid) REFERENCES tags(id),
    PRIMARY KEY (postid, tagid)
);

CREATE TABLE profilelikes(
    userauthid int NOT NULL,
    profileid int NOT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userauthid) REFERENCES userauth(id),
    FOREIGN KEY (profileid) REFERENCES profiles(id),
    PRIMARY KEY (userauthid, profileid)
);

CREATE TABLE profileviews(
    userauthid int NOT NULL,
    profileid int NOT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userauthid) REFERENCES userauth(id),
    FOREIGN KEY (profileid) REFERENCES profiles(id),
    PRIMARY KEY (userauthid, profileid)
);
