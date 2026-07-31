const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


canvas.width = 640;
canvas.height = 360;



const TILE_SIZE = 16;


const MAP_WIDTH = 40;
const MAP_HEIGHT = 22;



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



// 真ん中の道

for(let x = 5; x < 35; x++){

    map[11][x] = 2;

}




function drawMap(){


    for(let y = 0; y < MAP_HEIGHT; y++){

        for(let x = 0; x < MAP_WIDTH; x++){


            if(map[y][x] === 0){

                ctx.fillStyle = "#4caf50";

            }

            else if(map[y][x] === 1){

                ctx.fillStyle = "#1b5e20";

            }

            else if(map[y][x] === 2){

                ctx.fillStyle = "#c8a165";

            }


            ctx.fillRect(
                x * TILE_SIZE,
                y * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
            );

        }

    }

}



drawMap();

// プレイヤー

const player = {

    x: 20,
    y: 11

};


function drawPlayer(){

    ctx.fillStyle = "blue";


    ctx.fillRect(

        player.x * TILE_SIZE,
        player.y * TILE_SIZE,

        TILE_SIZE,
        TILE_SIZE

    );

}


drawPlayer();
