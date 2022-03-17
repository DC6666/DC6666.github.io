var isNewRndItem = false;
var Score=0;
var lastArry=new Array();
var historyscore1 = localStorage.getItem('maxScore1');
var btn_back=document.querySelector('.btn.get_back');
function getRandom(min,max) {
    num=min+Math.floor(Math.random()*(max-min+1));
    return num;
}
function newRanItem(){
    var newRadArr=[2,2,4];
    var newRannum=newRadArr[getRandom(0,2)];
    var emptyItems = document.querySelectorAll('.gameBody .row .emptyItem');
    var newRanSite=getRandom(0,emptyItems.length-1);
    emptyItems[newRanSite].innerHTML=newRannum;
    classNAME=emptyItems[newRanSite].className.replace('emptyItem','nonEmptyItem')
    emptyItems[newRanSite].className=classNAME;
}

 //刷新颜色
function refreshColor() {
    var items = document.querySelectorAll('.gameBody .item');
    for (var i = 0; i < items.length; i++) {
        switch (items[i].innerHTML) {
            case '':
                items[i].style.background='';
                break;
            case '2':
                items[i].style.background='rgb(250, 225, 188)';
                break;
            case '4':
                items[i].style.background='rgb(202, 240, 240)';
                break;
            case '8':
                items[i].style.background='rgb(117, 231, 193)';
                break;
            case '16':
                items[i].style.background='rgb(240, 132, 132)';
                break;
            case '32':
                items[i].style.background='rgb(181, 240, 181)';
                break;
            case '64':
                items[i].style.background='rgb(182, 210, 246)';
                break;
            case '128':
                items[i].style.background='rgb(255, 207, 126)';
                break;
            case '256':
                items[i].style.background='rgb(250, 216, 216)';
                break;
            case '512':
                items[i].style.background='rgb(124, 183, 231)';
                break;
            case '1024':
                items[i].style.background='rgb(225, 219, 215)';
                break;
            case '2048':
                items[i].style.background='rgb(221, 160, 221)';
                break;
            case '4096':
                items[i].style.background='rgb(250, 139, 176)';
                break;
        }
    }
}

document.onkeydown=function(e){
    var keyNum=e||window.e;
    lastarry();
    switch (keyNum.code) {
        case 'ArrowLeft':
            move('left');
            isNewRndItem=false;
            gameover();
            break;
        case 'ArrowUp':
            move('up');
            isNewRndItem=false;
            gameover();
            break;
        case 'ArrowRight':
            move('right');
            isNewRndItem=false;
            gameover();
            break;
        case 'ArrowDown':
            move('down');
            isNewRndItem=false;
            gameover();
            break;
    }
}
function getSideItem(currentItem,direction) {
    var currentItemX=currentItem.getAttribute('x')-0;
    var currentItemY=currentItem.getAttribute('y')-0;

    switch (direction) {
        case 'left':
            var sideItemX=currentItemX;
            var sideItemY=currentItemY-1;
            break;
        case 'right':
            var sideItemX=currentItemX;
            var sideItemY=currentItemY+1;
            break;
        case 'up':
            var sideItemX=currentItemX-1;
            var sideItemY=currentItemY;
            break;
        case 'down':
            var sideItemX=currentItemX+1;
            var sideItemY=currentItemY;
            break;
    }
    var sideItem=document.querySelector('.gameBody .row .x'+sideItemX+'y'+sideItemY);
    return sideItem
}

function itemMove(currentItem,direction) {
    var sideItem=getSideItem(currentItem,direction);
    if(sideItem==null){
    }else if(sideItem.innerHTML==''){
        sideItem.innerHTML=currentItem.innerHTML;
        currentItem.innerHTML='';
        sideItem.className=sideItem.className.replace('emptyItem','nonEmptyItem');
        currentItem.className=currentItem.className.replace('nonEmptyItem','emptyItem');
        itemMove(sideItem,direction);
        isNewRndItem = true;
    }else if(sideItem.innerHTML!=currentItem.innerHTML){
    }else{
        sideItem.innerHTML=sideItem.innerHTML*2;
        currentItem.className=currentItem.className.replace('nonEmptyItem','emptyItem');
        currentItem.innerHTML='';
        isNewRndItem = true;
        Score=Score+Number(sideItem.innerHTML)/2;
        document.querySelector('.SCORE .score').innerHTML=Score;

        if (historyscore1 == null||historyscore1==8560 || historyscore1 <  Score) {
            localStorage.setItem('maxScore1', Score);
            historyscore1 = Score;
            document.querySelector('.MaxScore .Mscore').innerHTML=historyscore1;
        }
    }

}


