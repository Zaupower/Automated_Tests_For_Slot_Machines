/*
The objective of this test is to detect and validate the Basic Game configuration for the region the server is running on.

Values sent from server will be compared to the region requirements provided on:
https://confluence.pt.fabamaq.com:8093/display/TC/Spanish+Legislation+-+AWP. 

Version: 1.0

Server Parameters validated with this script:

- Region;
- Maximum Prize for the region;
- Available Basic Game bets and respective Maximum Prizes;

- Conversions count time frame limit;
- Conversions count limit in the time frame;
- Average duration of conversions; 

- Timeout for Auto conversions;
- Value limit of the "Credit" label;
- Value limit of the "Reserve" label;
- Value limit of the "Bank" label;
*/

tests.RegisterTest("RegionConfigValidator");
//Test boolean variable to allow this test result to be checked if included in another file.
var regionConfigValidatorPassed = false;

var currentRegion = ""; 

//script logic variables:
var gotServerDenomination = false;
var assertionArray = [];
var rebootCounter = 0;

//Important region variables:
var MaxTotalBet;
var MaxPrize;
var AvgConversionTime;
var ConversionCountLimit;
var ConversionTimeLimit;
var AutoConversionStart;
var CreditMeterLimit;
var ReserveMeterLimit;
var PrizeBankLimit;

var Bets = [];
var MaxPrizePerBet = [];

//Reboot to detect Region automatically:
machine.SetTimeout("initiate", 1500, "clearAndGetRegion()");
function clearAndGetRegion(){
    machine.ClearNVs();
}

//Adding server info events:
events.AddEvent("detectRegion", "region: (.*)");
events.AddEvent("detectRegionBets", "availableBetsInCents: (.*)");
events.AddEvent("detectAllMaxPrizes", "maxPrizesPerBetInCents: (.*)");
events.AddEvent("detectConversionCountLimit", "maxGamesPerGameCycle: (.*)");
events.AddEvent("detectConversionTimeLimit", "gameCycleDurationSec: (.*)");
events.AddEvent("detectCreditMeterLimit", "creditMeterLimit: (.*)");
events.AddEvent("detectAutoConversionStart", "timeToEnableAutogameSec: (.*)");
events.AddEvent("detectReserveMeterLimit", "maxReserveCents: (.*)");
events.AddEvent("detectBankMeterLimit", "maxBankCents: (.*)");
events.AddEvent("shutdownSignal", " Failed to read common/.config/debugtools.cfg file.");
events.AddEvent("ShutdownNVRAM", "\\[DRIVERS\\]\\[INFO\\]: IOQuixant: Shuting down NVRAM!");

//Script logic handlers:
events.AddCallback("detectRegion", detectRegion);
events.AddCallback("detectRegionBets", setRegionBets);
events.AddCallback("detectAllMaxPrizes", setMaxPrizePerBet);
events.AddCallback("detectConversionCountLimit", conversionCountLimitValidator);
events.AddCallback("detectConversionTimeLimit", conversionTimeLimitValidator);
events.AddCallback("detectCreditMeterLimit", creditMeterLimitValidator);
events.AddCallback("detectAutoConversionStart", autoConversionStartValidator);
events.AddCallback("detectReserveMeterLimit", reserveMeterLimitValidator);
events.AddCallback("detectBankMeterLimit", bankMeterLimitValidator);


//Game event handlers:
events.AddCallback("ShutdownNVRAM", onMachineShutdown);
events.AddCallback("shutdownSignal", onMachineShutdown);
events.AddCallback("MachineStartup", onMachineStartup);
events.AddCallback("MachineShutdown", onMachineShutdown);

function onMachineStartup() {
    if (gotServerDenomination == true && rebootCounter == 2){
        //setting reboot counter as null  to only let the assertion occur 1 time:
        rebootCounter = null;
        print("Checking info obtained from the server and asserting results...");
        assertionArray.push(serverBetMaxPrizeValidator());
        assertionArray.push(AvgConversionTime == ConversionTimeLimit / ConversionCountLimit);
        var conditionsPassedCounter = 0;
        if (AvgConversionTime == (ConversionTimeLimit / ConversionCountLimit )){
            print("Requirements demand an average duration of: " + AvgConversionTime.toString() + " seconds per conversion. ");
            assertionArray.push(true);
        }
        for (var i = 0; i < assertionArray.length; i++){
            if (assertionArray[i] == false){
                print("One or more of the parameters obtained from the server is not according to " + currentRegion + " settings");
                print(assertionArray.toString());
                regionConfigValidatorPassed = false;
                tests.Fail();
            }
            else {
                print("Server Parameter validated...");
                conditionsPassedCounter++;
            }
        }
        if (conditionsPassedCounter == 10){
            print(assertionArray.toString());
            print("Region configuration is according to the requirements!");
            regionConfigValidatorPassed = true;
            tests.Pass();
        }
    }
    else if (gotServerDenomination == false){
        print("Getting Basic Game configurations from the server...");
        gotServerDenomination = true;
    }
}

