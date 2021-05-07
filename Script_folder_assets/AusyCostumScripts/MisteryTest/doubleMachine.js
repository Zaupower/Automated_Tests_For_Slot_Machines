events.AddCallback('CashIn', onCashIn);
events.AddCallback('GameEnd', onGameEnd);
events.AddCallback('CashIn', onCashIn);
events.AddCallback('HandpayAllowed', onHandpayAllowed);
events.AddCallback('HandpayDone', onHandpayDone);
//Play with callback
//set machine id array to identify machines on callBack
//use identify function to identify witch machine callback


var v_startPlayRetry = 0;


getMachines()[1].DoInput('space', 1);
getMachines()[2].DoInput('space', 1);
function onGameEnd() {
    print('onEndGame');
    //machine.DoInput('space', 1);
}

function StartPlay() {

    v_startPlayRetry++;
    if (v_startPlayRetry == 4) {
        print('Failed to start game');
        v_startPlayRetry = 0;
        InsertCredits();
        return;
    }
    machine.setTimeout('playtimeout', 2000, 'StartPlay();');
    machine.DoInput('space', 1);
}

function InsertCredits() {
    {
        print('keyboard in');
        machine.setTimeout('creditsIN1', 1000, 'machine.DoInput("3",1)');
        machine.setTimeout('creditsIN2', 2000, 'machine.DoInput("8",1)');
    }
}

//-------------------------------------------------------------------

for (var i = 0; i < machinesPoolSize; i++) {
    print('Credits in machine: ' + getMachines()[i].Credits);
}

//-----------------------------------------------------------------


//save machine credits in array
var arr = [];
var machinesPoolSize = 2;
//update moneyArr
//Podese chamar esta funcao sempre que um uma maquina nao tenha creditos
for (var i = 1; i <= machinesPoolSize; i++) {
    var crtInMachine = getMachines()[i].Credits;
    print("crtInMachine: "+crtInMachine);
    arr.push(crtInMachine);
    if (crtInMachine < 50) {
        // adicionar creditos á maquina 
        // adicionar callBack para ao adicionar creditos  passar creditos para puntos

        print("É necessario adicionar creditos");
        addCreditsToMachine(i);
    }
}
//Print Money, Machineindex
//arr.forEach(function (item, index, array) {

//    print(item, index);
//});

//Adicionar creditos a maquina 
function addCreditsToMachine(machineId) {
    getMachines()[machineId].setTimeout('creditsIN1', 1000, 'machine.DoInput("3",1)');
    getMachines()[machineId].setTimeout('creditsIN2', 2000, 'machine.DoInput("8",1)');
    arr[machineId] = getMachines()[machineId].Credits;
    print("machine: "+machineId+" credits: "+arr[machineId])
}

function onCashIn() {
    print("onCashIn");
}

function onHandpayAllowed() {
    machine.DoInput('h', 1);
}

function onHandpayDone() {
    print("onHandpayDone: " + machine.credits); //this no workin
}

