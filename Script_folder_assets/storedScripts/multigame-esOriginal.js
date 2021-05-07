		//Multi jogo ES - Points game

	//Callback definition
	events.AddEvent('DoorOpen','Abierta');

	events.AddCallback('InPlay', onInPlay);
	events.AddCallback('ReelEnd', onReelEnd);

	events.AddCallback('GameEnd', onGameEnd);
	events.AddCallback('CashIn', onCashIn);
	events.AddCallback('CashOut', onCashOut);
	events.AddCallback('DoorClosed', onDoorClosed);
	events.AddCallback('HandpayAllowed', onHandpayAllowed);
	events.AddCallback('HandpayDone', onHandpayDone);

	events.AddCallback('EasyLinkEntered', onEasyLink);
	//events.AddCallback('EasyLinkReelEnd', onEasyLink);
	events.AddCallback('EasyLinkRemainingPlays', onEasyLinkPlay);

	events.AddCallback('FreeSpinsChoice', onFreeChoice);
	events.AddCallback('FreeSpinsPlayStart', onFreeStart);
	events.AddCallback('FreeSpinsTotal', onFreeEnd);
	events.AddCallback('PrizeWon', onPrizeWon);




	events.AddCallback('BasicGameBet', onBasicGameBet); //Bet, duration, WON: cash, points, credits, bank, reserve
	events.AddCallback('BasicGameRisk', onBasicGameRisk); //Points, Won: cash, points, Start: Credits, Bank, Reserve 

	events.AddCallback('DoorOpen', onDoorOpen); //Não existe?



	events.AddCallback('CommunicationErrorDetected', onCommunicationErrorDetected);
	events.AddCallback('CommunicationErrorResolved', onCommunicationErrorResolved);
	events.AddCallback('MachineStartup', onMachineStartup);

	events.AddCallback('ChangedGame', onChangedGame);
	
	events.AddCallback("InitBillAcceptor", onInitBillAcceptor);


	events.AddCallback('MachineBlocked', onMachineBlocked);

function onInitBillAcceptor()
{
	print('INIT TITO');
   machine.restartCashcode();
}


	//State Vars G - Configuration Vars
	var g_machineState = "unknown";
	var g_commError = true;
	var g_hwtype = "notLaptop";
	
	var g_games = ["catchthegoldslots", "underwhaterriches", "kingdomgems","racingo"];
	//var g_buttonPosPlay = [957,1177]; //Obter posições com "xdotool getmouselocation"
	var g_buttonPosPlay = [1851,1166]; //Obter posições com "xdotool getmouselocation"
	//var g_buttonPosCredit = [265,1171]; 
	//var g_buttonPosPoints = [387,1175]; 

	//Menus game positions 
	var g_buttonPosMenu = [1627, 2086];

	var g_menuCatchTheGold = [525, 1340, "catchthegoldslots"];//check
	var g_menuwhaterRiches = [1391, 1343, "underwhaterriches"];//check
	var g_menuKingdomGems = [513, 1766, "kingdomgems"];//check
	var g_menuRaceNGo = [1362, 1785, "racingo"];//check
	var arrayMenuGames = [];

	arrayMenuGames.push(g_menuCatchTheGold);
	arrayMenuGames.push(g_menuwhaterRiches);
	arrayMenuGames.push(g_menuKingdomGems);
	arrayMenuGames.push(g_menuRaceNGo);


	var g_buttonPosCredit = [466,1170]; 
	var g_buttonPosPoints = [727,1171]; 

	var g_rebootPointExchange = 0.3; //30% chance of reboot during conversion


	var g_PointSystem = true;
	var g_minBet = 50;
    var g_minPointBet = 20;
    var g_useTouch = false;
    var g_useBillAcceptor = false;

// State Var V - test runtime vars

	var v_credits = 0;
	var v_bank = 0;
	var v_reserve = 0;
	var v_hasFreeSpins = false;
	var v_hasBonus = false;
	var v_currentGame = "gallery";
	var v_rebooting = false;
	var v_startPlayRetry = 0;
	var v_credits = 0; //Try to sync this
	StartUp();

	//Helper Functions
	function StartUp()
	{
		print("Sart script");
	 machine.Config.Load();
	 g_machineState = "off";
	 RandomReboot();
	 machine.DoInput('p',1);
	 SwitchGame();
	}

	function InsertCredits()
	{
			print('keyboard in');
			machine.DoInput("3",1);
			machine.DoInput("8",1);
	}

