export default class Logger {

    public static log(message: any, type?: any, data?: any) {
        let currentdate = new Date();
        let dateString  = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        let stamp = `\x1b[33m[SERVER][${type}][${dateString}] \x1b[36m`;
        console.log(stamp+message);
    }
    
    public static warn(message: any, data?: any) {
        Logger.log(message, "WARN", data);
    }

    public static error(message: any, data?: any) {
        Logger.log(message, "ERROR", data);
    }
    public static info(message: any, data?: any) {
        Logger.log(message, "INFO", data);
    }
    public static database(message: any, data?: any) {
        Logger.log(message, "DB", data);
    }
    
}