let canvas;
let ctx;


function startGame(c, context){

    canvas = c;
    ctx = context;

    gameLoop();
}


function gameLoop(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    drawMap(ctx);
    drawPlayer(ctx);


    requestAnimationFrame(gameLoop);
}
