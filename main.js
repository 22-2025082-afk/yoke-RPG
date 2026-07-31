const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 360;


function gameLoop(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.fillStyle = "green";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    requestAnimationFrame(gameLoop);
}


gameLoop();
