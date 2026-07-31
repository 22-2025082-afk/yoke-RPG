const player = {


    x: 25,

    y: 25,


    size: 16

};




function drawPlayer(ctx){


    ctx.fillStyle = "blue";



    ctx.fillRect(

        player.x * TILE_SIZE,

        player.y * TILE_SIZE,

        player.size,

        player.size

    );


}
