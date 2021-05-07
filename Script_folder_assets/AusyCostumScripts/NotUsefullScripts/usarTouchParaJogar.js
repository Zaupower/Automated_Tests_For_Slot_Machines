events.AddCallback('GameEnd', onGameEnd);

//Utilizar, DISPLAY=:0 xdotool getmouselocation , para obter as coordenadas na quixant

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