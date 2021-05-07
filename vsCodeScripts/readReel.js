
events.AddEvent('fullReel', 'Reels Mode 0 (.*)');

events.AddCallback('GameEnd', onGameEnd);
events.AddCallback('fullReel', onFullReel);
events.AddCallback("MachineBlocked", onMachineBlocked);

StartUp();
//Helper Functions
  function StartUp()
  {
 
    machine.DoInput('space',1);
  }

  function onGameEnd(credits)
  {
    print("game GameEnd")
  }
  function onFullReel(fullReel){
  	print("full reel: "+ fullReel)
  }

  function onMachineBlocked() {
        
    //If machine suffered an reboot this callBack is called n close de door
    machine.DoInput('d', 1);
    
    print("Ola eu sou o machine blocked!! apareci aqui porque alguem decidiu reiniciar a maquina!");
}