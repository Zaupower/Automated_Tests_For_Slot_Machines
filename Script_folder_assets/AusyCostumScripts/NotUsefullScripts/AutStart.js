


//-----------------------------//-------------------------------
//é possivel chamar diretamente  machine com funcoes de instancia como "SetTimeout"

machine.SetTimeout("insert credits", 850, "machine.InsertBill(7)");
machine.SetTimeout("autoMode", 1200, "machine.DoInput('a',1)");
events.AddCallback("GameStart", onGameStart);
function onGameStart(){
    print("GameStart");  
 }
//--------------------------//------------------

//CashOut----------------------------------------------
 events.AddCallback("GameStart", onGameStart);
    function onGameStart(){
   machine.CashOut(3500)
 }

 events.AddCallback("GameStart", onGameStart);
    function onGameStart(){
   machine.StartCashOut(1000)
 }