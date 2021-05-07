
var g_buttonPosMenu = [1627, 2086];
var g_menuCatchTheGold = [65, 755];
print("Iniciou o Teste");
//machine.DoTouch(g_buttonPosMenu[0], g_buttonPosMenu[1]);
machine.setTimeout('clickMenu', 2000, 'machine.DoTouch(g_buttonPosMenu[0], g_buttonPosMenu[1]);');
machine.setTimeout('clickGameMenu', 2000, 'machine.DoTouch(g_menuCatchTheGold[0], g_menuCatchTheGold[1]);');


//----------------------------------------------------------------

var g_buttonPosMenu = [1627, 2086];
var g_menuCatchTheGold = [525, 1340];
var g_menuwhaterRiches = [1391, 1343];
var g_menuKingdomGems = [513, 1766];
var g_menuwhaterRiches = [1362, 1785];

var arrayMenuGames = [];

arrayMenuGames.push(g_menuCatchTheGold);
arrayMenuGames.push(g_menuwhaterRiches);
arrayMenuGames.push(g_menuKingdomGems);
arrayMenuGames.push(g_menuwhaterRiches);

print("Comecou o teste");
//machine.DoTouch(g_buttonPosMenu[0], g_buttonPosMenu[1]);
machine.setTimeout('clickMenu', 2000, 'machine.DoTouch(g_buttonPosMenu[0], g_buttonPosMenu[1]);');

machine.setTimeout('clickGameMenu', 2000, 'machine.DoTouch(g_menuwhaterRiches[0], g_menuwhaterRiches[1]);');
print("Terminou o teste");
