
import db from "../database"
import { Irepoting } from "../lib/util/interfaces/reports"


// Create a report of auth
export const AuthError = async (_arguments: Irepoting): Promise<boolean> => {
    const AuthErr = await db.reports.create({
        severity: _arguments.severity,
        info: `${_arguments.ip} has failed on ${_arguments.filename} because of non vaild authentication trace: ${_arguments.values}`,
        pid: 0
    })
    return true
}

export const MissingError = async (_arguments: Irepoting):Promise<boolean> => {
    const MissError = await db.reports.create({
        severity: _arguments.severity,
        info: `${_arguments.ip} has missed crucial args on ${_arguments.filename}, trace: ${_arguments.values}`,
        pid: 0,
    })
    return true
}