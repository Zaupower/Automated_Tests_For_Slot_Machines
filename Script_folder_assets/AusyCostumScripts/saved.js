events.AddCallback('CashIn', onCashIn);
events.AddCallback('BasicGameBet', onBasicGameBet); //Bet, duration, WON: cash, points, credits, bank, reserve
events.AddCallback('BasicGameRisk', onBasicGameRisk); //Points, Won: cash, points, Start: Credits, Bank, Reserve 



var v_startPlayRetry = 0;
var v_rebooting = false;
var g_useTouch = true;
var g_buttonPosPlay=[1871, 2103];
var g_PointSystem = true;
var g_buttonPosPoints = [674, 2118];

//Vars 2.0
var g_PointSystem = true;
    var g_minBet = 50;
    var g_minPointBet = 20;
    var g_useTouch = true;
    var g_useBillAcceptor = false;
var g_machineState = "notIdle";


StartPlay();

function StartPlay() {
    
    machine.removeTimer('ChangedGame: StartPlay: '+v_startPlayRetry);
	
    v_startPlayRetry++;
    if(v_startPlayRetry > 3 && v_rebooting == false)
    {
        print('Failed to start game');
        v_startPlayRetry = 0;
        InsertCredits();
        return;
    }
    machine.setTimeout('playtimeout',2000,'StartPlay()');
    if(g_useTouch == true)
    {
        print("Go for play with touch :"+v_startPlayRetry)
        machine.DoTouch(g_buttonPosPlay[0],g_buttonPosPlay[1]);
    }
    else

    {
        print("Go for play with keyboard");
        machine.DoInput('space',1);

    }
}

function InsertCredits(){
	machine.removeTimer('playtimeout');
    print("Inserting Credits");
    machine.setTimeout('creditsIN1', 1000, 'machine.DoInput("4",1)');
    machine.setTimeout('creditsIN2', 2000, 'machine.DoInput("8",1)');
}

function onCashIn(){
    print("onCashIn");
    print("OnCashInReady to start");

    if(g_PointSystem == true){
        //Start conversion
        StartPointConversion();
    }

   // if(v_currentGame == "gallery") {
     //   SwitchGame();
    //}
}

 function StartPointConversion()
	{
		if(g_useTouch == true)
		{
			machine.DoTouch(g_buttonPosPoints[0],g_buttonPosPoints[1]);

		} else {
			machine.DoInput('F8',1);
		}
		//if(g_rebootPointExchange > 0){
		//	if(random() < g_rebootPointExchange){		
		//		var randomTime= random()*1000+100;
		//		print('Points Reboot: '+randomTime);	
		//		machine.setTimeout('doReboot',random()*1000+100,'DoReboot();')
//
//			}
//		}
         
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

function onBasicGameBet(bet, duration, auto1, auto2, won_cash, won_points, credits, bank, reserve){

    print("onBasicGameBet: "+bet+ "; "+duration+"; "+won_cash+"; "+"; "+won_points+"; "+credits+"; "+bank+"; "+"; "+reserve);
//          print(bet);
//          print(duration);
//          print(won_cash);
//          print(won_points);
//          print(credits);
//          print(bank);
//          print(reserve);
//<< [11:38:26]  onBasicGameBet: 300; 500; 0; ; 303; 680; 296; ; 0
    if(g_machineState != "idle")
        return;
        if((credits - bet ) >= g_minPointBet || (bank - bet ) >= g_minPointBet){
            print('continue conversion');
            machine.setTimeout('PointTimeout',1500,'StartPointConversion();');
        }
        else if(bank>0){
//          << [13:25:04]  onBasicGameBet: 20; 500; 23; ; 0; 20; 691; ; 0

            print('waiting for residual cashout');
            //Wait for handpay
        } else {
            //Conversion done and no residual bank, move on
//  << [11:39:51]  onBasicGameBet: 300; 500; 0; ; 299; 980; 0; ; 0

            print('done with points, start playing)');
            StartPlay();

        }
//          events.AddCallback('BasicGameBet', onBasicGameBet); //Bet, duration, WON: cash, points, credits, bank, reserve

    }