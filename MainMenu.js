BasicGame.MainMenu = function (game) {
};

BasicGame.MainMenu.prototype = {

	create: function () {
	},

	update: function () {
        this.state.start('Game');
	}
};
