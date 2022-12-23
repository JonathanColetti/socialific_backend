import { IUauthInput } from "../lib/util/interfaces/inputs";
import { Irepoting } from "../lib/util/interfaces/reports";
import verifyip from "../lib/util/verification/checkip";
import { MissingError } from "../reporting/rdb";

export default async function muserauth(_arguments: IUauthInput, ip: string) {
    // (A+B+C)(C+D)
    if ((_arguments.password === undefined || _arguments.birthday === undefined || _arguments.gender === undefined) && 
    (_arguments.phonenum === undefined || _arguments.email === undefined)) {
        const report: Irepoting = {
            severity: 0,
            ip: ip,
            filename: 'muserauth',
            values: _arguments
        }
        MissingError(report)
        return null
    }
     
}