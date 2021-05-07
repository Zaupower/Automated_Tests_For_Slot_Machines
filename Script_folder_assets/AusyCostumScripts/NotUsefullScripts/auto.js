// Register the callback for the game events.
events.AddCallback('GameStart', onGameStart);
events.AddCallback('InPlay', onInPlay);
events.AddCallback('GameEnd', onGameEnd);
events.AddCallback('ReelEnd', onReelEnd);
events.AddCallback('ExtraBallChance', onExtraBallChance);
events.AddCallback('ExtraBallPlayed', onExtraBallPlayed);
events.AddCallback('ExtraBallValueExceeded', onExtraBallValueExceeded);
events.AddCallback('WildBallChance', onWildBallChance);
events.AddCallback('WildBallPlayed', onWildBallPlayed);
events.AddCallback('Wild', onWild);
events.AddCallback('FreeSpins', onFreeSpins);
events.AddCallback('FreeSpinsChoice', onFreeSpinsChoice);
events.AddCallback('FreeSpinsPlayStart', onFreeSpinsPlayStart);
events.AddCallback('FreeSpinsWildMultiplier', onFreeSpinsWildMultiplier);
events.AddCallback('FreeSpinsTotal', onFreeSpinsTotal);
events.AddCallback('PrizeGot', onPrizeGot);
events.AddCallback('PrizeWon', onPrizeWon);
events.AddCallback('BigWin', onBigWin);
events.AddCallback('PrizesWon', onPrizesWon);
events.AddCallback('ProgressiveWon', onProgressiveWon);
events.AddCallback('MultiJackpotWon', onMultiJackpotWon);
events.AddCallback('BonusChance', onBonusChance);
events.AddCallback('BonusOptionPlayed', onBonusOptionPlayed);
events.AddCallback('BonusWon', onBonusWon);
events.AddCallback('EasyLinkEntered', onEasyLinkEntered);
events.AddCallback('EasyLinkReelEnd', onEasyLinkReelEnd);
events.AddCallback('EasyLinkRemainingPlays', onEasyLinkRemainingPlays);
events.AddCallback('HandpayAllowed', onHandpayAllowed);
events.AddCallback('HandpayDone', onHandpayDone);
events.AddCallback('CashIn', onCashIn);
events.AddCallback('CashOut', onCashOut);
events.AddCallback('CardsChanged', onCardsChanged);
events.AddCallback('CardValues', onCardValues);
events.AddCallback('MysteryAnnounce', onMysteryAnnounce);
events.AddCallback('MysteryConfirmed', onMysteryConfirmed);
events.AddCallback('MysteryEnter', onMysteryEnter);
events.AddCallback('MysteryStart', onMysteryStart);
events.AddCallback('MysteryObject', onMysteryObject);
events.AddCallback('MysteryEnd', onMysteryEnd);
events.AddCallback('MysteryWon', onMysteryWon);
events.AddCallback('MysteryLost', onMysteryLost);
events.AddCallback('PigBoomConfirmed', onPigBoomConfirmed);
events.AddCallback('PigBoomEnter', onPigBoomEnter);
events.AddCallback('PigBoomWon', onPigBoomWon);
events.AddCallback('PigBoomEnd', onPigBoomEnd);
events.AddCallback('BonusValues', onBonusValues);
events.AddCallback('ProgBonusAskServer', onProgBonusAskServer);
events.AddCallback('ProgBonusResetEligibility', onProgBonusResetEligibility);
events.AddCallback('ProgBonusServerDidntWin', onProgBonusServerDidntWin);
events.AddCallback('ProgBonusServerWon', onProgBonusServerWon);
events.AddCallback('ProgBonusStatus', onProgBonusStatus);
events.AddCallback('ProgBonusWon', onProgBonusWon);
events.AddCallback('CashierType', onCashierType);
events.AddCallback('DeviceInfo', onDeviceInfo);
events.AddCallback('DoorClosed', onDoorClosed);
events.AddCallback('PressedButtonAdmin', onPressedButtonAdmin);
events.AddCallback('PressedButtonAuto', onPressedButtonAuto);
events.AddCallback('PressedButtonBetMax', onPressedButtonBetMax);
events.AddCallback('PressedButtonCardLess', onPressedButtonCardLess);
events.AddCallback('PressedButtonCardMore', onPressedButtonCardMore);
events.AddCallback('PressedButtonCashout', onPressedButtonCashout);
events.AddCallback('PressedButtonChangeCards', onPressedButtonChangeCards);
events.AddCallback('PressedButtonHelp', onPressedButtonHelp);
events.AddCallback('PressedButtonOpenAllCards', onPressedButtonOpenAllCards);
events.AddCallback('PressedButtonOpenExtra', onPressedButtonOpenExtra);
events.AddCallback('PressedButtonPlay', onPressedButtonPlay);
events.AddCallback('PressedButtonSpeedUp', onPressedButtonSpeedUp);
events.AddCallback('ApplicationError', onApplicationError);
events.AddCallback('DebugMessage', onDebugMessage);
events.AddCallback('InfoMessage', onInfoMessage);
events.AddCallback('WarningMessage', onWarningMessage);
events.AddCallback('ErrorMessage', onErrorMessage);
events.AddCallback('CriticalMessage', onCriticalMessage);
events.AddCallback('MachineBlocked', onMachineBlocked);
events.AddCallback('OutOfService', onOutOfService);
events.AddCallback('CommunicationErrorDetected', onCommunicationErrorDetected);
events.AddCallback('CommunicationErrorResolved', onCommunicationErrorResolved);
events.AddCallback('MysteryConnectionLost', onMysteryConnectionLost);
events.AddCallback('MysteryPowerFailure', onMysteryPowerFailure);
events.AddCallback('AlesisMessage', onAlesisMessage);
events.AddCallback('GameStartTimeout', onGameStartTimeout);
events.AddCallback('OpenBallError', onOpenBallError);
events.AddCallback('BacktraceResult', onBacktraceResult);
events.AddCallback('MachineShutdownSignal', onMachineShutdownSignal);
events.AddCallback('MigrationFailed', onMigrationFailed);
events.AddCallback('MD5Fail', onMD5Fail);
events.AddCallback('CRCFailedBlock', onCRCFailedBlock);
events.AddCallback('CRCFailedBlockAll', onCRCFailedBlockAll);
events.AddCallback('CRCFailedBlockMulti', onCRCFailedBlockMulti);
events.AddCallback('BinaryFileModifiedError', onBinaryFileModifiedError);
events.AddCallback('GameStateFileError', onGameStateFileError);
events.AddCallback('GameStateSyncError', onGameStateSyncError);
events.AddCallback('MathDebugInReleaseError', onMathDebugInReleaseError);
events.AddCallback('MachineStartup', onMachineStartup);
events.AddCallback('MachineShutdown', onMachineShutdown);
events.AddCallback('ChangedGame', onChangedGame);
events.AddCallback('ForcedBalls', onForcedBalls);
events.AddCallback('ForcedCards', onForcedCards);
events.AddCallback('MathState', onMathState);
events.AddCallback('ConfigSoundEnter', onConfigSoundEnter);
events.AddCallback('GotEGMConfig', onGotEGMConfig);
events.AddCallback('EmuGotPrizeJackpot', onEmuGotPrizeJackpot);
events.AddCallback('EmuGotReport', onEmuGotReport);
events.AddCallback('EmuWonJackpotLocal', onEmuWonJackpotLocal);