function onMachineShutdown() {
    if (rebootCounter == 0){
        print("Game will reboot and clear NV's...");
        rebootCounter++;
    }
    else if (rebootCounter == 1){
        print("Server Denomination obtained, rebooting...");
        rebootCounter++;
    }
}

function detectRegion(region) {
    print("Setting the right region for testing...");
    currentRegion = region;
    setRegionParameters(currentRegion.toString());
}

function setRegionBets(betString){
    var tempArray1 = [];
    tempArray1 = betString.split(";");
    for (var i = 0; i <= tempArray1.length - 1; i++){
        if (!tempArray1[i] == " " || !tempArray1[i] == null) {
            Bets.push(parseInt(tempArray1[i]));
        }
    }
    print("Bets available for this region are: " + Bets.toString());
}

function setMaxPrizePerBet(maxPrizeString){
    var tempArray = [];
    tempArray = maxPrizeString.split(";");
    for (var i = 0; i <= tempArray.length - 1; i++){
        if (!tempArray[i] == " " || !tempArray[i] == null) {
            MaxPrizePerBet.push(parseInt(tempArray[i]));
        }
    }
    print("Max Prizes per Bet for this region are: " + MaxPrizePerBet.toString());
    
}

function setRegionParameters(serverRegion) {
    switch (serverRegion) {
        case "Andalucia":
            print("Basic Game is configured according to Andalucia settings.");
            MaxTotalBet = 300;
            MaxPrize = 300000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 5;
            CreditMeterLimit = 1000;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Aragon":
            print("Basic Game is configured according to Aragón settings.");
            MaxTotalBet = 600;
            MaxPrize = 600000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 5;
            CreditMeterLimit = MaxPrize;
            ReserveMeterLimit = 0;
            PrizeBankLimit = 0;
            break;

        case "Asturias":
            print("Basic Game is configured according to Asturias settings.");
            MaxTotalBet = 200;
            MaxPrize = 200000;
            AvgConversionTime = 4;
            ConversionCountLimit = 150;
            ConversionTimeLimit = 600;
            AutoConversionStart = 5;
            CreditMeterLimit = 1000;
            ReserveMeterLimit = 0;
            PrizeBankLimit = MaxPrize;
            break;

        case "Baleares":
            print("Basic Game is configured according to Baleares settings.");
            MaxTotalBet = 100;
            MaxPrize = 100000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 5;
            CreditMeterLimit = 1000;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Canarias":
            print("Basic Game is configured according to Canárias settings.");
            MaxTotalBet = 300;
            MaxPrize = 300000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 5;
            CreditMeterLimit = 2000;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Cantabria":
            print("Basic Game is configured according to Cantábria settings.");
            MaxTotalBet = 200;
            MaxPrize = 300000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 3;
            CreditMeterLimit = 1000;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Castilla La Mancha":
            print("Basic Game is configured according to Castilla La Mancha settings.");
            MaxTotalBet = 200;
            MaxPrize = 200000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 3;
            CreditMeterLimit = 2000;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Castilla y Leon":
            print("Basic Game is configured according to Castilla y León settings.");
            MaxTotalBet = 100;
            MaxPrize = 100000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 3;
            CreditMeterLimit = 2000;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Catalunya":
            print("Basic Game is configured according to Catalunya settings.");
            MaxTotalBet = 200;
            MaxPrize = 200000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 3;
            CreditMeterLimit = MaxTotalBet;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Extremadura":
            print("Basic Game is configured according to Extremadura settings.");
            MaxTotalBet = 600;
            MaxPrize = 600000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 3;
            CreditMeterLimit = 1000;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Galicia":
            print("Basic Game is configured according to Castilla La Mancha settings.");
            MaxTotalBet = 600;
            MaxPrize = 360000;
            AvgConversionTime = 3;
            ConversionCountLimit = 1200;
            ConversionTimeLimit = 3600;
            AutoConversionStart = 3;
            CreditMeterLimit = MaxTotalBet;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Madrid":
            print("Basic Game is configured according to Madrid settings.");
            MaxTotalBet = 300;
            MaxPrize = 300000;
            AvgConversionTime = 5;
            ConversionCountLimit = 360;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 5;
            CreditMeterLimit = 1000;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Murcia":
            print("Basic Game is configured according to Murcia settings.");
            MaxTotalBet = 100;
            MaxPrize = 50000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 5;
            CreditMeterLimit = 1000;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Navarra":
            print("Basic Game is configured according to Navarra settings.");
            MaxTotalBet = 100;
            MaxPrize = 50000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 3;
            CreditMeterLimit = 1000;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Pais Vasco":
            print("Basic Game is configured according to País Vasco settings.");
            MaxTotalBet = 100;
            MaxPrize = 50000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 5;
            CreditMeterLimit = 2000;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Rioja":
            print("Basic Game is configured according to Rioja settings.");
            MaxTotalBet = 200;
            MaxPrize = 200000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 5;
            CreditMeterLimit = 2000;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;

        case "Valencia":
            print("Basic Game is configured according to Valência settings.");
            MaxTotalBet = 300;
            MaxPrize = 300000;
            AvgConversionTime = 3;
            ConversionCountLimit = 600;
            ConversionTimeLimit = 1800;
            AutoConversionStart = 5;
            CreditMeterLimit = 1000;
            ReserveMeterLimit = MaxPrize;
            PrizeBankLimit = MaxPrize;
            break;
        }
    }

