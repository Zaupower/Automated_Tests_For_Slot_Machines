tests.RegisterTest('Extra não pode ter custo negativo');
events.AddCallback('ExtraBallChance', onExtraBallChance);
events.AddCallback('ExtraBallPlayed', onExtraBallPlayed);
 
function onExtraBallChance()
{
    machine.DoInput('o', 1);
}
 
function onExtraBallPlayed(value, cost)
{
    if(value < 0)
    {
        tests.Fail();
    }
    else
    {
        tests.Pass();
    }
}