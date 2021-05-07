machine.SetTimeout("insert credits", 850, "machine.InsertBill(7)");
machine.SetTimeout("autoMode", 1200, "machine.DoInput('a',1)");
events.AddCallback('ExtraBallChance', onExtraBallChance);
events.AddCallback("GameStart", onGameStart);
events.AddCallback('ExtraBallPlayed', onExtraBallPlayed);
function onGameStart(){
    print("GameStart");  
 }

function onExtraBallPlayed(){
	print("onExtraBallPlayed");
}
function onExtraBallChance()
{
    // Start the interval that will play during extra.
    print('onExtraBallChance');
    machine.setInterval('playExtra', 1000, 'playExtra();');
}
 
function playExtra()
{
    // Randomly presses O or Space, to buy an extra or cancel.
    if(random() < 0.9)
    {
        machine.DoInput("o", 1);
    }
    else
    {
        machine.DoInput('space', 1);
    }
}