export default function checkvalid(value: any): boolean {
    if (value === undefined || value === null || value == '' ) return false;
    return true;
}