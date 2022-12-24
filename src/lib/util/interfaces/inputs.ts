interface Input {
    uid: string
}

export interface IPostsInput extends Input {
    caption: string
    medialnk: string
    plocation: string
    soundid: number
    ctid: number

}

export interface IProfileInput extends Input {
    username: string
    rname: string
    propic: string
    bg: string 
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
    email: string | undefined
    gender: string
    password: string
    phonenum: string | undefined
}

export interface ICommentsInput extends Input {
    post: number
    comment: string
    medialnk: string
}