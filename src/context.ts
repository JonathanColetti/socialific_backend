

// get request header for resolvers for verification
export const createContext = (req: Request) => {
    return {request: req}
}