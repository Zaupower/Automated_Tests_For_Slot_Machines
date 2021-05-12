//Regex to detect first extration
events.AddEvent('fullReel', "(\\[\\d+.*\\]\\[\\d+.*\\]\\[\\d+.*\\d+\\]).*");


/*
    Link: https://jira.pt.fabamaq.com:8443/projects/LOGIC?selectedItem=com.thed.zephyr.je:zephyr-tests-page#test-cycles-tab
    Script Flow
    FID 1
    Test Step
    1 - Make plays (normal and Free Spins);
    2 - Obtain Special Symbols.
    Expected Result
    It is possible to be awarded with special Symbols at any time in the game (Normal and Free Spins).
    This Test only work in normal mode(0).
*/

events.AddCallback('GameEnd', onGameEnd);
events.AddCallback('fullReel', onFullReel);
events.AddCallback("MachineBlocked", onMachineBlocked);
var restarted = false;
var reelsArray = [];

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
  reelsArray.push(result +" next, ");
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
  print(reelsArray[0]);
  print(reelsArray[1]);
  print(reelsArray[2]);
  print(reelsArray[3]);
  print(reelsArray[4]);
  print(reelsArray[5]);

}