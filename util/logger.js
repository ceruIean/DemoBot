module.exports = {
	log(message, level) {
		let prefix = "";
		if (process.env.NODE_ENV !== "production") {
			prefix = `[${new Date().toLocaleDateString()}][${new Date().toLocaleTimeString()}]`;
		}

		console.log(`${prefix}${level} ${message}`);
	},

	info(message) {
		this.log(message, "[INFO]");
	},

	debug(message) {
		this.log(message, "[DEBUG]");
	},

	warn(message) {
		let prefix = "";
		if (process.env.NODE_ENV !== "production") {
			prefix = `[${new Date().toLocaleDateString()}][${new Date().toLocaleTimeString()}] `;
		}

		console.warn(`${prefix}${message}`);
	},

	error(message) {
		let prefix = "";
		if (process.env.NODE_ENV !== "production") {
			prefix = `[${new Date().toLocaleDateString()}][${new Date().toLocaleTimeString()}] `;
		}

		console.error(`${prefix}${message}`);
	},
};