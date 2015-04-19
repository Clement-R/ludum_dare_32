BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    this.create_ready = true;

    body_total = 6;
    top_total = 3;
    stock_total = 3;

    body_part_name = '';
    top_part_name = '';
    stock_part_name = '';

    start_time = 0.0;
    elapsed_time = 0.0;
    time = 0.0;
    time_before_spin = 1;
};

BasicGame.Game.prototype = {

    set_parts_positions: function() {
        // BODY
        body_part.x = this.world.centerX;
        body_part.y = this.world.centerY;

        // TOP
        top_part.x = body_part.x
        top_part.y = body_part.y - (body_part.height / 2)

        // STOCK
        stock_part.x = body_part.x - (body_part.width / 2);
        stock_part.y = body_part.y;
    },

    create: function () {
        // Initialize parts positions
        x = this.world.centerX
        y = this.world.centerY

        // BODY
        body_part = this.add.sprite(x, y, body_part_name);
        body_part.scale.setTo(0.5, 0.5);
        body_part.anchor.setTo(0.5, 0.5);

        // TOP
        x = body_part.x;
        y = body_part.y - (body_part.height / 2);
        top_part = this.add.sprite(x, y, top_part_name);
        top_part.scale.setTo(0.5, 0.5);
        top_part.anchor.setTo(0.5, 1);

        // STOCK
        x = body_part.x - (body_part.width / 2);
        y = body_part.y;
        stock_part = this.add.sprite(x, y, stock_part_name);
        stock_part.scale.setTo(0.5, 0.5);
        stock_part.anchor.setTo(1, 0.5);

        // Initialize controls
        spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Create first weapon
        this.create_weapon();
    },

    update: function () {
        if (spacebar.isDown) {
            this.create_weapon();
        }

        // Get time
        if (this.create_ready == false) {
            elapsed_time = this.game.time.totalElapsedSeconds() - start_time;
            time = time_before_spin - elapsed_time
            if(elapsed_time > time_before_spin) {
                this.create_ready = true;
            }
        }

        // Tell time before next spin
        if(time <= 0.0) {
            this.game.debug.text('Next spin ready !', 256, 32);
        } else {
            time = time.toPrecision(2);
            this.game.debug.text('Time before next spin : ' + time, 256, 32);
        }

        // Debug
        this.game.debug.text('Body : ' + body_part_name, 32, 32);
        this.game.debug.text('Top : ' + top_part_name, 32, 64);
        
        this.game.debug.text("Mouse x : " + this.input.mousePointer.x, 32, 96);
        this.game.debug.text("Mouse y : " + this.input.mousePointer.y, 32, 124);

        this.game.debug.pixel(body_part.x, body_part.y, 'rgba(0,255,255,1)');
        this.game.debug.pixel(top_part.x, top_part.y, 'rgba(0,255,255,1)') ;
        this.game.debug.pixel(stock_part.x, stock_part.y, 'rgba(0,255,255,1)');

        this.game.debug.spriteInfo(body_part, 32, 156);
        this.game.debug.spriteInfo(top_part, 32, 250);

        this.game.debug.text("Stock x : " + stock_part.x, 32, 350);
        this.game.debug.text("Stock y : " + stock_part.y, 32, 370);
    },

    quit_game: function (pointer) {
        this.state.start('MainMenu');
    },

    create_weapon: function() {
        if(this.create_ready == true) {
            start_time = this.game.time.totalElapsedSeconds();
            this.create_ready = false;

            // BODY PART
            var rnd_int = this.rnd.integerInRange(1, body_total);
            body_part_name = "body_0".concat(rnd_int);
            body_part.loadTexture(body_part_name);

            // TOP PART
            var rnd_int = this.rnd.integerInRange(1, top_total);
            top_part_name = "top_0".concat(rnd_int);
            top_part.loadTexture(top_part_name);

            // TOP PART
            var rnd_int = this.rnd.integerInRange(1, stock_total);
            stock_part_name = "stock_0".concat(rnd_int);
            stock_part.loadTexture(stock_part_name);

            this.set_parts_positions();
        }
    }
};
