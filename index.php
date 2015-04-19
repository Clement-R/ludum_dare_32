<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Phaser Basic Project Template</title>
    <script src="phaser.min.js"></script>
    <script src="Boot.js"></script>
    <script src="Preloader.js"></script>
    <script src="MainMenu.js"></script>
    <script src="Game.js"></script>
</head>
<body>

<?php
    $files_list = scandir('assets/images/');
    $parts = ['body', 'top', 'stock'];
    $parts_list = array();
    foreach ($parts as $part) {
        foreach($files_list as $file) {
            $path = 'assets/images/'.$file;
            if(is_file($path)) {
                if(pathinfo($path, PATHINFO_EXTENSION) == "png") {
                    if (strpos($path, $part) !== false) {
                        $parts_list[$part][] = $file;
                    }
                }
            }
        }
    }
?>

<div id="gameContainer"></div>

<script type="text/javascript">

window.onload = function() {
    //  Create your Phaser game and inject it into the gameContainer div.
    //  We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
    var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameContainer');

    game.parts_body = <?php echo json_encode($parts_list['body']);?>;
    game.parts_top = <?php echo json_encode($parts_list['top']);?>;
    game.parts_stock = <?php echo json_encode($parts_list['stock']);?>;

    //  Add the States your game has.
    //  You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
    game.state.add('Boot', BasicGame.Boot);
    game.state.add('Preloader', BasicGame.Preloader);
    game.state.add('MainMenu', BasicGame.MainMenu);
    game.state.add('Game', BasicGame.Game);

    //  Now start the Boot state.
    game.state.start('Boot');

};

</script>

</body>
</html>