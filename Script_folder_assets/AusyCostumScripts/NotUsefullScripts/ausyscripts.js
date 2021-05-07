events.AddCallback("GameStart", onGameStart);
machine.SetTimeout("autoMode", 1200, "machine.DoInput('a',1)");
function onGameStart(){
       print("GameStart");  
    }