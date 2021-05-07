events.AddCallback('GameEnd', onGameEnd);
events.AddCallback('ExtraBallChance', extraBallChance);
function onGameEnd(credits)
{
    var cr = machine.Credits/10
    print('Game: ' + cr.toFixed(2));
}
function extraBallChance(){
    var rand = random();
    print('First Value Rand value: ' + rand)
    print('EXTRA BALL CHANCE!');
     // Randomly presses O or Space, to buy an extra or cancel.
    var i;
    for (i = 0; i < 5; i++) {
        if(rand < 0.9)
        {
            machine.DoInput("o", 1);
            extraBallChance();
        }
        else
        {
            machine.DoInput('space', 1);
        }
        print('Rand value: ' + rand);
    }

}