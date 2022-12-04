

export default function fuzzymatch(tomatch: string,fquery: string) {
    tomatch = tomatch.toLowerCase()
    fquery = fquery.toLowerCase()
    let i = 0, n = -1, l;
    for (; l = fquery[i++] ;) {
        if (!~(n = tomatch.indexOf(l, n+1))) return false
    }
    return true;
}