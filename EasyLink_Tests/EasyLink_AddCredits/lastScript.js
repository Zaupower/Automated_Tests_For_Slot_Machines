events.AddCallback('GameEnd', onGameEnd);


StartUp();
//Helper Functions
  function StartUp()
  {
 
    machine.DoInput('space',1);
  }

  function onGameEnd(credits)
  {
    StartPlay();
  }