var GAMES_PER_MYSTERY = 30;
var gamesPlayed = 0;
var GAMES_PER_JACKPOT = 20;
var reportGot = 0;
var REPORTS_PER_PRINT = 5;

function onCommunicationErrorResolved()
{
    print('machine reconnected');
    machine.setTimeout('postDCPlay', 5000, 'rechargeAndPlay()');
}

function clearNVs()
{
    machine.ClearNVs();
    print("NVs cleared.");
}

function fixMD5()
{
    machine.FixMD5();
    print("MD5 file fixed.");
}

function rebootMachine()
{
    machine.RebootMachine();
    print("Machine rebooted.");
}

function restartGame()
{
    machine.RestartGame();
    print("Game restarted.");
}

function changeMultiGameGame()
{
    var game = 1;
    machine.ChangeGame(game);
    print("Game changed to "+game+".");
}

function clickScreenPosition(){
	machine.DoTouch(100,100);
}

function forceBallsDraw(){
	machine.ForceBalls("1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40");
}

function stopForcedBallsDraw(){
	machine.ForceBalls("");
}

function forceCardsDraw(){
	machine.ForceCards("1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15");
}

function stopForcedCardsDraw(){
	machine.ForceCards("");
}

function insertSpecificBill(){
	machine.InsertBill(2);
}

