module.exports = {
    log(message) {
        console.log(`[${new Date().toLocaleDateString()}][${new Date().toLocaleTimeString()}] ${message}`);
    },

    info(message) {
        this.log(`[INFO] ${message}`);
    },

    warn(message) {
        this.log(`[WARN] ${message}`);
    },

    error(message) {
        this.log(`[ERROR] ${message}`);
    },

    debug(message) {
        this.log(`[DEBUG] ${message}`);
    }
}