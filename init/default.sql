INSERT INTO userauth(id, userid, phonenum, gender, email, userpass, ipaddr, birthday) VALUES(
    1, 'Kd62EX84NPJEXJSqZSChz4Ju97PRDB4OMOSFb0zy5VYMZ7v5Np6CPZzkXY4YZ6rcq4MkFbTqzMbLZmJLRFs4I8G4VdTVpiGoEPiS',
    '6474561731', 'M', 'colettijonathan03@gmail.com', '6065e387895a0102f36d091239bf7b256a401bd4001c1ae0d86942cfa0c7ccd5c3bf82f918dd6f67d7a0d68008ba966e49035a5e47d63ccad5f16026e064f0eb', '127.0.0.1', '2003-12-15'

);

INSERT INTO userauth(id, userid, phonenum, gender, email, userpass, ipaddr, birthday) VALUES(
    2, 'DF1u412lmcQBhpYpMaq1DuWtW1p8hycwOsYP3O4jLcYqVdf6DHBv2V7MFz7EhPDYbUhxauh89TDKQNSM6szYG8v3PX3MipSehg7S',
    '0000000000', 'A', 'grandmaskisses342@gmail.com', '6065e387895a0102f36d091239bf7b256a401bd4001c1ae0d86942cfa0c7ccd5c3bf82f918dd6f67d7a0d68008ba966e49035a5e47d63ccad5f16026e064f0eb', '127.0.0.1', '2003-12-15'
);

INSERT INTO profiles(id, username, propic, bg, pubbg, stickers, border, font, rname, bio) VALUES(
    1, 'JonathanColetti',
    'https://marketplace.canva.com/EAE6OH6DF2w/1/0/1600w/canva-moon-astronaut-character-twitch-profile-picture-0kkgyJSodt4.jpg',
    'midnight', 'midnight', '{}', NULL, 'cursive', 'Jonathan Coletti', 'Cool app bro'

);
INSERT INTO profiles(id, username, propic, bg, pubbg, stickers, border, font, rname, bio) VALUES(
    2, 'TeamHighlightit',
    '',
    'yellow', 'yellow', '{}', NULL, 'normal', 'Team highlightit', 'Go highlight it'

);
INSERT INTO mediatype(id, category) VALUES(1, 'picture');
INSERT INTO mediatype(id, category) VALUES(2, 'text');
INSERT INTO mediatype(id, category) VALUES(3, 'video');
INSERT INTO mediatype(id, category) VALUES(4, 'event');


INSERT INTO posts(id, ctid, pid, caption, medialnk) VALUES(1, 1, 1, 'My first photo', 'https://https://stickerly.pstatic.net/sticker_pack/PQEbA06NLcQ7reKUeFtK0g/9I87N5/2/08cebe44-befc-4883-b0a8-913d0225db72.png');
INSERT INTO posts(id, ctid, pid, caption, medialnk) VALUES(2, 2, 2, 'Welcome to highlightit', '');
INSERT INTO posts(id, ctid, pid, caption, medialnk) VALUES(3, 3, 1, 'My first video', 'https://joy.videvo.net/videvo_files/video/free/video0484/small_watermarked/_import_61a4600768fe54.78092958_preview.mp4');
INSERT INTO posts(id, ctid, pid, caption, medialnk, plocation) VALUES(4, 4, 1, 'CoolCon 2021', 'https://hips.hearstapps.com/hmg-prod/images/fake-star-wars-9-poster-1553802118.png', '142 Fake St');

INSERT INTO tags(id, tagname) VALUES(1, 'Buisness');
INSERT INTO tags(id, tagname) VALUES(2, 'Beauty');
INSERT INTO tags(id, tagname) VALUES(3, 'Crime');

INSERT INTO comments(id, postid, pid, comment, commentlnk) VALUES(1, 1, 2, 'Fr?', NULL);
INSERT INTO comments(id, postid, pid, comment, commentlnk) VALUES(2, 2, 1, 'This is my home', NULL);

INSERT INTO replies(id, cmtid, pid, comment, commentlnk) VALUES(1, 1, 1, 'YESSIR!', NULL);

INSERT INTO history(id, pid, vid) VALUES(1, 1, 4);

INSERT INTO reports(id, pid, rnum) VALUES(1, 1, 2);

INSERT INTO userratings(id, uauth, pid) VALUES (1, 1, 2);

INSERT INTO mediatyperatings(id, ctid, pid) VALUES(1, 2, 1);

INSERT INTO tagratings(id, tagid, pid) VALUES (1, 1, 1);

INSERT INTO replylikes(profileid, rplyid) VALUES(2, 1);

INSERT INTO commentlikes(profileid, cmtid) VALUES(1, 1);

INSERT INTO postlikes(profileid, postid) VALUES(1, 2);

INSERT INTO profilelikes(userauthid, profileid) VALUES(1, 2);

INSERT INTO posttags(postid, tagid) VALUES(1, 1);

INSERT INTO profileviews(userauthid, profileid) VALUES (1,2);
