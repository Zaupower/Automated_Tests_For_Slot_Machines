events.AddEvent('fullReel', "(\\[\\d.*\\d\\]\\[\\d.*\\]\\[\\d.*\\]\\[\\d.*\\])");

events.AddCallback('GameEnd', onGameEnd);
events.AddCallback('fullReel', onFullReel);
events.AddCallback("MachineBlocked", onMachineBlocked);
var restarted = false;
StartUp();
//Helper Functions
  function StartUp()
  {
 
    machine.DoInput('space',1);
  }

  function onGameEnd(credits)
  {
    if (!restarted) {
      restarted = true;
      machine.RestartGame();
    }
    print("game GameEnd");

    machine.DoInput('space',1);
  }
  function onFullReel(result){

    //guardar x vezes 5
    print("detected full reel"+result);
  }

  function onMachineBlocked() {
        
    //If machine suffered an reboot this callBack is called n close de door
    machine.DoInput('d', 1);
    print("Ola eu sou o machine blocked!! ");
}