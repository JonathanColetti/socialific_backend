interface iratings {
    id: number
    auid: number
    score: number
    time_created: any
    time_updated: any
}

export interface iprofilerating extends iratings {
    pid: number
}

export interface imediatyperatings extends iratings {
    ctid: number
}
export interface itagratings extends iratings {
    tagid: number
}
export interface isoundratings extends iratings {
    sndid: number
}