function removeCredits(){
	machine.RemoveCredits();
}


function changeVLT(){
	var password = 3757;
	machine.SetVLT("1234" , password);
}

function takeScreenshot(){
	machine.TakeScreenshot();
}

function onMachineBlocked(excep)
{
    // Report the error with a print(), and if it's an open door, close it.
    print('Machine ' + machine.GetSessionIdx() + ' blocked. Exception = ' + excep);
    if(excep == 'Puerta Principal Abierta'){
        machine.DoInput('d', 1);
	 }
}
 
function onGameEnd(credits)
{
    gamesPlayed++;
    if(gamesPlayed % GAMES_PER_MYSTERY == 0) {
        startMystery();
    }
    if(gamesPlayed % GAMES_PER_JACKPOT == 0) {
        SendEMU('ForceJackpotLevel;2');
    }
    
    // Start the next play, or recharge the credits.
    print('onGameEnd');
    machine.removeTimer('playExtra');
    if(credits < 97000)
    {
	print('will recharge, have '+ credits+' credits.' );
        rechargeAndPlay();
    }
    else
    {
	print('credits: ' + credits);
        machine.DoInput('space', 1);
    }
}

function onGameStart(num, cred, bet, denom)
{
    print("Comecei a jogada numero "+num+" com "+cred+" creditos, aposta "+bet+" e denom "+denom )
} 		
	
