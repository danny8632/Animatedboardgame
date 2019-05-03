var Canvas;
var ctx;


var randomquestion;
var array = Array();
var arr = []
var oldquestions = [];

var currentDiceSide = 0;
var isRoling = false;
var playersT = 1;
var disabledice = true;

var images = [
    {img: new Image(), src: "billeder/BoardGame.png"},
    {img: new Image(), src: "billeder/BlueStone.png", pos: 0},
    {img: new Image(), src: "billeder/greenStone.png", pos: 0},
    {img: new Image(), src: "billeder/redStone.png", pos: 0},
    {img: new Image(), src: "billeder/YellowStone.png", pos: 0},
]

var dice = [
    {img: new Image(), src: "billeder/dice1.png"},
    {img: new Image(), src: "billeder/dice2.png"},
    {img: new Image(), src: "billeder/dice3.png"},
    {img: new Image(), src: "billeder/dice4.png"},
    {img: new Image(), src: "billeder/dice5.png"},
    {img: new Image(), src: "billeder/dice6.png"}
]

var position = [
    [{x:25,y:455},{x:26,y:421},{x:86,y:420},{x:86,y:455}],
    [{x:25,y:378},{x:26,y:342},{x:86,y:340},{x:86,y:378}],
    [{x:25,y:298},{x:26,y:266},{x:86,y:263},{x:86,y:298}],
    [{x:25,y:220},{x:26,y:187},{x:86,y:185},{x:86,y:220}],
    [{x:25,y:141},{x:26,y:112},{x:86,y:109},{x:86,y:141}],
    [{x:25,y:64},{x:25,y:32},{x:83,y:30},{x:83,y:64}],
    [{x:128,y:64},{x:127,y:28},{x:187,y:29},{x:187,y:64}],
    [{x:225,y:62},{x:226,y:31},{x:284,y:30},{x:284,y:62}],
    [{x:326,y:29},{x:386,y:29},{x:327,y:61},{x:386,y:61}],
    [{x:421,y:27},{x:485,y:29},{x:426,y:66},{x:485,y:66}],
    [{x:528,y:31},{x:576,y:28},{x:579,y:62},{x:528,y:62}],
    [{x:525,y:108},{x:583,y:105},{x:528,y:138},{x:583,y:138}],
    [{x:529,y:187},{x:577,y:183},{x:528,y:215},{x:577,y:215}],
    [{x:524,y:265},{x:578,y:263},{x:529,y:297},{x:578,y:297}],
    [{x:526,y:343},{x:577,y:341},{x:530,y:372},{x:577,y:372}],
    [{x:529,y:423},{x:580,y:424},{x:532,y:454},{x:580,y:454}],
    [{x:426,y:421},{x:485,y:422},{x:434,y:453},{x:485,y:453}],
    [{x:329,y:420},{x:384,y:419},{x:333,y:456},{x:384,y:456}],
    [{x:227,y:420},{x:284,y:420},{x:234,y:452},{x:284,y:452}],
    [{x:136,y:420},{x:186,y:420},{x:130,y:456},{x:186,y:456}]
];


//---------------------//
//------Functions------//
//---------------------//

//  On Load
window.onload = function() {
    Canvas = document.getElementById("AwesomeCanvas");
    ctx = Canvas.getContext("2d");
    Canvas.addEventListener('click', on_canvas_click, false);

    //randomquestion = Math.floor(Math.random() * questions.length);

    array[0] = document.getElementById("btn1");
    array[1] = document.getElementById("btn2");
    array[3] = document.getElementById("btn3");
    array[2] = document.getElementById("btn4");

    images[0].img.onload = function() {
        ctx.drawImage(images[0].img, 0, 0);
        for (let i = 1; i < images.length; i++) {
            images[i].img.src = images[i].src;
            images[i].img.onload = function() {
                ctx.drawImage(images[playersT].img, 297 -27, 160 - 25);
                drawPlayer();
                drawQuestion();
            }
        }
    }
    images[0].img.src = images[0].src;

    for (let i = 0; i < dice.length; i++) {
        dice[i].img.src = dice[i].src;
    }

    writeQuestion();
};

async function genrandomQuestion() {
    var gotrand = false;

    while(!gotrand) {
        var p = Math.floor(Math.random() * questions.length);
        console.log("New Random question -> " + p);
        if(await findInArray(oldquestions, p) == -1) {
            console.log("Correct!!!! YEAS!!!!!")
            randomquestion = p;
            console.log("p: " + p + " random: " + randomquestion)
            gotrand = true;
            break;
        }
    }
    gotrand = false;
    writeQuestion();
}

async function findInArray(ar, val) {
    for (var i = 0,len = ar.length; i < len; i++) {
        if ( ar[i] === val ) { // strict equality test
            return i;
        }
    }
    console.log("return -1");
    return -1;
}