//Para Ambiente de desenvolvimento:
//  Para o jogo voltar a arrancar automaticamente abrir o jogo com:
//  "while true; do ./run_me.sh; done"
//  Criar ficheiro "restart-game" na pasta do ausy_client para matar o jogo com estas 2 linhas:
//     #!/bin/bash
//     killall -9 GAME



	function DoReboot()
	{
		print('Going for Game Reboot');
	
		machine.RestartGame();

		v_rebooting = true;

	}

	function StartPlay()
	{
		machine.DoInput('space',1);
		/*
		machine.removeTimer('ChangedGame');
		
		v_startPlayRetry++;
		if(v_startPlayRetry == 4 && v_rebooting == false)
		{
			print('Failed to start game');
			v_startPlayRetry = 0;
			InsertCredits();
			return;
		}
		machine.setTimeout('playtimeout',2000,'StartPlay();');
		if(g_useTouch == true)
		{
			machine.DoTouch(g_buttonPosPlay[0],g_buttonPosPlay[1]);
		}
		else
		{
			machine.DoInput('space',1);

		}*/
	}

	function RandomReboot()
	{
		print("RandomReboot");
		//
		machine.SetTimeout("doRandomReboot", random()*10000+10000, "DoReboot()");
	}


	function StartPointConversion()
	{
		if(g_useTouch == true)
		{
			machine.DoTouch(g_buttonPosPoints[0],g_buttonPosPoints[1]);

		} else {
			machine.DoInput('F8',1);
		}
		if(g_rebootPointExchange > 0){
			if(random() < g_rebootPointExchange){		
				var randomTime= random()*1000+100;
				print('Points Reboot: '+randomTime);	
				machine.setTimeout('doReboot',random()*1000+100,'DoReboot();')

			}
		}
	}

	function SwitchGame(game)
	{

		if(typeof(game) == "undefined"){
			var newGame = Math.round(random()*(g_games.length-1));
			print('Random Game: '+ newGame);
			game =	g_games[newGame];
		}

		/*
		print('SwitchGame: '+ game);
		if(v_currentGame != "gallery"){
			machine.DoInput('p',1);
			machine.setTimeout('ChangedGame',random()*10000+5000,'SwitchGame("'+game+'");')
			print('rearm game select');
			return;
		}
*/
		//navegar para o jogo e carregar no play

		print("game: "+ game);
		var gameIndx = getGameIndex(game);

		print("GameIndex: "+ gameIndx);
		//var gameIndx = getGameIndex(game);

		if (v_currentGame != "gallery") {
			// statement
			//machine.setTimeout('clickGameMenu', 2000, 'machine.DoTouch(g_buttonPosMenu[0], g_buttonPosMenu[1]);');
				print("Menu clicado");
		}
		
		//machine.setTimeout('clickMenu', 2000, 'machine.DoTouch(arrayMenuGames[gameIndx][0], arrayMenuGames[gameIndx][1]);');
		//v_currentGame = game;
		machine.DoInput("space", 1);
		//Start play
		StartPlay();
		/*
		for(var i = 0;i <= game;++i) {
				machine.DoInput('Left',1);
			}
			machine.DoInput('space',1);
*/
			//
	}
	function StartFreeSpins()
	{
		machine.DoInput('space',1);
	}

	function getGameIndex(game){
		var indx;
		for(var i = 0;i < arrayMenuGames.length;++i) {
			if(game == arrayMenuGames[i][2]){
				indx = i;
			}
		}
		return indx;
	}


	//CallBacks
	function onMachineStartup()
	{
		if(v_rebooting == false && g_machineState !="off")
		{
			//Unplanned reboot ?
			print("Machine (self) rebooted!: "+g_machineState);
		}

		if(g_machineState == "unknown")
		{
			g_machineState = "startup";
		}
		v_rebooting = false;
		//RandomReboot();

	}


	//---------------Marcelo add-----------------


	function onMachineBlocked() {
		print("On machine blocked CALLED");
			//If machine suffered an reboot this callBack is called n close de door 
			machine.DoInput('d', 1);
		print("Ola eu sou o machine blocked!! apareci aqui porque alguem decidiu reiniciar a maquina!");
	}

	function onChangedGame(game){
		print("onChangedGame: "+ game+ "; credits: "+machine.credits); //This no working
		v_currentGame = game;
		StartPlay();
		

	}


	function onInPlay(){
		print("onInPlay");
		machine.removeTimer('playtimeout');
		v_startPlayRetry = 0;
		v_hasBonus = false;
		v_hasFreeSpins = false;
		g_machineState = "inGame";
	}

	function onReelEnd(){
		print("onReelEnd");
		//DoReboot();
	}

	function onGameEnd(credits)
	{
		print("onGameEnd: "+ credits);
		g_machineState = "idle";

		if(random() > 0.97) //97% chance to keep playing
		{
			print('points out');
			machine.DoTouch(g_buttonPosCredit[0], g_buttonPosCredit[1]);
			machine.setTimeout('postDCPlay', 1000, 'machine.DoInput("space",1);');


		} else if(credits< 50){
			print('credits needed');
			InsertCredits();
		}
		else
		{
			StartPlay();
		}

	}

	function onCommunicationErrorDetected(){
		print("onCommunicationErrorDetected");
		g_commError = true;
	}

	function onCommunicationErrorResolved()
	{
	    print('machine reconnected');
	    g_commError = false;
	    if(g_machineState == "startup") {
	    	g_machineState = "idle";
	    }

	    if(g_machineState == "idle") {
	    	InsertCredits();
	    }

	//    machine.setTimeout('postDCPlay', 5000, 'rechargeAndPlay()');
	}

	function onCashIn(){
		print("onCashIn");
		
		if(g_PointSystem == true){
			//Start conversion
			StartPointConversion();

		}

		if(v_currentGame == "gallery") {
			SwitchGame();
		}
		
	}

	function onCashOut(){
		print("onCashOut");
	}

	function onDoorClosed(){
		print("onDoorClosed");
		machine.InsertBill(3);
	}

	function onDoorOpen(){
		print("onDoorOpen");
		machine.doInput("d", 1);
	}

	function onBasicGameBet(bet, duration, auto1, auto2, won_cash, won_points, credits, bank, reserve){

		print("onBasicGameBet: "+bet+ "; "+duration+"; "+won_cash+"; "+"; "+won_points+"; "+credits+"; "+bank+"; "+"; "+reserve);
//			print(bet);
//			print(duration);
//			print(won_cash);
//			print(won_points);
//			print(credits);
//			print(bank);
//			print(reserve);
//<< [11:38:26]  onBasicGameBet: 300; 500; 0; ; 303; 680; 296; ; 0
	if(g_machineState != "idle")
		return;
		if((credits - bet ) >= g_minPointBet || (bank - bet ) >= g_minPointBet){
			print('continue conversion');
			machine.setTimeout('PointTimeout',1500,'StartPointConversion();');
		}
		else if(bank>0){
//			<< [13:25:04]  onBasicGameBet: 20; 500; 23; ; 0; 20; 691; ; 0

			print('waiting for residual cashout');
			//Wait for handpay
		} else {
			//Conversion done and no residual bank, move on
//	<< [11:39:51]  onBasicGameBet: 300; 500; 0; ; 299; 980; 0; ; 0

			print('done with points, start playing)');
			StartPlay();

		}
//			events.AddCallback('BasicGameBet', onBasicGameBet); //Bet, duration, WON: cash, points, credits, bank, reserve

	}

	function onBasicGameRisk(points, won_cash, won_points, start_credits, start_bank, start_reserve){  //Points, Won: cash, points, Start: Credits, Bank, Reserve
		print("onDoorBasicGameRisk: "+ points+"; "+ won_cash+"; "+ won_points+"; "+ start_credits+"; "+start_bank+"; "+start_reserve);
		//print(points);
		//print(won_cash);
		//print(won_points);
		//print(start_credits);
		//print(start_bank);
		//print(start_reserve);


	}

	function onHandpayAllowed()
	{
		machine.DoInput('h',1);
	}

	function onHandpayDone()
	{
		print("onHandpayDone: "+machine.credits); //this no working
			SwitchGame();
		
	}

	function onEasyLink()
	{
		
	 machine.setTimeout('postDCPlay', 5000, 'machine.DoInput("space",1);');
	 	     //machine.setTimeout('postRechargePlay', 5000, 'machine.DoInput("space", 1)');


	}
	function onEasyLinkPlay()
	{
		machine.DoInput('space',1);
	}

	
	function onFreeChoice()
	{
		machine.DoInput('space',1);
	}
		
	function onFreeStart()
	{
		machine.DoInput('space',1);
	}


		
	function onFreeEnd()
	{
		print('FreeSpinsEND');
	 		machine.setTimeout('FreeSpinsEND', 5000, 'machine.DoInput("space",1);');
	}

	function onPrizeWon(total, line, line2, symbol, value, freeSpins, bonus)
	{
		machine.removeTimer('FreeSpinsPlayStart');
		print('PrizeWon: '+ total+"; "+ line+"; "+symbol+"; "+ value+ "; "+freeSpins+"; "+bonus );
		if(freeSpins == "true"){
			print('FreeSpins Trigger');
	 		machine.setInterval('FreeSpinsPlayStart', 10000, 'StartFreeSpins();');

		}

	}
