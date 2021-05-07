/*
Script Logic 
  StartUp - Click on menu button-> If goes to game start play ELSE choose random game then start play
  Script functionalities
    * EASYLINK detect start, play's normal and save reel values updating it's vlaue till the last easyLink play,
        at the end calculates won prizes, displaying them on Ausy web interface console output.

    * FREESPINS plays normal(no calculating functions added till now...).

    * CREDITStoPOINTS after add credits start point conversion then starts StartUp

    * MENUS going to games menu thrigger onChangedGame then choose a random game to play

    *RANDOMREBOOT at random time reboot machine, thrigered at StartUp, when machine reboots thrigger again

*/
  //Get reel values 
  events.AddEvent("easyLinkReel", "EasyLink - Reel End Symbols: (.*)");
  //Get easyLink remaining plays
  events.AddEvent("easyLinkRemainPlays", "EasyLink - Remaining Plays (.*)");
  //Catch easyLink startUp and math prizes
  events.AddEvent("easyLinkStartUpMathPrice", "EasyLink - MathPrize:(.*)");
  
  //------------FREE SPINS--------------------------------
  
  events.AddEvent("gameStartSpins", "EasyLink - MathPrize:(.*)");
  
  
  events.AddCallback('GameEnd', onGameEnd);
  
  //EasyLink
  events.AddCallback("easyLinkRemainPlays", onEasyLinkRemainPlays);
  events.AddCallback("easyLinkReel", onEasyLinkReel);
  events.AddCallback("easyLinkStartUpMathPrice", onEasyLinkStartUpMathPrice);
  
  //Free Spinns
  events.AddCallback('FreeSpinsChoice', onFreeChoice);
  events.AddCallback('FreeSpinsPlayStart', onFreeStart);
  events.AddCallback('FreeSpinsTotal', onFreeEnd);
  events.AddCallback('PrizeWon', onPrizeWon);
  
  //Get Menu, Games changed state
  events.AddCallback('ChangedGame', onChangedGame);
  
  events.AddCallback('MachineBlocked', onMachineBlocked);
  
  //CommunicationError callbacks to identify internet errors
  events.AddCallback('CommunicationErrorDetected', onCommunicationErrorDetected);
  events.AddCallback('CommunicationErrorResolved', onCommunicationErrorResolved);
  
  //Machine startup after reboot
  events.AddCallback('MachineStartup', onMachineStartup);
  
  //In play
  events.AddCallback('InPlay', onInPlay);
  
  //Points Conversion
  events.AddCallback('BasicGameBet', onBasicGameBet); //Bet, duration, WON: cash, points, credits, bank, reserve
  events.AddCallback('BasicGameRisk', onBasicGameRisk); //Points, Won: cash, points, Start: Credits, Bank, Reserve 
  var g_rebootPointExchange = 0.3; //30% chance of reboot during conversion
  
  //CashIn n CashOut
  events.AddCallback('CashIn', onCashIn);
  events.AddCallback('CashOut', onCashOut);
  events.AddCallback("InitBillAcceptor", onInitBillAcceptor);
  
  //Current game
  var v_currentGame = "undefined";
  
  //Button touch coordinates
  var g_buttonPosPlay = [1871, 2103];
  var g_buttonPosCredit = [412, 2103];
  var g_buttonPosPoints = [674, 2118];
  
  //Prizes values and names
  var miniPrize = ["221","mini"];
  var minorPrize = ["222", "minor"];
  var majorPrize = ["223", "major"];
  var grandPrize = ["224", "grand"];
  
  var arrayPrizes=[];
  
  arrayPrizes.push(miniPrize);
  arrayPrizes.push(minorPrize);
  arrayPrizes.push(majorPrize);
  arrayPrizes.push(grandPrize);
  
  //guarda os valores tirados no EasyLink(é actualizado até a ultima jogada)
  var easyLinkReel;
  
  //Game buttons position
  var g_buttonPosMenu = [1627, 2086];
  var g_menuCatchTheGold = [525, 1340];
  var g_menuWhaterRiches = [1391, 1343];
  var g_menuKingdomGems = [513, 1766];
  var g_menuRacinGo = [1362, 1785];
  
  var arrayMenuGames = [];
  
  arrayMenuGames.push(g_menuCatchTheGold);
  arrayMenuGames.push(g_menuWhaterRiches);
  arrayMenuGames.push(g_menuKingdomGems);
  arrayMenuGames.push(g_menuRacinGo);
  
  var g_games = ["CatchTheGold", "WhaterRiches", "KingdomGems", "RacinGo"];
  //Reference to g_games array
  var current_game_index = -1;
  
  
  //If machine as been rebooted, remove if to continuos reboot state
  var rebooted = false;
  
  //Machine type, if in laptop change to "laptop"
  var g_hwtype = "qx";
  
  //State Vars G - Configuration Vars
  var g_machineState = "unknown";
  var g_commError = true;
  var v_rebooting = false;
  var imIonStartUpWithDoorClosed = false;
  var v_startPlayRetry = 0;
  var g_useTouch = true;
  var g_PointSystem = true;
  var g_minPointBet = 20;
  
  
  function onInitBillAcceptor()
  {
    print('INIT TITO');
     machine.restartCashcode();
  }
  
  
  
  //Start script
  StartUp();
  
  //Helper Functions
  function StartUp()
  {
  //  machine.Config.Load();
    g_machineState = "off";
    RandomReboot();
    machine.DoInput('p',1);
  }
  
  function onGameEnd(credits)
  {
    g_machineState = "idle";
     
      if(random() > 0.97) //97% chance to keep playing
      {
        print('points out');
        machine.DoTouch(g_buttonPosCredit[0], g_buttonPosCredit[1]);
        machine.setTimeout('postDCPlay', 1000, 'machine.DoInput("space",1);');
  
      } else if(credits< 50){
        print('credits needed');
        //InsertCredits();
      }
      else
      {
        StartPlay();
      }
  }
  
  
  
  //----------------------------------------------------EASYLINK----------------------------------------------------
  
  //Detect easy link startup 
  function onEasyLinkStartUpMathPrice(mathPrize)
  {
    print("MathPrize: "+ mathPrize);
    machine.setTimeout('startEasyLink',2500,'machine.DoInput("space",1)');
  }
  
  //Get easyLink plays remaning, if last calculae prizes won
  function onEasyLinkRemainPlays(plays)
  {
    print("Plays remain: "+plays+":Termina");
    machine.DoInput('space',1);
    if (plays === "0") {
      print("Entrou no if");
      CalculatePrizes();
    }
  }
  
  //detect easyLink play and set easyLink reel
  function onEasyLinkReel(reel)
  {
      print("EasyLink Reel Detected");
      easyLinkReel = reel;
      print(easyLinkReel);
  }
  
  //EasyLink prize identifier
  function CalculatePrizes()
  {
    print("Calcuate easyLink Reel");
    easyLinkReel = easyLinkReel.replace(/[\[\]']+/g,'');
    //parse string to string[]
    var res = easyLinkReel.split(",");
    for(var i = 0; i<res.length; i++){
      for(var j = 0; j<arrayPrizes.length;j++){
        if (res[i] ===  arrayPrizes[j][0]) {
          print("Prize detected!!");
          print("Prize: "+ arrayPrizes[j][1]);
        }
      }
    }
  }
  
  //----------------------------------------------------FREESPINS----------------------------------------------------
  
  function StartFreeSpins()
    {
      machine.DoInput('space',1);
    }
  
  function onFreeEnd()
    {
      print('FreeSpinsEND');
      machine.setTimeout('FreeSpinsEND', 5000, 'machine.DoInput("space",1)');
    }
  
  function onPrizeWon(total, line,  symbol, value, freeSpins, bonus)
    {
      machine.removeTimer('FreeSpinsPlayStart');
      print('PrizeWon: '+ total+"; "+ line+"; "+symbol+"; "+ value+ "; "+freeSpins+"; "+bonus );
      if(bonus === "true"){
        print('FreeSpins Trigger');
        machine.setTimeout('FreeSpinsPlayStart', 20000, 'StartFreeSpins();');
        machine.setTimeout('FreeSpinsPlayStart2', 15000, 'machine.DoInput("space",1)');
      }
  
    }
  
    function onFreeStart()
    {
      print("onFreeStart");
      machine.DoInput('space',1);
    }
    function onFreeChoice()
    {
      print("onFreeChoice");
      machine.DoInput('space',1);
    }
  
    //----------------------------------------------------MENU GAMES----------------------------------------------------
    function onChangedGame(game)
    {
      print("onChangedGame: " + game + "; credits: " + machine.credits); //This no working
      v_currentGame = game;
      if (v_currentGame === "gallery") {
        SwitchGame();
        // statement
      }else {
        //COMECAR A JOGAR AQUI
      StartPlay();
      }
    }
  
    //Change from game in game menu
    //Wrap in function to sign machines to work
    function SwitchGame(game)
    {
      print("On SwitchGame");
      if (typeof (game) == "undefined") {
          print("Bateu no undifined");
          var newGame = Math.round(random() * (g_games.length - 1));
          print('Random Game: ' + newGame);
          current_game_index = newGame;
          game = g_games[newGame];
          print("NEw game: "+game);
          if (current_game_index != -1) {
            machine.setTimeout('clickGameMenu', 800, 'machine.DoTouch(arrayMenuGames[current_game_index][0], arrayMenuGames[current_game_index][1]);');
          }else {
            print("Error definning game index, clicking menu button");
            machine.DoInput('p',1);
          }
      }
    }
  
    //---------------------------Start Play------------------------------------
  
  function StartPlay()
  {
      print("Start play called");
      //machine.removeTimer('ChangedGame');
      
      v_startPlayRetry++;
      if(v_startPlayRetry == 4 && v_rebooting == false)
      {
        g_machineState = "idle";
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
  
      }
  }
  
  function onInPlay()
  {
      print("onInPlay");
      machine.removeTimer('playtimeout');
      v_startPlayRetry = 0;
      v_hasBonus = false;
      v_hasFreeSpins = false;
      g_machineState = "inGame";
  }
  
  
  //---------------------------------------Random Reboots----------------------------------------------------------
  
  //Wrap in function to sign machines to work
  //For loop to pass machine index
  function RandomReboot() {
  
      //Este iff dve ser tirado para estado continuo
      //if (!rebooted) {
      //    rebooted = true;
          getMachines()[1].setTimeout('doReboot', random() * 1000000+ 10000, 'DoReboot();')
      //}
  
  }
  
  //Wrap in function to sign machines to work
  //Receive machine index to perform reboot 
  function DoReboot()
  {
      print('Going for Game Reboot');
      if (g_hwtype == "laptop") {
        machine.RestartGame();
      }
      else {
        machine.RestartGame();
        //machine.RebootMachine(); //not working
      }
      v_rebooting = true;
      imIonStartUpWithDoorClosed = true;
  }
  
  //Unblock machine after reboot
  function onMachineBlocked()
  {
      if (imIonStartUpWithDoorClosed) {
          //If machine suffered an reboot this callBack is called n close de door 
          getMachines()[1].DoInput('d', 1);
          imIonStartUpWithDoorClosed = false;
      }
      print("Ola eu sou o machine blocked!! apareci aqui porque alguem decidiu reiniciar a maquina!");
      print("Calling StartUp");
      StartUp();
  }
  
  
  
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
      RandomReboot();
  }
  
  //-----------------------------------------------Communication Error---------------------------------------------
  function onCommunicationErrorDetected()
  {
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
  }
  
  //----------------------------------------------------
  function onBasicGameBet(bet, duration, auto1, auto2, won_cash, won_points, credits, bank, reserve){
  
      print("Machine state: "+g_machineState)
      print("onBasicGameBet: "+bet+ "; "+duration+"; "+won_cash+"; "+"; "+won_points+"; "+credits+"; "+bank+"; "+"; "+reserve);
  //      print(bet);
  //      print(duration);
  //      print(won_cash);
  //      print(won_points);
  //      print(credits);
  //      print(bank);
  //      print(reserve);
    //<< [11:38:26]  onBasicGameBet: 300; 500; 0; ; 303; 680; 296; ; 0
      if(g_machineState != "idle"){
        print("Bateu no idle");
        return;
      }
      
      if((credits - bet ) >= g_minPointBet 
        || (bank - bet ) >= g_minPointBet){
          print('continue conversion');
          machine.setTimeout('PointTimeout',1500,'StartPointConversion();');
      }
      else if(bank>0){
    //      << [13:25:04]  onBasicGameBet: 20; 500; 23; ; 0; 20; 691; ; 0
          print('waiting for residual cashout');
          //Wait for handpay
      } 
      else 
      {
          //Conversion done and no residual bank, move on
    //  << [11:39:51]  onBasicGameBet: 300; 500; 0; ; 299; 980; 0; ; 0
  
          print('done with points, start playing)');
          StartPlay();
      }
    //      events.AddCallback('BasicGameBet', onBasicGameBet); //Bet, duration, WON: cash, points, credits, bank, reserve
  
    }
  
  function onBasicGameRisk(points, won_cash, won_points, start_credits, start_bank, start_reserve)
  {  //Points, Won: cash, points, Start: Credits, Bank, Reserve
    print("onDoorBasicGameRisk: "+ points+"; "+ won_cash+"; "+ won_points+"; "+ start_credits+"; "+start_bank+"; "+start_reserve);
      //print(points);
      //print(won_cash);
      //print(won_points);
      //print(start_credits);
      //print(start_bank);
      //print(start_reserve);
  }
  
  //Start pints converison to credits
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
          machine.setTimeout('doRebootOnPointConversion',random()*1000+100,'DoReboot();')
  
        }
      }
    }
  
    //CashIn n CashOut
  function onCashIn()
  {
    print("onCashIn");    
    if(g_PointSystem == true){
        //Start conversion
      StartPointConversion();
    }
    if(v_currentGame == "gallery") {
      SwitchGame();
    }
  }
  
  function onCashOut()
  {
    print("onCashOut");
  }
  
  //InsertCredits
  function InsertCredits()
    {
      //if(g_useBillAcceptor == true){
        //print('bill in');
        //machine.setTimeout('creditsIN',1000,'machine.InsertBill(3)');
      //}
      //else
      //{
        print('keyboard in');
        machine.setTimeout('creditsIN1',1000,'machine.DoInput("3",1)');
        machine.setTimeout('creditsIN2',2000,'machine.DoInput("8",1)');
      //}
  
    }