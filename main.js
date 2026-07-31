const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


canvas.width = 640;
canvas.height = 360;



const TILE_SIZE = 16;

const MAP_WIDTH = 40;
const MAP_HEIGHT = 22;



// マップ作成
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


// 道

for(let x = 5; x < 35; x++){

    map[11][x] = 2;

}



// プレイヤー

const player = {

    x:20,
    y:11

};



// キー入力

const keys = {};


document.addEventListener("keydown", e => {

    keys[e.key] = true;

});


document.addEventListener("keyup", e => {

    keys[e.key] = false;

});



// 移動

function movePlayer(){


    let nx = player.x;
    let ny = player.y;


    if(keys["ArrowUp"]){

        ny--;

    }

    if(keys["ArrowDown"]){

        ny++;

    }

    if(keys["ArrowLeft"]){

        nx--;

    }

    if(keys["ArrowRight"]){

        nx++;

    }



    if(
        map[ny] &&
        map[ny][nx] !== 1
    ){

        player.x = nx;
        player.y = ny;

    }

}




// マップ描画

function drawMap(){


    for(let y=0;y<MAP_HEIGHT;y++){


        for(let x=0;x<MAP_WIDTH;x++){


            if(map[y][x]===0){

                ctx.fillStyle="#4caf50";

            }

            else if(map[y][x]===1){

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



// プレイヤー描画

function drawPlayer(){


    ctx.fillStyle="blue";


    ctx.fillRect(

        player.x*TILE_SIZE,
        player.y*TILE_SIZE,

        TILE_SIZE,
        TILE_SIZE

    );

}



// ゲームループ

function gameLoop(){


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    movePlayer();


    drawMap();

    drawPlayer();


    requestAnimationFrame(gameLoop);

}



gameLoop();
