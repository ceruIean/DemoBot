module.exports = {
    randomResponse(category) {
        const responses = [["I'm drunk - **you** don't have an excuse!", "I feel like every bone in me body's broke!", "Thankfully I already don't remember this.", "Bloody hell!", "Oh, me mother Tilly.", "I did what I could!", "Boooooooo!"], ["That's the way ya do it!", "If I wasn' the man I was I'd kiss ye!", "That's the spirit!", "Bloody brilliant!", "Imagine if I hadn't been drunk!", "We... did it!"]];
        const selected = Math.floor(Math.random() * responses[category].length);
        return responses[category][selected];
    },

    randomSound(category, length) {
        if (!category || !length) {
            return;
        }

        const selected = Math.floor(Math.random() * length);
        return this.getSound(`${category}/${selected}/${category}`);
    },

    getSound(soundName) {
        if (!soundName) {
            return;
        }

        return `./assets/sounds/${soundName}.ogg`;
    },

    getImage(imageName) {
        if (!imageName) {
            return;
        }

        return `./assets/images/${imageName}`;
    },

    randomColor: function () {
        return this.getColorInt(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
    },

    getColorInt(r, g, b) {
        return r << 16 | g << 8 | b;
    },
};