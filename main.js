const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


canvas.width = 320;
canvas.height = 192;



const TILE_SIZE = 16;


// 表示範囲
const VIEW_WIDTH = 20;
const VIEW_HEIGHT = 12;


// 村サイズ
const MAP_WIDTH = 16;
const MAP_HEIGHT = 16;



// =====================
// タイル
// =====================

// 0 草
// 1 木
// 2 道
// 3 水
// 4 家
// 5 祠
// 6 噴水



const map = [

[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

[1,0,0,0,4,4,0,0,0,0,4,4,0,0,0,1],

[1,0,0,0,4,4,0,0,0,0,4,4,0,0,0,1],

[1,0,0,2,2,2,2,2,2,2,2,2,0,0,0,1],

[1,0,0,2,0,0,0,6,0,0,0,2,0,0,0,1],

[1,0,0,2,0,0,0,0,0,0,0,2,0,0,0,1],

[1,0,0,2,0,0,0,0,0,0,0,2,0,0,0,1],

[1,0,0,2,2,2,2,2,2,2,2,2,0,0,0,1],

[1,0,0,0,0,0,0,5,0,0,0,0,0,0,0,1],

[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],

[1,4,4,0,0,0,0,0,0,0,0,0,0,4,4,1],

[1,4,4,0,0,0,0,0,0,0,0,0,0,4,4,1],

[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],

[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],

[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],

[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

];





// =====================
// プレイヤー
// =====================

const player = {

    x:8,

    y:12

};





// =====================
// カメラ
// =====================

const camera = {

    x:0,

    y:0

};






// =====================
// 移動
// =====================

function move(dir){


    let nx = player.x;

    let ny = player.y;



    if(dir==="up")
        ny--;


    if(dir==="down")
        ny++;


    if(dir==="left")
        nx--;


    if(dir==="right")
        nx++;




    if(
        map[ny] &&
        map[ny][nx] !== 1 &&
        map[ny][nx] !== 4
    ){

        player.x = nx;

        player.y = ny;

    }

}





// =====================
// カメラ
// =====================

function updateCamera(){


    camera.x =
    player.x - Math.floor(VIEW_WIDTH/2);


    camera.y =
    player.y - Math.floor(VIEW_HEIGHT/2);



    if(camera.x < 0)
        camera.x = 0;


    if(camera.y < 0)
        camera.y = 0;


    if(camera.x > MAP_WIDTH-VIEW_WIDTH)
        camera.x = MAP_WIDTH-VIEW_WIDTH;


    if(camera.y > MAP_HEIGHT-VIEW_HEIGHT)
        camera.y = MAP_HEIGHT-VIEW_HEIGHT;

}





// =====================
// 操作
// =====================


document.addEventListener(
"keydown",
e=>{


    if(e.key==="ArrowUp")
        move("up");


    if(e.key==="ArrowDown")
        move("down");


    if(e.key==="ArrowLeft")
        move("left");


    if(e.key==="ArrowRight")
        move("right");

});





document.querySelectorAll("button")
.forEach(btn=>{


    btn.addEventListener(
    "click",
    ()=>{

        move(btn.dataset.dir);

    });


});







// =====================
// 描画
// =====================

function drawMap(){


    for(let y=0;y<VIEW_HEIGHT;y++){


        for(let x=0;x<VIEW_WIDTH;x++){



            const mx = x + camera.x;

            const my = y + camera.y;



            let tile = map[my][mx];



            if(tile===0)
                ctx.fillStyle="#4caf50";


            if(tile===1)
                ctx.fillStyle="#1b5e20";


            if(tile===2)
                ctx.fillStyle="#c8a165";


            if(tile===3)
                ctx.fillStyle="#2196f3";


            if(tile===4)
                ctx.fillStyle="#8d5524";


            if(tile===5)
                ctx.fillStyle="#eeeeee";


            if(tile===6)
                ctx.fillStyle="#00bcd4";



            ctx.fillRect(

                x*TILE_SIZE,

                y*TILE_SIZE,

                TILE_SIZE,

                TILE_SIZE

            );

        }

    }

}





function drawPlayer(){


    ctx.fillStyle="blue";


    ctx.fillRect(

        (player.x-camera.x)*TILE_SIZE,

        (player.y-camera.y)*TILE_SIZE,

        TILE_SIZE,

        TILE_SIZE

    );

}





function gameLoop(){


    updateCamera();


    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


    drawMap();

    drawPlayer();


    requestAnimationFrame(gameLoop);

}





gameLoop();
