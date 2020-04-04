module.exports = {
	info(message) {
		console.log(`[${new Date().toLocaleDateString()}][${new Date().toLocaleTimeString()}][INFO] ${message}`);
	},

	warn(message) {
		console.warn(`[${new Date().toLocaleDateString()}][${new Date().toLocaleTimeString()}][WARN] ${message}`);
	},

	error(message) {
		console.error(`[${new Date().toLocaleDateString()}][${new Date().toLocaleTimeString()}][ERROR] ${message}`);
	},

	debug(message) {
		if (process.env.NODE_ENV === "development") {
			console.log(`[${new Date().toLocaleDateString()}][${new Date().toLocaleTimeString()}][DEBUG] ${message}`);
		}
	},
};