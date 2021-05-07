//StartPlay script

var v_startPlayRetry;
var v_rebooting = false;
var g_useTouch = true;
g_buttonPosPlay=[1871, 2103];

function StartPlay() {
    
    machine.removeTimer('ChangedGame');
	
    v_startPlayRetry++;
    if(v_startPlayRetry == 4 && v_rebooting == false)
    {
        print('Failed to start game');
        v_startPlayRetry = 0;
        InsertCredits();
        return;
    }
    machine.setTimeout('playtimeout',2000,'StartPlay()');
    if(g_useTouch == true)
    {
        print("Go for play with touch")
        machine.DoTouch(g_buttonPosPlay[0],g_buttonPosPlay[1]);
    }
    else
    {
        print("Go for play with keyboard");
        machine.DoInput('space',1);

    }
}

function InsertCredits(){
    print("Inserting Credits");
    machine.setTimeout('creditsIN1', 1000, 'machine.DoInput("3",1)');
    machine.setTimeout('creditsIN2', 2000, 'machine.DoInput("8",1)');
}

function onCashIn(){
    print("onCashIn");
    print("OnCashInReady to start");
    //if(g_PointSystem == true){
      //  //Start conversion
        //StartPointConversion();

    //}

   // if(v_currentGame == "gallery") {
     //   SwitchGame();
    //}
    
}