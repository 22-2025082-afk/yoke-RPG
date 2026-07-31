const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


canvas.width = 320;
canvas.height = 192;



const TILE_SIZE = 16;


// 表示範囲
const VIEW_WIDTH = 20;
const VIEW_HEIGHT = 12;



// マップサイズ
const MAP_WIDTH = 60;
const MAP_HEIGHT = 60;



// =====================
// マップ作成
// =====================

const map = [];


for(let y = 0; y < MAP_HEIGHT; y++){

    map[y] = [];


    for(let x = 0; x < MAP_WIDTH; x++){


        if(
            x === 0 ||
            y === 0 ||
            x === MAP_WIDTH - 1 ||
            y === MAP_HEIGHT - 1
        ){

            map[y][x] = 1;

        }

        else{

            map[y][x] = 0;

        }

    }

}



// 道を作る

for(let x = 10; x < 50; x++){

    map[30][x] = 2;

}






// =====================
// プレイヤー
// =====================

const player = {

    x:30,

    y:30

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



    if(dir === "up")
        ny--;


    if(dir === "down")
        ny++;


    if(dir === "left")
        nx--;


    if(dir === "right")
        nx++;




    if(
        map[ny] &&
        map[ny][nx] !== 1
    ){

        player.x = nx;

        player.y = ny;

    }

}





// =====================
// カメラ更新
// =====================


function updateCamera(){


    camera.x =
        player.x - Math.floor(VIEW_WIDTH / 2);


    camera.y =
        player.y - Math.floor(VIEW_HEIGHT / 2);



    // 左上制限

    if(camera.x < 0)
        camera.x = 0;


    if(camera.y < 0)
        camera.y = 0;



    // 右下制限

    if(camera.x > MAP_WIDTH - VIEW_WIDTH)
        camera.x = MAP_WIDTH - VIEW_WIDTH;


    if(camera.y > MAP_HEIGHT - VIEW_HEIGHT)
        camera.y = MAP_HEIGHT - VIEW_HEIGHT;

}







// =====================
// キーボード
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






// =====================
// タップ操作
// =====================


document.querySelectorAll("button")
.forEach(btn=>{


    btn.addEventListener(
    "touchstart",
    ()=>{

        move(btn.dataset.dir);

    });


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


    for(let y=0; y<VIEW_HEIGHT; y++){


        for(let x=0; x<VIEW_WIDTH; x++){



            const mapX =
            x + camera.x;


            const mapY =
            y + camera.y;



            if(map[mapY][mapX] === 0){

                ctx.fillStyle="#4caf50";

            }

            else if(map[mapY][mapX] === 1){

                ctx.fillStyle="#1b5e20";

            }

            else{

                ctx.fillStyle="#c8a165";

            }




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

        Math.floor(VIEW_WIDTH/2) * TILE_SIZE,

        Math.floor(VIEW_HEIGHT/2) * TILE_SIZE,

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
