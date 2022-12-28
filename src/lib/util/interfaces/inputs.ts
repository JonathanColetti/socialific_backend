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
}

export interface IUauthInput extends Input {
    birthday: string
    email: string 
    gender: string
    password: string
    phonenum: string 
}

export interface ICommentsInput extends Input {
    post: number
    comment: string
    medialnk: string
}
export interface IMediatype extends Input {
    name: string
}