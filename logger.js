module.exports = {
    
    info(message, nl) {
        if (nl) {
            console.log("\r\n");
        }

        console.log(`[${new Date().toLocaleDateString()}][${new Date().toLocaleTimeString()}] ${message}`);
    },

    error(message, nl) {
        this.info(`[ERROR] ${message}`, nl);
    }
}