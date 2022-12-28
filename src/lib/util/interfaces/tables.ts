interface itable {
    id: number,
    time_created: any,
    time_updated: any,
}

export interface iprofiles extends itable {
    username: string,
    propic: string,
    bg: string,
    whosees: string,
    pubbg: string,
    stickers: string,
    border: string,
    font: string,
    rname: string,
    bio: string,
    sviews: boolean,
    slikes: number,
}



export interface iposts extends itable {
    ctid: number,
    pid: number,
    caption: string,
    medialnk: string,
    plocation: string,
    pinned: number

}

export interface icomments extends itable {
    postid: number,
    pid: number,
    comment: string,
    commentlnk: string,
}