//Donne 
//falta adicionar callBacks ou events para identificar os premios do easy link


var machineID = 1;
events.AddCallback('EasyLinkEntered', onEasyLink);
//events.AddCallback('EasyLinkReelEnd', onEasyLink);
events.AddCallback('EasyLinkRemainingPlays', onEasyLinkPlay);

events.AddCallback('GameEnd', onGameEnd);
events.AddCallback('FreeSpinsChoice', onFreeChoice);
events.AddCallback('FreeSpinsPlayStart', onFreeStart);
events.AddCallback('FreeSpinsTotal', onFreeEnd);

startGame();

function onFreeChoice() {
    getMachines()[machineID].DoInput('space', 1);
}

function onFreeStart() {
    print("Entrou em freeSpins");
    getMachines()[machineID].DoInput('space', 1);
}



function onFreeEnd() {
    print('FreeSpinsEND');
    getMachines()[machineID].setTimeout('FreeSpinsEND', 5000, 'getMachines()[machineID].DoInput("space",1);');
    getMachines()[machineID].DoInput("space", 5);
}


var getMinor = false

function startGame() {

    getMachines()[machineID].DoInput('space', 1);
}

function onGameEnd() {
    getMachines()[machineID].DoInput('space', 1);
}
function onEasyLink() {

    getMachines()[machineID].DoInput('d', 1);

}
function onEasyLinkPlay() {
    getMachines()[machineID].DoInput('space', 1);
}

//Utilizar, DISPLAY=:0 xdotool getmouselocation , para obter as coordenadas na quixant
//-------------------Use touch to play-------------------------
var g_buttonPosPlay = [1847, 2099];
startGame();
function startGame() {
    getMachines()[1].DoTouch(g_buttonPosPlay[0], g_buttonPosPlay[1]);
}

function onGameEnd() {
    getMachines()[1].DoTouch(g_buttonPosPlay[0], g_buttonPosPlay[1]);
}
//-------------------Use touch to play-------------------------

//----------------------------------------------

var g_buttonPosPlay = [1847, 2099];
startGame();
function startGame() {
    print("entrou em gameStart");
    getMachines()[1].DoTouch(g_buttonPosPlay[0], g_buttonPosPlay[1]);
}

function onGameEnd() {
    print("Entrou em gameEnd");
    machine.DoTouch(g_buttonPosPlay[0], g_buttonPosPlay[1]);
print("DoTouch?");
}