import { Irepoting } from "../lib/util/interfaces/reports"
import { MissingError } from "../reporting/rdb"

export const plikes = (_arguments: {uid: string, profileid: number}) => {
    if (_arguments.uid === undefined || _arguments.profileid === undefined) {
        const report: Irepoting = {
            ip: "",
            severity: 0,
            filename: "",
            values: undefined,
            pid: 0
        }
        MissingError(report);
        return null;
    }
    
}