module.exports = {
	responses: {
		negative: ["I'm drunk - **you** don't have an excuse!", "I feel like every bone in me body's broke!", "Thankfully I already don't remember this.", "Bloody hell!", "Oh, me mother Tilly.", "I did what I could!", "Boooooooo!"],
		positive: ["That's the way ya do it!", "If I wasn' the man I was I'd kiss ye!", "That's the spirit!", "Bloody brilliant!", "Imagine if I hadn't been drunk, hehe!", "We... did it!"],
	},

	random(category) {
		const selected = Math.floor(Math.random() * this.responses[category].length);
		return this.responses[category][selected];
	},
};