//  Question gen
async function writeQuestion() {
    if(oldquestions.length == 0) {
        randomquestion = Math.floor(Math.random() * questions.length);
    } else {
        //randomquestion = genrandomQuestion();
    }
    arr.length = 0;
    while(arr.length < 4){
        var r = Math.floor(Math.random()*4) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    drawQuestion();
    for (let z = 0; z < arr.length; z++) {
        array[z].textContent = questions[randomquestion][arr[z]];
        array[z].style.backgroundColor = "rgb(37, 153, 189)";
    }
}

//  anwser
function anw(x) {
    var btnnumber = 0;
    var btnani = setInterval(async() => {
        if(btnnumber > 3) {
            btnnumber = 0;
        }
        buttonani(btnnumber);
        btnnumber++;
    }, 190);

    setTimeout(async() => {
        clearInterval(btnani);
        await sleep(400);
        await checkbtnAwn(x);
    }, 2100);
}

async function buttonani(x) {
    array[x].style.backgroundColor = "rgb(255, 251, 0)";
    await sleep(250);
    array[x].style.backgroundColor = "rgb(37, 153, 189)";
}

async function checkbtnAwn(x) {
    console.log(x);
    var uanw = array[x].textContent;
    console.log(uanw);
    if(uanw == questions[randomquestion][1]) {
        array[x].style.backgroundColor = "rgb(123, 219, 13)";
        await sleep(50);
        disabledice = false;
        Destroction();
        drawPlayer();
        ctx.drawImage(dice[0].img, 240, 190);
    } else {
        array[x].style.backgroundColor = "rgb(223, 39, 39)";
        await sleep(1000);
        playersT++;
        Destroction();
        genrandomQuestion();
        drawPlayer();
    }
}

function drawQuestion() {
    ctx.font = "20px Arial";
    ctx.fillText(questions[randomquestion][0], 200, 230);
}

//  Get click on dice img
function on_canvas_click(ev) {
    var x = ev.clientX - Canvas.offsetLeft;
    var y = ev.clientY - Canvas.offsetTop;

    //Dice click
    if(!disabledice) {
        if(x > 240 && x < 360) {
            if(y > 190 && y < 302) {
                if(isRoling == false) {
                    isRoling = true;
                    roleDice();
                } else {
                    alert("roling");
                }
            }
        }
    }
}

//  Rolign the dice
function roleDice() {

    //  Intaval that calls the drawDice every 300 miliseconds
    var intaval = setInterval(async () =>{
        drawDice(Math.floor(Math.random() * 5));
    }, 100);

    //  Waits for 1500 miliseconds
    //  Stops the intaval
    //  Moves the player
    setTimeout(async () => {
        clearInterval(intaval); 
        if (playersT < 5){
            for (let i = 0; i < currentDiceSide +1; i++) {
                await movePlayer(playersT);
            }
            playersT++;
            if(playersT > 4) {
                playersT = 1;
            }
        }
        isRoling = false;
        disabledice = true;
        oldquestions[oldquestions.length] = randomquestion;
        Destroction();
        genrandomQuestion();
        drawPlayer();
    }, 1500);
}

//  Drawing dice 
async function drawDice(y) {
    currentDiceSide = y;
    ctx.drawImage(dice[y].img, 240, 190);
}

//  Draw Players(Exept the one with animation)
function drawPlayer(p) {
    for (let i = 1; i < images.length; i++) {
        if(p != i) {
            ctx.drawImage(images[i].img, (position[images[i].pos][i-1].x) -27, (position[images[i].pos][i-1].y) - 25);
        }
    }
}

//  Moves player
async function movePlayer(p) {
    var old = {x: 0, y: 0}
    var ani = {x: 0, y: 0}
    old.x = position[images[p].pos][p-1].x;
    old.y = position[images[p].pos][p-1].y;
    ani.x = old.x;
    ani.y = old.y;
    images[p].pos++;
    if(images[p].pos == 20) {
        images[p].pos = 0;
    }
    //  Creating the animation
    for (let i = 0; i < 60; i++) {
        if(old.x < position[images[p].pos][p-1].x) {
            ani.x = ani.x + ((position[images[p].pos][p-1].x) - old.x)/60;
        } else if(old.x > position[images[p].pos][p-1].x) {
            ani.x = ani.x - ( old.x - (position[images[p].pos][p-1].x))/60;
        }
        if(old.y < position[images[p].pos][p-1].y) {
            ani.y = ani.y + ((position[images[p].pos][p-1].y) - old.y)/60;
        } else if(old.y > position[images[p].pos][p-1].y) {
            ani.y = ani.y - (old.y - (position[images[p].pos][p-1].y))/60;
        }
        Destroction();
        ctx.drawImage(dice[currentDiceSide].img, 240, 190);
        ctx.drawImage(images[p].img, ani.x -27, ani.y - 25);
        drawPlayer(p);
        await sleep(1);
    }
    await sleep(150);
}

//  Clear and draw everything
async function Destroction() {
    ctx.clearRect(0,0, Canvas.width, Canvas.height);
    ctx.drawImage(images[0].img, 0, 0);
    ctx.drawImage(images[playersT].img, 297 -27, 160 - 25);
}

//  Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}