/*
The objective of this test is to parse the Basic Game conversions duration over the timeframe defined in the legislation, to check how many 
can be done and their average duration in said timeframe.

Version 1.0

NOTE: Since Catalunya's credit limit is 2, there is no way to handle CashIns since the lowest bill is equivalent to 5 credits. (This will result in a lower ammount of conversions and many handpay screens).
*/

tests.RegisterTest("ConversionTimeValidator");

include("PointSystemES_RegionConfigValidator.js");
var conversionTimeValidatorPassed = false;
var testFinished = false;
//Test Variables Initialization:
var errorDelta = 0.01;      //Error tolerance between averages.
var conversionCounter = 0;  //Counter for each conversion done (counting until totalPlays).
var durationArray = [];     //Array for storing the duration of every conversion.


//variables after running : "PointSystemES_RegionConfigValidator.js"
var totalPrizesToBank = 0;

var totalPlays;
var timeLimit;
var targetAvg;
var creditLimit;
var reserveValue;

var timerStarted = false;
var testTimer = 0;

//events.AddCallback("BasicGameBet", onBasicGameToPoints);
events.AddEvent("BasicGameBetAuto", " Type: GAME, Bet: (.*), Duration: (.*)ms AUTOMATIC AUTO Won: \\[Cash: (.*), Points: (.*)\\] At Start: \\[Credits: (.*), Bank: (.*), Reserve: (.*)\\]");
events.AddCallback("BasicGameBetAuto", onBasicGameToPoints);
events.AddCallback("HandpayAllowed", onHandpayAllowed);
events.AddCallback("CommunicationErrorResolved", onCommErrorResolved);
events.AddCallback("MachineBlocked", onMachineBlocked);

function onMachineBlocked() {
        
    //If machine suffered an reboot this callBack is called n close de door
    machine.DoInput('d', 1);
    
    print("Ola eu sou o machine blocked!! apareci aqui porque alguem decidiu reiniciar a maquina!");
}

//function used to add an error tolerance which will be used in the test assertion:
function nearlyEqual(obtainedAverage, requiredAverage, delta) {
    var obtainedAverageAbs = Math.abs(obtainedAverage);
    var requiredAverageAbs = Math.abs(requiredAverage);
    var diff = Math.abs(obtainedAverage - requiredAverage);

    //handler for exact matches to avoid infinities in the following code:58
    if (obtainedAverage == requiredAverage) { 
        return true;
    }
    //one of the averages is zero or both are extremely close to it: 
    else if (obtainedAverage == 0 || requiredAverage == 0 || (obtainedAverageAbs + requiredAverageAbs < Number.MIN_VALUE)) {
        return diff < (delta * Number.MIN_VALUE);
    } 
    else { // use delta (relative error):
        return diff / Math.min((obtainedAverageAbs + requiredAverageAbs), Number.MAX_VALUE) < delta;
    }
}

function onHandpayAllowed(){
    machine.DoInput('F2', 1);
    machine.DoInput('h', 1);
}

function onCommErrorResolved(){
    if (regionConfigValidatorPassed){
        initiate();
    }
}

function creditHandler(billQuantity) {
    if(billQuantity == 0) {
        machine.DoInput("5",1);
        machine.DoInput("8",1);5
        print ("50 euro bill inserted...");
    }
    else{
        for (var i = 1; i <= billQuantity; i++) {
            machine.DoInput("2",1);
            machine.DoInput("8",1);
            print ("5 euro bill inserted...");
        }
    }
}
function initiate(){
    print("Testing conversion limit in the timeframe defined for " + currentRegion);
    totalPlays = ConversionCountLimit;
    timeLimit = ConversionTimeLimit;
    targetAvg = parseFloat(AvgConversionTime);
    creditLimit = CreditMeterLimit;
    reserveValue = ReserveMeterLimit;
    print("Checking for a limit of " + totalPlays.toString() + "conversions to Points in " + timeLimit.toString() + " seconds...");
    print("Test initiated. Approx. duration: " + (timeLimit/60).toString() + " minutes");
    creditHandler(1);
}

function onBasicGameToPoints(bet, duration, wonCash, wonPoints ,credits, bank, reserve){
    totalPrizesToBank = totalPrizesToBank + parseInt(wonCash);
    if (!timerStarted){
        machine.SetInterval('playTimer', 1000, "testTimer++");
        timerStarted = true;
    }
    else if(parseInt(credits) + 5000 < CreditMeterLimit - 500){
        creditHandler(0);
    }
    else if(parseInt(credits) + 500 < CreditMeterLimit){                                                                                                                                                                                                                                                                                                                                                                                                                                              
        creditHandler(1);
    }

    print("Basic Game play to points...");
    print("Conversion: " + conversionCounter.toString() + "; Bet: " + bet.toString() + "; Duration: " + duration.toString()+ "; Timer state: " + testTimer.toString() + "; Timer end: " + timeLimit.toString());

    //durationArray.push(parseFloat(duration));
    conversionCounter++;

    //Test assertion:
    if(testTimer >= timeLimit && testFinished == false) {
        testFinished = true;
        machine.RemoveTimer('playTimer');
        print(conversionCounter.toString() + " Basic Game plays done in: " + (testTimer/60).toString() + " minutes");
        obtainedAvg = testTimer / conversionCounter;
        print("Average duration of each conversion is: " + obtainedAvg.toString());
        print("Total prize ammount in euros: " + totalPrizesToBank.toString());
        /*
        var arraySum = 0;
        for (var i = 0; i < durationArray.length; i++){
            arraySum = arraySum + (parseFloat(durationArray[i]) /1000);
            var arrayAvg = arraySum / (totalPlays - 1);
            //Above information will be output to a file.
        }
        */
        print ("Expected average is " + targetAvg.toString());
        if (conversionCounter <= totalPlays || nearlyEqual(obtainedAvg, targetAvg, errorDelta)){
            print("TEST PASSED - Number of plays done in the timeframe is accoding to legislation");
            machine.DoInput('l', 1);
            conversionTimeValidatorPassed = true;
            tests.Pass();
        }
        else if (conversionCounter > totalPlays || !nearlyEqual(obtainedAvg, targetAvg, errorDelta)){
            print("TEST FAILED - More plays than allowed were done in the timeframe");
            machine.DoInput('l', 1);
            tests.Fail();
        }
    }
}