function move(direction) {
    var nonEmptyItems=document.querySelectorAll('.gameBody .row .nonEmptyItem');
    if(direction=='left'|| direction=='up'){
        for(var i=0;i<nonEmptyItems.length;i++){
            var currentItem=nonEmptyItems[i];
            itemMove(currentItem,direction);
        }
    }else if(direction=='right'||direction=='down'){
    for(var i=nonEmptyItems.length-1;i>=0;i--) {
        var currentItem=nonEmptyItems[i];
        itemMove(currentItem,direction);
    }
    }
    if(isNewRndItem){
    newRanItem();
    refreshColor();
    }
}


function init(){
    items=document.querySelectorAll('.gameBody .row .item');
    for(var i=0;i<items.length;i++){
        if(items[i].className.indexOf('nonEmptyItem')){
            items[i].classList.remove('nonEmptyItem');
            items[i].innerHTML='';
            items[i].classList.add('emptyItem');
        }

    }
    Score=0;
    document.querySelector('.SCORE .score').innerHTML=Score;
    document.querySelector('.MaxScore .Mscore').innerHTML=historyscore1;
    newRanItem();
    newRanItem();
    refreshColor();
}

function gameover_dispaly() {
    var box = document.querySelector('.gameOver');
    var close = document.querySelector('.over_X');
    var cancel = document.querySelector('.over_close');
    var again=document.querySelector('.over_again');
    box.style.display = 'block';
    document.body.classList.add('active');
    document.querySelector('.contain').style.opacity=0.5;
    box.addEventListener('click', function (e) {
        e.stopPropagation();    //阻止box事件冒泡，一旦冒泡，就会执行112行代码，使得box出现后又再次消失。
    });

    close.addEventListener('click', function () {
        box.style.display = 'none';
        document.querySelector('.contain').style.opacity=1;
        document.body.classList.remove('active');
        init();
    });
    cancel.addEventListener('click', function () {
        document.body.classList.remove('active');
        document.querySelector('.contain').style.opacity=1;

        box.style.display = 'none';


    });
    again.addEventListener('click', function () {
        box.style.display = 'none';
        document.body.classList.remove('active');
        document.querySelector('.contain').style.opacity=1;

        document.body.style.opacity=1;
        init();


    });
}

function gameover(){
    var GAMEOVER=false;
    var items=document.querySelectorAll('.gameBody .row .nonEmptyItem');
    if(items.length==16){
        GAMEOVER=true;
        for(var i=0;i<items.length;i++){
            var currentItem=items[i];
            var currentItemX=currentItem.getAttribute('x')-0;
            var currentItemY=currentItem.getAttribute('y')-0;
            if(currentItemX!=3){
                if(currentItem.innerHTML==getSideItem(currentItem,'down').innerHTML){
                    GAMEOVER=false;
                    break;
                }
            };
            if(currentItemY!=3){
                if(currentItem.innerHTML==getSideItem(currentItem,'right').innerHTML){
                    GAMEOVER=false;
                    break;
                }
            };
        }
    }
    if(GAMEOVER==true){ gameover_dispaly()};

}

function lastarry(){
    items=document.querySelectorAll('.gameOver .row .item');
    lastArry=[];
    var z=0;
    for(var x=0;x<4;x++) {
        for (var y = 0; y < 4; y++) {
            lastArry[z] = document.querySelector('.gameBody .row .x' + x + 'y' + y).innerHTML
             z = z + 1;
        }
    }
    return lastArry;
}
function get_back(){
    var z=0;
    var lass=lastArry;
    for(var x=0;x<4;x++){
        for(var y=0;y<4;y++){
            document.querySelector('.gameBody .row .x'+x+'y'+y).innerHTML=lass[z];
            document.querySelector('.gameBody .row .x'+x+'y'+y).classList.remove('emptyItem','nonEmptyItem');
            if(lastArry[z]==''){
                document.querySelector('.gameBody .row .x'+x+'y'+y).classList.add('emptyItem');
            }else{document.querySelector('.gameBody .row .x'+x+'y'+y).classList.add('nonEmptyItem');
            };
            z=z+1;
        }
    };
    refreshColor();
}
test=document.querySelectorAll('.gameBody .row .nonEmptyItem');
init();
