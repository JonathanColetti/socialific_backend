
import db from "../database"
import { Irepoting } from "../lib/util/interfaces/reports"


// Create a report of auth
export const AuthError = async (args: Irepoting): Promise<boolean> => {
    const AuthErr = await db.reports.create({
        severity: args.severity,
        info: `${args.ip} has failed on ${args.filename} because of non vaild authentication trace: ${args.values}`,
        pid: 0
    })
    return true
}

export const MissingError = async (args: Irepoting):Promise<boolean> => {
    const MissError = await db.reports.create({
        severity: args.severity,
        info: `${args.ip} has missed crucial args on ${args.filename}, trace: ${args.values}`,
        pid: 0,
    })
    return true
}