//This part onward has the functions that validate values from server:
function serverBetMaxPrizeValidator() {
    print("Validating configuration parameters set from the server...");
    if (MaxPrizePerBet[MaxPrizePerBet.length - 1] ==  MaxPrize) {
        print("Region Max Prize corresponds to the Max Prize of the highest Bet");
        var MaxPrizeFraction = MaxPrize / Bets[Bets.length - 1];
        for (var i = 0; i <= (Bets.length - 1); i++) {
            if (MaxPrizePerBet[i] == Bets[i] * MaxPrizeFraction){
                print("The bet: " + Bets[i] + " correctly corresponds to the Max Prize: " + MaxPrizePerBet[i]);
            } 
            else {
                print("The bet " + Bets[i] + " is incorrectly associated with the Max Prize ");
                assertionArray.push(false);
                return false;
            }
        }
        assertionArray.push(true);
        return true;
    }
    else {
        print("The Maximum prize for the region is not the maximum prize for the highest bet...");
        assertionArray.push(false);
        return false;
    }
}

function conversionCountLimitValidator(serverConversionCount) {
    print("Checking value for Conversion count in the time limit...");
    if (ConversionCountLimit != parseInt(serverConversionCount)){
        print("INCORRECT INFO FROM SERVER!");
        assertionArray.push(false);
        return false;
    }
    else {
        print("Conversion count in the time limit is correctly assigned from the server.");
        assertionArray.push(true);
        return true;
    }
}

function conversionTimeLimitValidator(serverConversionTimeLimit) {
    print("Checking value for the time limit for the conversions...");
    if (ConversionTimeLimit != parseInt(serverConversionTimeLimit)){
        print("INCORRECT INFO FROM SERVER!");
        assertionArray.push(false);
        return false;
    }
    else {
        print("Conversions time limit is correctly assigned from the server.");
        assertionArray.push(true);
        return true;
    }
}

function creditMeterLimitValidator(serverCreditMeterLimit) {
    print("Checking value for the Credit label limit...");
    if (CreditMeterLimit != parseInt(serverCreditMeterLimit)){
        print("INCORRECT INFO FROM SERVER!");
        assertionArray.push(false);
        return false;
    }
    else {
        print("Credit limit is correctly assigned from the server.");
        assertionArray.push(true);
        return true;
    }
}

function autoConversionStartValidator(serverAutoConversionStart) {
    print("Checking value for the auto-conversion timer...");
    if (AutoConversionStart != parseInt(serverAutoConversionStart)){
        print("INCORRECT INFO FROM SERVER!");
        assertionArray.push(false);
        return false;
    }
    else {
        print("Time to start auto-conversion is correctly assigned from the server.");
        assertionArray.push(true);
        return true;
    }
}

function reserveMeterLimitValidator(serverReserveLimit) {
    print("Checking value for the Reserve limit...");
    if (ReserveMeterLimit != parseInt(serverReserveLimit)){
        print("INCORRECT INFO FROM SERVER!");
        assertionArray.push(false);
        return false;
    }
    else {
        print("Reserve label limit is correctly assigned from the server.");
        assertionArray.push(true);
        return true;
    }
}

function bankMeterLimitValidator(serverBankLimit) {
    print("Checking value for the Bank limit...");
    if (PrizeBankLimit != parseInt(serverBankLimit)){
        print("INCORRECT INFO FROM SERVER!");
        assertionArray.push(false);
        return false;
    }
    else {
        print("Bank label limit is correctly assigned from the server.");
        assertionArray.push(true);
        return true;
    }
}
