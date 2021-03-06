events.AddEvent('fullReel', "(\\[\\d+.*\\]\\[\\d+.*\\]\\[\\d+.*\\d+\\]).*");
events.AddEvent('mathDetector', "math version(.*?),");

events.AddCallback('mathDetector', onMathDetector);
events.AddCallback('GameEnd', onGameEnd);
events.AddCallback('fullReel', onFullReel);
events.AddCallback("MachineBlocked", onMachineBlocked);
var restarted = false;
var reelsArray1 = [];

var startCount = 0;

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
  reelsArray1.push(result +" next, ");
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
  print("Arrays!!: ");
  print(reelsArray1[0]);
 
  print("StartCount:"+startCount);

}