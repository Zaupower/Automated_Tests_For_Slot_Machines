events.AddCallback('GameEnd', onGameEnd);
function onGameEnd(credits)
{
    var count =0;
    print('A máquina ' + machine.GetSessionIdx() + 'Jogada:  terminou  uma jogada com ' + credits + ' créditos.');
    
    machine.DoInput('space', 5);
}