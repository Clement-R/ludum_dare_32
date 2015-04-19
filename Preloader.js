BasicGame.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

    var parts_body = game.parts_body;
    var parts_top = game.parts_top;
    var parts_stock = game.parts_stock;

    this.parts = new Array();
    this.parts.push(parts_body);
    this.parts.push(parts_top);
    this.parts.push(parts_stock);
};

BasicGame.Preloader.prototype = {

    preload: function () {

        for (i = 0; i < this.parts.length; i++) {
            var part_type = this.parts[i];
            part_type.forEach(function(part){
                var name = part.replace(/\.[^/.]+$/, "");
                this.load.image(name, 'assets/images/'+ part +'');
            }, this);
        }
    },

    create: function () {
    },

    update: function () {
        this.state.start('MainMenu');
    }
};
