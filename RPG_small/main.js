let mapArray, ctx, currentImgMainX, currentImgMainY;
let imgMountain, imgMain, imgEnemy;

$(document).ready(function(){
    mapArray = [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 3, 0, 1, 0, 2];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "RPG_small/images_rabbit/rabbit_R.png";
    currentImgMainX = 0;
    currentImgMainY = 0;
    imgMain.onload = function(){
        ctx.drawImage(imgMain, 0, 0, 123, 200, currentImgMainX + 30, currentImgMainY, 123, 200);
        //            圖片物件  擷取圖片範圍   放置在canvas的座標                放進去的圖片大小            
    };

    imgMountain = new Image();
    imgMountain.src = "RPG_small/images/material.png";
    imgGrass = new Image();
    imgGrass.src = "RPG_small/images_rabbit/grass.png";
    imgWater = new Image();
    imgWater.src = "RPG_small/images_rabbit/water.png";
    imgMountain.onload = function(){
        imgWater.onload = function(){
            for(let x in mapArray){  // 放上物件
                if(mapArray[x] == 1){
                    ctx.drawImage(imgMountain, 32, 65, 32, 32, x%5*200, Math.floor(x/5)*200, 200, 200);
                }
                else if(mapArray[x] == 2){
                    ctx.drawImage(imgGrass, 0, 0, 200, 200, x%5*200, Math.floor(x/5)*200, 200, 200);
                }
                else if(mapArray[x] == 3){
                    ctx.drawImage(imgWater, 0, 0, 200, 200, x%5*200, Math.floor(x/5)*200, 200, 200);
                }
            }
        }
    };
});

$(document).keydown(function(event){
    let targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX;

    event.preventDefault();

    switch(event.originalEvent.code){
        case "ArrowLeft":
            targetImgMainX = currentImgMainX - 200;
            targetImgMainY = currentImgMainY;
            //cutImagePositionX = 175;  // 換轉向圖片
            imgMain.src = "RPG_small/images_rabbit/rabbit_L.png";
            break;
        case "ArrowUp":
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY - 200;
            //cutImagePositionX = 355;
            imgMain.src = "RPG_small/images_rabbit/rabbit_U.png";
            break;
        case "ArrowRight":
            targetImgMainX = currentImgMainX + 200;
            targetImgMainY = currentImgMainY;
            //cutImagePositionX = 540;
            imgMain.src = "RPG_small/images_rabbit/rabbit_R.png";
            break;
        case "ArrowDown":
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY + 200;
            //cutImagePositionX = 0;
            imgMain.src = "RPG_small/images_rabbit/rabbit_D.png";
            break;
        default:
            return;
    }

    if(targetImgMainX >= 0 && targetImgMainX <= 800 && targetImgMainY >= 0 && targetImgMainY <= 800){
        targetBlock = (targetImgMainX / 200) + ((targetImgMainY / 200) * 5);
    }
    else{
        targetBlock = -1;
    }
    // 清除        座標                             範圍
    ctx.clearRect(currentImgMainX, currentImgMainY, 200, 200);

    //console.log(event.code);
    //console.log(targetImgMainX);
    //console.log(targetImgMainY);
    //console.log(currentImgMainY / 200);
    //console.log(targetBlock);
    if(targetBlock == -1 || mapArray[targetBlock] == 1 || mapArray[targetBlock] == 3){
        ;
    }
    else{
        $("#talkBox").empty;
        currentImgMainX = targetImgMainX;
        currentImgMainY = targetImgMainY;
    }

    ctx.drawImage(imgMain, 0, 0, 123, 200, currentImgMainX + 30, currentImgMainY, 123, 200);

    switch(mapArray[targetBlock]){
        case undefined:
            $("#talkBox").text("兔兔；是邊界！");
            break;
        case 0:
            $("#talkBox").text("");
            break;
        case 1:
            $("#talkBox").text("兔兔：是竹筍山！");
            break;
        case 2:
            $("#talkBox").text("兔兔：牧草好ㄘ！");
            mapArray[24] = 4;
            break;
        case 3:
            $("#talkBox").text("兔兔：是可怕的水灘！");
            break;
        case 4:
            $("#talkBox").text("兔兔：牧草吃完了  QAQ");
            break;
    }
});