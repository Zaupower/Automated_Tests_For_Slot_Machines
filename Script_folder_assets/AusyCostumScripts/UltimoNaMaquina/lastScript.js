//Event to detect bill inserted
var bills = [10, 20, 50 ]
var startedPlay = false;
var g_buttonPosPoints = [674, 2118];
var g_machineState = "cenas";
var v_rebooting = false;
var v_startPlayRetry = 0;
var g_useTouch = true;
var g_buttonPosPlay = [1871, 2103];
var g_buttonPosCredit = [412, 2103];
var lastKnowCredits = 0;

var g_minPointBet = 20;

events.AddEvent("InsertBill10", "\\[HWMEDIATOR\\]\\[INFO\\]: Bill 10in escrow");

events.AddCallback('BasicGameBet', onBasicGameBet); //Bet, duration, WON: cash, points, credits, bank, reserve
events.AddCallback('BasicGameRisk', onBasicGameRisk); //Points, Won: cash, points, Start: Credits, Bank, Reserve 
events.AddCallback('GameEnd', onGameEnd);
events.AddCallback("InsertBill10", ondetectBill);
events.AddCallback("HandpayAllowed", onHandpayAllowed);


Go();
function ondetectBill(){
  machine.doInput("space", 1);
    print("Bill detected");
}

function Go(){
  StartPlay();
}

function onGameEnd(credits) {

  lastKnowCredits = credits;
  print("onGameEnd: " + credits);
  g_machineState = "idle";

  if (random() > 0.97) //97% chance to keep playing
  {
    print('points out');
    machine.DoTouch(g_buttonPosCredit[0], g_buttonPosCredit[1]);
    machine.setTimeout('postDCPlayCostum', 1000, 'machine.DoInput("space",1);');

  } else if (credits < 50) {
    startedPlay = false;
    print('credits needed');
    InsertCredits();
  }
  else {
    StartPlay();
  }
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
        if((credits - bet ) >= g_minPointBet || (bank - bet ) >= g_minPointBet){
            print('continue conversion');
            machine.setTimeout('PointTimeout',1500,'StartPointConversion();');
        }
        else if(bank > 0){
//          << [13:25:04]  onBasicGameBet: 20; 500; 23; ; 0; 20; 691; ; 0

            print('waiting for residual cashout');
            machine.setTimeout('PointTimeout2',3000,'onBasicGameBet();');
            return;
            //Wait for handpay
        } else {
          if (!startedPlay) {
            print("Starting play");
            startedPlay = true;
            StartPlay();
          }
            //Conversion done and no residual bank, move on
//  << [11:39:51]  onBasicGameBet: 300; 500; 0; ; 299; 980; 0; ; 0

        print('done with points, start playing)');
              
        
    
//          events.AddCallback('BasicGameBet', onBasicGameBet); //Bet, duration, WON: cash, points, credits, bank, reserve
    }
    //function onBasicGameBet(){
    //print('done with points, start play call made without variables)');
      //     StartPlay();onHandpayAllowed

      print('Failed to start game '+v_startPlayRetry+" times");
      if (v_startPlayRetry == 4 && v_rebooting == false) {
        v_startPlayRetry = 0;
        startedPlay = false;
        InsertCredits();
        return;
      }
      var idTimer = machine.setTimeout('playtimeout', 3000, 'StartPlay();');

      if (g_useTouch == true) {
        machine.DoTouch(g_buttonPosPlay[0], g_buttonPosPlay[1]);
      }
      else {
        machine.DoInput('space', 1);
      }
  }


function InsertCredits(){

  machine.removeTimer('playtimeout');
  print('keyboard in');
  machine.setTimeout('creditsIN1', 1000, 'machine.DoInput("3",1)');
  machine.setTimeout('creditsIN2', 2000, 'machine.DoInput("8",1)');
}

function StartPointConversion()
  {
    print("start points conversion");
      machine.DoTouch(g_buttonPosPoints[0],g_buttonPosPoints[1]);

    //if(g_rebootPointExchange > 0){
    //  if(random() < g_rebootPointExchange){   
    //    var randomTime= random()*1000+100;
    //    print('Points Reboot: '+randomTime);  
    //    machine.setTimeout('doReboot',random()*1000+100,'DoReboot();')
//
//      }
//    }
         
  }

  function onHandpayAllowed(){
      machine.doInput("h", 1);
      //StartPlay();
  }