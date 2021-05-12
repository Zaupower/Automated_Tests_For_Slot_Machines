//events.AddEvent('fullReel', "(\\[\\d+.*\\]\\[\\d+.*\\]\\[\\d+.*).*");
events.AddEvent('fullReel', "(\\[\\d.*,\\d.*,\\d.*,\\d.*,\\d.*,\\d.*,\\d.*,.*)");
events.AddEvent('modeOne', "Mode 1");
events.AddEvent('mathDetector', "math version(.*?),");


events.AddCallback('modeOne', onModeOne);
events.AddCallback('mathDetector', onMathDetector);
events.AddCallback('GameEnd', onGameEnd);
events.AddCallback('fullReel', onFullReel);
events.AddCallback("MachineBlocked", onMachineBlocked);
var restarted = false;
var reelsArray = [];
StartUp();

//Helper Functions
function StartUp()
{
 
  if (!restarted) {
    machine.RestartGame();
  }else {
    machine.DoInput('space',1);
  }
}

function onGameEnd(credits)
{
  print("game GameEnd");

  machine.DoInput('space',1);
}

function onFullReel(result)
{
    //guardar x vezes 5
    reelsArray.push(result+" next, ");
}

function onMathDetector(mathVersion)
{
  print("Math detected: "+ mathVersion);
}

function onModeOne(){
  print("On mode 1 detected");
}
function onMachineBlocked() 
{
  //If machine suffered an reboot this callBack is called n close de door
  machine.DoInput('d', 1);
  restarted = true;
  print("Ola eu sou o machine blocked!! ");
  print("Length: "+reelsArray);
  print("Length: "+reelsArray.length);
}
