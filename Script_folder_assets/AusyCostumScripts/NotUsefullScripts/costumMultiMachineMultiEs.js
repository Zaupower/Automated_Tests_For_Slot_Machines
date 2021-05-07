//Add funcionality to act as distributed or StandAlone
//CallBacks Declarations

events.AddCallback('MachineStartup', onMachineStartup);
events.AddCallback('MachineBlocked', onMachineBlocked);
events.AddCallback('ChangedGame', onChangedGame);


//variables 

//Test
var rebooted = false;
//
var g_machineState = "unknown";
var g_hwtype = "notLaptop";
var v_rebooting = false;
var imIonStartUpWithDoorClosed = false;
var v_currentGame = "undefined";
var v_currentGame = "gallery";
var g_games = ["catchthegoldslots", "whaterRiches", "racingo", "kingdomgms"];
//XY Screnn Buttons Position
/*Commnad line to get  Screnn pos(For quixant especify screen):
  Obter posições com "xdotool getmouselocation"*/
var g_buttonPosPlay = [1871, 2103];

var g_buttonPosCredit = [412, 2103];
var g_buttonPosPoints = [674, 2118];
//XY Screnn Buttons Position

//variables end



/*
Functions Start Here
*/

StartUp();

//Helper Functions
//Wrap in function to sign machines to work
function StartUp() {
    getMachines()[1].Config.Load();
    g_machineState = "off";
    RandomReboot();
    getMachines()[1].DoInput('p', 1);
    SwitchGame();
}

//Wrap in function to sign machines to work
//For loop to pass machine index
function RandomReboot() {

    //Este iff dve ser tirado para estado continuo
    if (!rebooted) {
        rebooted = true;
        getMachines()[1].setTimeout('doReboot', random() * 1000000 + 10000, 'DoReboot();')
    }

}

//Wrap in function to sign machines to work
//Receive machine index to perform reboot 
function DoReboot() {
    print('Going for Game Reboot');
    if (g_hwtype == "laptop") {
        getMachines()[1].RestartGame();
    }
    else {
        getMachines()[1].RebootMachine();
    }
    v_rebooting = true;
}

//Change from game in game menu
//Wrap in function to sign machines to work
function SwitchGame(game) {
    if (typeof (game) == "undefined") {
        print("Bateu no undifined");
        var newGame = Math.round(random() * (g_games.length - 1));
        print('Random Game: ' + newGame);
        game = g_games[newGame];
    }

    print('SwitchGame: ' + game);
    if (v_currentGame != "gallery") {
        print("veio ao for");
        getMachines()[1].DoInput('p', 1);
        getMachines()[1].setTimeout('ChangedGame', random() * 10000 + 5000, 'SwitchGame("' + game + '");')
        print('rearm game select');
        return;
    }
    //Get game index
    var gameIndex = 0
    while (g_games[gameIndex] != game) {
        gameIndex++;
    }
    for (var i = 0; i <= gameIndex; ++i) {
        print("veio ao for: game index: "+ gameIndex);
        getMachines()[1].DoInput('Left', 1);
    }
    //getMachines()[1].DoInput('space',1);
}

//CallBacks functions --------------------------------------------------------
function onMachineStartup() {
    imIonStartUpWithDoorClosed = true;
    if (v_rebooting == false && g_machineState != "off") {
        //Unplanned reboot ?
        print("Machine (self) rebooted!: " + g_machineState);
    }
    //print("Machine rebooted succesfully "+g_machineState);
    print("OnMachineStartup CallBack Called ");


    if (g_machineState == "unknown") {
        g_machineState = "startup";
    }

    v_rebooting = false;
    RandomReboot();
    SwitchGame();
}

function onMachineBlocked() {
    if (imIonStartUpWithDoorClosed) {
        //If machine suffered an reboot this callBack is called n close de door 
        getMachines()[1].DoInput('d', 1);
        imIonStartUpWithDoorClosed = false;
    }
    //print("Ola eu sou o machine blocked!! apareci aqui porque alguem decidiu reiniciar a maquina!");
}

function onChangedGame(game) {
    print("onChangedGame: " + game + "; credits: " + machine.credits); //This no working
    v_currentGame = game;
    //StartPlay();
}

function StartPlay() {
	machine.removeTimer('ChangedGame');

	v_startPlayRetry++;
	if (v_startPlayRetry == 4 && v_rebooting == false) {
		print('Failed to start game');
		v_startPlayRetry = 0;
		InsertCredits();
		return;
	}
	machine.setTimeout('playtimeout', 2000, 'StartPlay();');
	if (g_useTouch == true) {
		machine.DoTouch(g_buttonPosPlay[0], g_buttonPosPlay[1]);
	}
	else {
		machine.DoInput('space', 1);

	}
}