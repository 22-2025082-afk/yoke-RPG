const TILE_SIZE = 16;

const MAP_WIDTH = 50;
const MAP_HEIGHT = 50;


const mapData = [];


for(let y = 0; y < MAP_HEIGHT; y++){

    mapData[y] = [];

    for(let x = 0; x < MAP_WIDTH; x++){

        if(
            x === 0 ||
            y === 0 ||
            x === MAP_WIDTH - 1 ||
            y === MAP_HEIGHT - 1
        ){
            mapData[y][x] = 1;
        }
        else{
            mapData[y][x] = 0;
        }
    }
}


// 仮の道
for(let x = 5; x < 45; x++){
    mapData[25][x] = 2;
}



function drawMap(ctx){

    for(let y = 0; y < MAP_HEIGHT; y++){

        for(let x = 0; x < MAP_WIDTH; x++){

            const tile = mapData[y][x];


            if(tile === 0){
                ctx.fillStyle = "#4caf50";
            }

            else if(tile === 1){
                ctx.fillStyle = "#1b5e20";
            }

            else if(tile === 2){
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