function rechargeAndPlay()
{
    // Recharge credits, and wait some seconds for the operation to finish. Then, start a play.
	print('recharge');
    machine.InsertCredits(50);
    machine.setTimeout('postRechargePlay', 26000, 'machine.DoInput("space", 1)');
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
 
function onWildBallChance()
{
    // Press O and Space to choose the Wild Ball, after the Wild Ball entrance animation is over.
    print('onWildBallChance');
    machine.setTimeout('playWild', 5000, 'machine.DoInput("o space", 1);');
}
 
function onBonusChance()
{
    // Start the interval that will play during bonus.
    print('onBonusChance');
    machine.setInterval('playBonus', 500, 'machine.DoInput("r space", 1);');
}
 
function onBonusWon()
{
    // Clear the interval that played during bonus.
    print('onBonusWon');
    machine.removeTimer('playBonus');
}
 
function onMysteryEnd()
{
    // Start the next play.
    print('onMysteryEnd');
    machine.DoInput('space', 1);
}

function onHandpayAllowed() {
    machine.DoInput('h', 1);
    machine.setInterval('playGame', 500, 'machine.DoInput("r space", 1);');	
}

function startMystery() {
    if(gamesPlayed % (GAMES_PER_MYSTERY * 2) == 0) {
        SendEMU('MrChampion;');
    } else {
        SendEMU('PigBoom;{"IP": "", "PrizeLevel": "0"}');
    }
}

function changeProgressives(){

	SendEMU('ChangeProgressives;{"IP":"127.0.0.1","ProgressiveValues":{"LocalJpValue": 0,    "MegaJpValue": 500000, "GrandJpValue": 400000,   "MajorJpValue": 300000, "MinorJpValue": 200000,    "MiniJpValue": 0}};');
}

function onEmuGotPrizeJackpot(trama){
    print("Servidor recebeu GotPrizeJackpot com a trama "+trama);
}

function onEmuWonJackpotLocal(trama){
    print("Servidor recebeu WonJackpotLocal com a trama "+trama)
}

function onEmuGotReport(report){
    reportGot++;
	if(reportGot % GAMES_PER_REPORT == 0){
		print(report);
	}
}

function ipExample(){
	var ip;
	ip = machine.GetIP();
	print("this machine's ip is "+ip);

	machine.BlockIP("172.21.28.100");
	machine.UnblockIP("172.21.28.100");
}

function onInPlay(){
	print("onInPlay");
}

function onReelEnd(){
	print("onReelEnd");
}

function onExtraBallPlayed(){
	print("onExtraBallPlayed");
}

function onExtraBallValueExceeded(){
	print("onExtraBallValueExceeded");
}

function onWildBallPlayed(){
	print("onWildBallPlayed");
}

function onWild(){
	print("onWild");
}

function onFreeSpins(){
	print("onFreeSpins");
}

function onFreeSpinsChoice(){
	print("onFreeSpinsChoice");
}

function onFreeSpinsPlayStart(){
	print("onFreeSpinsPlayStart");
}

function onFreeSpinsWildMultiplier(){
	print("onFreeSpinsWildMultiplier");
}

function onFreeSpinsTotal(){
	print("onFreeSpinsTotal");
}

function onPrizeGot(){
	print("onPrizeGot");
}

function onPrizeWon(){
	print("onPrizeWon");
}

function onBigWin(){
	print("onBigWin");
}

function onPrizesWon(){
	print("onPrizesWon");
}

function onProgressiveWon(){
	print("onProgressiveWon");
}

function onMultiJackpotWon(){
	print("onMultiJackpotWon");
}

function onBonusOptionPlayed(){
	print("onBonusOptionPlayed");
}

function onEasyLinkEntered(){
	print("onEasyLinkEntered");
}

function onEasyLinkReelEnd(){
	print("onEasyLinkReelEnd");
}

function onEasyLinkRemainingPlays(){
	print("onEasyLinkRemainingPlays");
}

function onHandpayDone(){
	print("onHandpayDone");
}

function onCashIn(){
	print("onCashIn");
}

function onCashOut(){
	print("onCashOut");
}

function onCardsChanged(){
	print("onCardsChanged");
}

function onCardValues(){
	print("onCardValues");
}

function onMysteryAnnounce(){
	print("onMysteryAnnounce");
}

function onMysteryConfirmed(){
	print("onMysteryConfirmed");
}

function onMysteryEnter(){
	print("onMysteryEnter");
}

function onMysteryStart(){
	print("onMysteryStart");
}

function onMysteryObject(){
	print("onMysteryObject");
}

function onMysteryWon(){
	print("onMysteryWon");
}

function onMysteryLost(){
	print("onMysteryLost");
}

function onPigBoomConfirmed(){
	print("onPigBoomConfirmed");
}

function onPigBoomEnter(){
	print("onPigBoomEnter");
}

function onPigBoomWon(){
	print("onPigBoomWon");
}

function onPigBoomEnd(){
	print("onPigBoomEnd");
}

function onBonusValues(){
	print("onBonusValues");
}

function onProgBonusAskServer(){
	print("onProgBonusAskServer");
}

function onProgBonusResetEligibility(){
	print("onProgBonusResetEligibility");
}

function onProgBonusServerDidntWin(){
	print("onProgBonusServerDidntWin");
}

function onProgBonusServerWon(){
	print("onProgBonusServerWon");
}

function onProgBonusStatus(){
	print("onProgBonusStatus");
}

function onProgBonusWon(){
	print("onProgBonusWon");
}

function onCashierType(){
	print("onCashierType");
}

function onDeviceInfo(){
	print("onDeviceInfo");
}

function onDoorClosed(){
	print("onDoorClosed");
}

function onPressedButtonAdmin(){
	print("onPressedButtonAdmin");
}

function onPressedButtonAuto(){
	print("onPressedButtonAuto");
}

function onPressedButtonBetMax(){
	print("onPressedButtonBetMax");
}

function onPressedButtonCardLess(){
	print("onPressedButtonCardLess");
}

function onPressedButtonCardMore(){
	print("onPressedButtonCardMore");
}

function onPressedButtonCashout(){
	print("onPressedButtonCashout");
}

function onPressedButtonChangeCards(){
	print("onPressedButtonChangeCards");
}

function onPressedButtonHelp(){
	print("onPressedButtonHelp");
}

function onPressedButtonOpenAllCards(){
	print("onPressedButtonOpenAllCards");
}

function onPressedButtonOpenExtra(){
	print("onPressedButtonOpenExtra");
}

function onPressedButtonPlay(){
	print("onPressedButtonPlay");
}

function onPressedButtonSpeedUp(){
	print("onPressedButtonSpeedUp");
}

function onApplicationError(){
	print("onApplicationError");
}

function onDebugMessage(){
	print("onDebugMessage");
}

function onInfoMessage(){
	print("onInfoMessage");
}

function onWarningMessage(){
	print("onWarningMessage");
}

function onErrorMessage(){
	print("onErrorMessage");
}

function onCriticalMessage(){
	print("onCriticalMessage");
}

function onOutOfService(){
	print("onOutOfService");
}

function onCommunicationErrorDetected(){
	print("onCommunicationErrorDetected");
}

function onMysteryConnectionLost(){
	print("onMysteryConnectionLost");
	machine.setTimeout('mysteryConnectionLost', 5000, 'machine.DoInput("L", 1)');
}

function onMysteryPowerFailure(){
	print("onMysteryPowerFailure");
	machine.setTimeout('mysteryPowerFailure', 5000, 'machine.DoInput("L", 1)');
}

function onAlesisMessage(){
	print("onAlesisMessage");
}

function onGameStartTimeout(){
	print("onGameStartTimeout");
}

function onOpenBallError(){
	print("onOpenBallError");
}

function onBacktraceResult(){
	print("onBacktraceResult");
}

function onMachineShutdownSignal(){
	print("onMachineShutdownSignal");
}

function onMigrationFailed(){
	print("onMigrationFailed");
}

function onMD5Fail(){
	print("onMD5Fail");
}

function onCRCFailedBlock(){
	print("onCRCFailedBlock");
}

function onCRCFailedBlockAll(){
	print("onCRCFailedBlockAll");
}

function onCRCFailedBlockMulti(){
	print("onCRCFailedBlockMulti");
}

function onBinaryFileModifiedError(){
	print("onBinaryFileModifiedError");
}

function onGameStateFileError(){
	print("onGameStateFileError");
}

function onGameStateSyncError(){
	print("onGameStateSyncError");
}

function onMathDebugInReleaseError(){
	print("onMathDebugInReleaseError");
}

function onMachineStartup(){
	print("onMachineStartup");
}

function onMachineShutdown(){
	print("onMachineShutdown");
}

function onChangedGame(){
	print("onChangedGame");
}

function onForcedBalls(){
	print("onForcedBalls");
}

function onForcedCards(){
	print("onForcedCards");
}

function onMathState(){
	print("onMathState");
}

function onConfigSoundEnter(){
	print("onConfigSoundEnter");
}

function onGotEGMConfig(){
	print("onGotEGMConfig");
}

setTimeout('firstRecharge', 5000, 'rechargeAndPlay();');