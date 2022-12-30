interface Input {
    uid: string
}

export interface IPostsInput extends Input {
    caption: string
    medialnk: string
    plocation: string
    soundid: number
    ctid: number
    whosees: string

}

export interface IProfileInput extends Input {
    username: string
    rname: string
    propic: string
    bg: string 
    whosees: string
    bio: string
    stickers: string 
    cmntstickers: string 
    border: string 
    name: string 
    font: string 
    location: string
    pubbg: string
}

export interface IUauthInput extends Input {
    birthday: string
    email: string 
    gender: string
    password: string
    phonenum: string 
}

export interface ICommentsInput extends Input {
    postid: number
    comment: string
    medialnk: string
}

export interface IRuserauth extends Input {
    email: string
    phonenum: string
    password: string
}

export interface IRprofiles extends Input {
    username: string
    id: number
}

export interface IRposts extends Input {
    tid: number
    pid: number
    sndid: number
    mid: number
}
export interface IEditpost extends Input {
    
    soundid: number,
    caption: string,
    pinned: number,
}
export interface IRcomments extends Input {postid: number}

export interface IMediatype extends Input {name: string}

export interface IPostactions extends Input {postid: number}

export interface IProfileactions extends Input {profileid: number}

export interface IAddEmoji extends Input {
    commentid: number
    whichemoji: string
}

export interface IRmPost extends Input { 
    postid: number
}

export interface IRmUa extends Input {
    password: string
}

export interface IRmPr extends Input {
    
}