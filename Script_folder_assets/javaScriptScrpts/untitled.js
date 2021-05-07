events.AddEvent("easyLinkReel", "EasyLink - Reel End Symbols: (.*)");
events.AddEvent("easyLinkRemainPlays", "EasyLink - Remaining Plays (.*)");

events.AddCallback('GameEnd', onGameEnd);
events.AddCallback("easyLinkRemainPlays", onEasyLinkRemainPlays);
events.AddCallback("easyLinkReel", onEasyLinkReel);
//events.AddCallback('EasyLinkEntered', onEasyLink);
//events.AddCallback('EasyLinkRemainingPlays', onEasyLinkPlay);
//events.AddCallback('FreeSpinsChoice', onFreeChoice);
//events.AddCallback('FreeSpinsPlayStart', onFreeStart);
//events.AddCallback('FreeSpinsTotal', onFreeEnd);


var g_buttonPosPlay = [1871, 2103];
var g_buttonPosCredit = [412, 2103];
var g_buttonPosPoints = [674, 2118];

StartUp();

//Helper Functions
function StartUp()
{
//  machine.Config.Load();
//  g_machineState = "off";
//  RandomReboot();
 machine.DoInput('space',1);
}

function onGameEnd(credits)
{
    StartUp();
}

//Get easyLink plays remaning, if last calculae prizes won
function onEasyLinkRemainPlays(plays){
  print("Plays remain: "+plays+":Termina");
  machine.DoInput('space',1);
  if (plays === "0") {
    print("Entrou no if");
    CalculatePrizes();
  }
}









//detect easyLink play and set easyLink reel
function onEasyLinkReel(reel){
    print("EasyLink Reel Detected");
    easyLinkReel = reel;
    print(easyLinkReel);
}


//EasyLink prize identifier
function CalculatePrizes(){
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