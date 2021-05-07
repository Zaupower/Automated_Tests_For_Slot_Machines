
//Points Conversion
events.AddCallback('BasicGameBet', onBasicGameBet); //Bet, duration, WON: cash, points, credits, bank, reserve
events.AddCallback('BasicGameRisk', onBasicGameRisk); //Points, Won: cash, points, Start: Credits, Bank, Reserve 

//CashIn n CashOut
events.AddCallback('CashIn', onCashIn);

var g_buttonPosPoints = [674, 2118];
var g_machineState = "idle"
var g_minPointBet = 20;
var g_useTouch = true;

InsertCredits()
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
   
      machine.DoInput('F8',1);
  }

  //CashIn n CashOut
function onCashIn()
{
    StartPointConversion();
     machine.setTimeout('cenas',4000,'InsertCredits();');
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
      machine.setTimeout('creditsIN1',1000,'machine.DoInput("7",1)');
      machine.setTimeout('creditsIN2',2000,'machine.DoInput("8",1)');
    //}

  }