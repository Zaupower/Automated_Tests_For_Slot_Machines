//Register the callback for the game events
events.AddCallback('ApplicationError', onApplicationError);
events.AddCallback('BacktraceResult', onBacktraceResult);
events.AddCallback('InPlay', onBalls);
events.AddCallback('BigWin', onBigWin);
events.AddCallback('BinaryFileModifiedError', onBinaryFileModifiedError);
events.AddCallback('BonusChance', onBonusChance);
events.AddCallback('BonusOptionPlayed', onBonusOptionPlayed);
events.AddCallback('BonusWon', onBonusWon);
events.AddCallback('CardsChanged', onCardsChanged);
events.AddCallback('CardValues', onCardValues);
events.AddCallback('CashIn', onCashIn);
events.AddCallback('CashOut', onCashOut);
events.AddCallback('ChangedGame', onChangedGame);
events.AddCallback('CommunicationErrorDetected', onCommunicationErrorDetected);
events.AddCallback('CommunicationErrorResolved', onCommunicationErrorResolved);
events.AddCallback('ConfigSoundEnter', onConfigSoundEnter);
events.AddCallback('CRCFailedBlock', onCRCFailedBlock);
events.AddCallback('CRCFailedBlockAll', onCRCFailedBlockAll);
events.AddCallback('CRCFailedBlockMulti', onCRCFailedBlockMulti);
events.AddCallback('CriticalMessage', onCriticalMessage);
events.AddCallback('DebugMessage', onDebugMessage);
events.AddCallback('DoorClosed', onDoorClosed);
events.AddCallback('EasyLinkEntered', onEasyLinkEntered);
events.AddCallback('EasyLinkReelEnd', onEasyLinkReelEnd);
events.AddCallback('EasyLinkRemainingPlays', onEasyLinkRemainingPlays);
events.AddCallback('ErrorMessage', onErrorMessage);
events.AddCallback('ExtraBallChance', onExtraBallChance);
events.AddCallback('ExtraBallPlayed', onExtraBallPlayed);
events.AddCallback('ExtraBallValueExceeded', onExtraBallValueExceeded);
events.AddCallback('FreeSpinsChoice', onFreeSpinsChoice);
//events.AddCallback('FreeSpinsNumber', onFreeSpinsNumber);
events.AddCallback('FreeSpinsTotal', onFreeSpinsTotal);
events.AddCallback('FreeSpinsWildMultiplier', onFreeSpinsWildMultiplier);
events.AddCallback('ForcedBalls', onForcedBalls);
events.AddCallback('ForcedCards', onForcedCards);
events.AddCallback('GameEnd', onGameEnd);
events.AddCallback('GameStart', onGameStart);
events.AddCallback('GameStartTimeout', onGameStartTimeout);
events.AddCallback('GameStateFileError', onGameStateFileError);
events.AddCallback('GameStateSyncError', onGameStateSyncError);
events.AddCallback('HandpayAllowed', onHandpayAllowed);
events.AddCallback('HandpayDone', onHandpayDone);
events.AddCallback('InfoMessage', onInfoMessage);
events.AddCallback('InPlay', onPlay);
events.AddCallback('MachineBlocked', onMachineBlocked);
events.AddCallback('MachineShutdown', onMachineShutdown);
events.AddCallback('MachineShutdownSignal', onMachineShutdownSignal);
events.AddCallback('MachineStartup', onMachineStartup);
events.AddCallback('MathDebugInReleaseError', onMathDebugInReleaseError);
events.AddCallback('MathState', onMathState);
events.AddCallback('MD5Fail', onMD5Fail);
events.AddCallback('MigrationFailed', onMigrationFailed);
events.AddCallback('MultiJackpotWon', onMultiJackpotWon);
events.AddCallback('MysteryAnnounce', onMysteryAnnounce);
events.AddCallback('MysteryConnectionLost', onMysteryConnectionLost);
events.AddCallback('MysteryConfirmed', onMysteryConfirmed);
events.AddCallback('MysteryEnter', onMysteryEnter);
events.AddCallback('MysteryEnd', onMysteryEnd);
events.AddCallback('MysteryLost', onMysteryLost);
events.AddCallback('MysteryObject', onMysteryObject);
events.AddCallback('MysteryPowerFailure', onMysteryPowerFailure);
events.AddCallback('MysteryStart', onMysteryStart);
events.AddCallback('MysteryWon', onMysteryWon);
events.AddCallback('OpenBallError', onOpenBallError);
events.AddCallback('PigBoomConfirmed', onPigBoomConfirmed);
events.AddCallback('PigBoomEnd', onPigBoomEnd);
events.AddCallback('PigBoomEnter', onPigBoomEnter);
events.AddCallback('PigBoomWon', onPigBoomWon);
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
events.AddCallback('PrizeGot', onPrizeGot);
events.AddCallback('PrizeWon', onPrizeWon);
events.AddCallback('PrizesWon', onPrizesWon);
events.AddCallback('ProgressiveWon', onProgressiveWon);
events.AddCallback('ReelEnd', onReelEnd);
events.AddCallback('WarningMessage', onWarningMessage);
events.AddCallback('Wild', onWild);
events.AddCallback('WildBallPlayed', onWildBallPlayed);


tests.RegisterTest("Full Auto")


/**
 * /**
 * Auxiliary function to cash in and start play on all machines
 */
function cashInAndStartPlayAllMachines() {
    for (var machineNumber = 1; machineNumber <= getMachines().Count; machineNumber++) {
        getMachines()[machineNumber].InsertCredits(2);
        getMachines()[machineNumber].DoInput('space', 1);
    }
    print("cash in");
    print("start play");
}

/**
 * Uses the IP to set the VLT on all machines
 */
function SetVLTAllMachines() {
    for (var machineNumber = 1; machineNumber <= getMachines().Count; machineNumber++) {
        VLT = getMachines()[machineNumber].GetIp().split('.')[3];
        //getMachines()[machineNumber].SetVLT(VLT, 3757);// todo: uncomment when using quixant
        //print("Machine with idx " + machineNumber + " has now the VLT " + VLT);// todo: uncomment when using quixant
    }
    setTimeout("startAll", 20000, "cashInAndStartPlayAllMachines()");
}

setTimeout("defineVLT", 5000, "SetVLTAllMachines()");

/**
 * Start the next play, or recharge the credits.
 * * @param credits
 */
function onGameEnd(credits) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + ' - credits when play ends:' + machine.credits);
    if (machine.credits < 40000) {
        machine.InsertCredits(2);
        print(VLT + "- cash in");
        setTimeout('postRechargePlay' + machine.GetSessionIdx(), 26000, 'machine.DoInput("space", 1)');
    } else {
        machine.DoInput('space', 1);
    }
    removeTimer('playExtra_' + machine.GetSessionIdx());
}

/**
 * Randomly presses O or Space, to buy an extra ball or cancel.
 */
function playExtra(selectedMachine) {
    if (random() < 0.98) {
        getMachines()[selectedMachine].DoInput("o", 1);
    } else {
        getMachines()[selectedMachine].DoInput('space', 1);
    }
}

/**
 * When in application error
 * @param errorMessage
 */
function onApplicationError(errorMessage) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - application error: " + errorMessage)
}

/**
 * When there's a back trace result error in the game's log
 * @param errorMessage
 */
function onBacktraceResult(errorMessage) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - back trace result error: " + errorMessage)
}

/**
 * The game is in the initial ball's extraction
 */
function onBalls() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - in initial extraction")
}

/**
 * When the player wins a big prize
 * @param valueWon
 */
function onBigWin(valueWon) {
    setTimeout("endRunUp1", 4000, "machine.DoInput('space', 1)");
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - big win: " + valueWon);
}

/**
 * When there's an error during 'MD5's binary' verification
 * @param md5Expected
 */
function onBinaryFileModifiedError(md5Expected) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - binary file modified error: " + md5Expected)
}

/**
 * Start the interval that will play during bonus.
 */function onBonusChance() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + ' - play bonus');
    setInterval('playBonus_' + machine.GetSessionIdx(), 500, 'getMachines()[' + machine.GetSessionIdx() + '].DoInput("F11 r space", 1);');
}

/**
 * When in bonus, a piece is chosen by the player
 * @param pieceID
 * @param pieceValue
 */
function onBonusOptionPlayed(pieceID, pieceValue) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - bonus option played = piece ID " + pieceID + ", piece value " + pieceValue)
}

/**
 * Clear the interval that played during bonus.
 */
function onBonusWon() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + ' - bonus won');
    removeTimer('playBonus');
}

/**
 * When the player changes the cards
 */
function onCardsChanged() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - cards changed")
}

/**
 * The numbers present on a card. This occurs after an event of 'CardsChanged'
 * @param cardNumber
 * @param cellsNumber
 */
function onCardValues(cardNumber, cellsNumber) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - card values: card number " + cardNumber + ", cell's number " + cellsNumber)
}

/**
 * When credits are inserted
 * @param amount
 */
function onCashIn(amount) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - cash in: " + amount)
}

/**
 * When credits are fully paid
 * @param amount
 */
function onCashOut(amount) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - cash out: " + amount)
}

/**
 * When, in multigame, the game is changed or enters in gallery mode
 * @param gameNameOrGallery
 */
function onChangedGame(gameNameOrGallery) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - changed game: " + gameNameOrGallery)
}

/**
 * When in communication error
 */
function onCommunicationErrorDetected() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - communication error detected")
}

/**
 * When communication error is resolved
 */
function onCommunicationErrorResolved() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - communication error resolved");
    machine.DoInput('space', 1);
}

/**
 * When in supervisor, in sound tests
 */
function onConfigSoundEnter() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - testing sounds");
}

/**
 * When there's an error during 'NVs' verification (one block)
 * @param copyNumber
 * @param blockNumber
 */
function onCRCFailedBlock(copyNumber, blockNumber) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - CRC failed block: copy number " + copyNumber + ", blockNumber " + blockNumber);
}

/**
 * When there's an error during 'NVs' verification (all blocks)
 * @param copyNumber
 * @param blockNumber
 */
function onCRCFailedBlockAll(copyNumber, blockNumber) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - CRC failed all block: copy number " + copyNumber + ", blockNumber " + blockNumber);
}


/**
 * When there's an error during 'NVs' verification (multiple blocks)
 * @param copyNumber
 * @param blockNumber
 */
function onCRCFailedBlockMulti(copyNumber, blockNumber) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - CRC failed multi block: copy number " + copyNumber + ", blockNumber " + blockNumber);
}

/**
 * When there's a critical error in the game's log
 * @param criticalMessage
 */
function onCriticalMessage(criticalMessage) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - critical error: " + criticalMessage);
}

/**
 * When there's a debug error in the game's log
 * @param debugMessage
 */
function onDebugMessage(debugMessage) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - game's debug error: " + debugMessage)
}

/**
 * When machine's door is closed
 */
function onDoorClosed() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - Door Closed")
}

/**
 * When the game enters in Easy Link
 */
function onEasyLinkEntered() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - easy link");
    machine.DoInput('space', 1);
}

/**
 * When an easy link game play ends
 * @param symbolsList
 */
function onEasyLinkReelEnd(symbolsList) {
    machine.DoInput('space', 1);
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - spin of easy link ends")
}

/**
 * The amount of spins available to be played
 * @param remainingPlays
 */
function onEasyLinkRemainingPlays(remainingPlays) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - remaining plays: " + remainingPlays)
}

/**
 * When there's a error message in the game's log
 * @param message
 */
function onErrorMessage(message) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - game's log error: " + message)
}

/**
 * When in extra ball
 */
function onExtraBallChance() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - extra ball chance");
    setInterval('playExtra_' + machine.GetSessionIdx(), 1000, 'playExtra(' + machine.GetSessionIdx() + ');');

}

/**
 * An extra ball was bought
 * @param ballNumber
 * @param cost
 * @param wasInAuto
 */
function onExtraBallPlayed(ballNumber, cost, wasInAuto) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - extra ball played: ball number " + ballNumber + ", ball cost " + cost + ", in auto mode " + wasInAuto)
}

/**
 * There aren't enough credits available to buy an extra ball
 */
function onExtraBallValueExceeded() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - extra ball value exceeded")
}

/**
 * When the ball's extraction was arranged through debug
 */
function onForcedBalls() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - balls forced")
}

/**
 * When the cards in the game play were establish in debug
 */
function onForcedCards() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - cards forced")
}

/**
 * Game enters in free spins
 */
function onFreeSpinsChoice() {
    removeTimer('postOnPrizeWon');
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - free spins choice");
}

//TODO: o ausy ainda nÃ£o lÃª esta info. Em actualizaÃ§Ã£o

// /**
//  * How many free spins are there
//  */
// function onFreeSpinsNumber(freeSpinsTotal, remainingFreeSpins) {
//     VLT = machine.GetIp().split('.')[3];
//print(VLT+" - Starting free spins: free spins total " + freeSpinsTotal + ", remaining free spins " + remainingFreeSpins)
// }

/**
 * When a wild symbol is presented on free spins
 */
function onFreeSpinsWildMultiplier(reel, value) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - free spins wild multiplier: reel " + reel + ", value " + value)
}

/**
 * When free spins end and the total won is presented
 * @param totalWins
 */
function onFreeSpinsTotal(totalWins) {
    setTimeout('endRunUp2', 4000, 'machine.DoInput("space", 1)');
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - free spins total winnings: " + totalWins)
}

/**
 * The game starts a new play
 * @param numberGamePlay - the number of the game play
 * @param credits available
 * @param bet that the player chose
 * @param denomination in use in this game play
 */
function onGameStart(numberGamePlay, credits, bet, denomination) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - game start = game play number " + numberGamePlay + ", credits " + credits + ", bet " + bet + ", denomination " + denomination)
}

/**
 * When there's a game start error message in the game's log
 * @param startError
 */
function onGameStartTimeout(startError) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - game start error: " + startError);
}

/**
 * When there's an error during 'NVs' verification
 */
function onGameStateFileError() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - game state file error");
}

/**
 * When there's an error during 'MD5' verification (of game_base.xml)
 */
function onGameStateSyncError() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - game state sync error");
}

/**
 * When pops the handpay screen in the game
 * @param validationNumber
 * @param code
 * @param value
 */
function onHandpayAllowed(validationNumber, code, value) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - handpay: validation number " + validationNumber + ", code " + code + ", value " + value);
    machine.DoInput('h', 1);
}

/**
 * When the cash out occurs (handpay)
 * @param validationNumber
 * @param value
 */
function onHandpayDone(validationNumber, value) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - handpay done: validation number " + validationNumber + ", value " + value);
}

/**
 * When there's an info error message in the game's log
 * @param infoMessage
 */
function onInfoMessage(infoMessage) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - info error: " + infoMessage);
}

/**
 * Report the error with a print(), and if it's open door, closes it.
 * @param excep - what causes the error
 */
function onMachineBlocked(excep) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + ' - Machine ' + machine.GetSessionIdx() + ' blocked. Exception = ' + excep);
    if ((excep == 'Puerta Principal Abierta') || (excep == 'Main Door Open')) {
        machine.DoInput('d', 1);
    }
}

/**
 * When the machine shutdowns
 */
function onMachineShutdown() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - machine shutdown");
}

/**
 * When there's a machine shutdown signal as a error message in the game's log
 * @param errorMessage
 */
function onMachineShutdownSignal(errorMessage) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - machine shutdown signal in error: " + errorMessage);
}

/**
 * When the game starts
 * @param info
 */
function onMachineStartup(info) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - machine start up info: " + info)
}

/**
 * When the game of the release starts with a debug math
 */
function onMathDebugInReleaseError() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - Mmath debug in release error");
}

/**
 * When a dump occurs (state of math)
 * @param errorMessage
 */
function onMathState(trama) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - math state: " + trama);
}

/**
 * When a MD5 error occurs
 */
function onMD5Fail() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - MD5 failed");
}

/**
 * When a NVS migration error occurs (failure)
 */
function onMigrationFailed() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - Migration failed");
}

/**
 * The game is playing and the Mystery announce countdown begins
 * @param timeLeft
 * @param thermometer
 */
function onMysteryAnnounce(timeLeft, thermometer) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - Mystery announce: " + "time left " + timeLeft + ", thermometer " + thermometer)
}

/**
 * The game is in Mystery and a communication error occurs
 */
function onMysteryConnectionLost() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - connection lost during Mystery")
}

/**
 * It's confirmed that Mystery will be played
 */
function onMysteryConfirmed() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - Mystery confirmed")
}

/**
 * Starts the next play after Mystery ends
 */
function onMysteryEnd() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + ' - Mystery ends');
    machine.DoInput('space', 1);
}

/**
 * Mystery begins
 * @param prizeValue
 * @param cellsNumber
 */
function onMysteryEnter(prizeValue, cellsNumber) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - Mystery enter: prize value " + prizeValue + ", cell's number " + cellsNumber)
}

/**
 * Mystery ends and the player looses
 */
function onMysteryLost() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - Mystery lost")
}

/**
 * The game entered in Mystery and the extraction already started
 * @param pieceSeqNumber
 * @param ballsPrintedNumber
 */
function onMysteryObject(pieceSeqNumber, ballsPrintedNumber) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - Mystery object: piece sequence number " + pieceSeqNumber + ", ball's printed number " + ballsPrintedNumber);
}

/**
 * The game recovers from reboot and goes to Mystery screen with machine blocked by power failure
 */
function onMysteryPowerFailure() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - power failure in Mystery")
}

/**
 * The game entered in Mystery and the 10 sec countdown begins
 * @param countdown
 */
function onMysteryStart(countdown) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - Mystery start: countdown " + countdown)
}

/**
 * Mystery ends and the player wins
 * @param valueAwarded
 */
function onMysteryWon(valueAwarded) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - Mystery award: " + valueAwarded)
}

/**
 * When a multi-progressive bonus is awarded
 * @param jackpotValue
 */
function onMultiJackpotWon(jackpotValue) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - multi jackpot winnings: " + jackpotValue);
    setTimeout('exitJackpotScreen', 3000, "machine.DoInput('space',1)");
}

/**
 * When there's an open ball error message in the game's log
 * @param error
 */
function onOpenBallError(error) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - open ball error: " + error);
}

/**
 * It's confirmed that PigBoom will be played
 */
function onPigBoomConfirmed() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - PigBoom confirmed")
}

/**
 * The PigBoom ends
 */
function onPigBoomEnd() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - PigBoom ends");
    machine.DoInput('space', 1);
}

/**
 * The PigBoom begins
 * @param goldPrize
 * @param silverPrize
 * @param bronzePrize
 */
function onPigBoomEnter(goldPrize, silverPrize, bronzePrize) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - PigBoom begins: gold prize " + goldPrize + ", silver prize " + silverPrize + ", bronze prize " + bronzePrize);
}

/**
 * The PigBoom ends and the player wins
 * @param prize
 */
function onPigBoomWon(prize) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - PigBoom winnings: " + prize);
    machine.DoInput('space', 1);
}

/**
 * When a play starts it's indicated the game mode, the bet level and if it's in auto mode (on/off)
 * @param gameMode
 * @param betLevel
 * @param auto
 */
function onPlay(gameMode, betLevel, auto) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - game mode " + gameMode + ", betLevel " + betLevel + ", auto " + auto);
}

/**
 * The administrator button is pressed (supervisor)
 */
function onPressedButtonAdmin() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - admin button pressed")
}

/**
 * The auto button is pressed
 */
function onPressedButtonAuto() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - auto button pressed")
}

/**
 * The 'bet max' button is pressed
 */
function onPressedButtonBetMax() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - bet max button pressed")
}

/**
 * The 'less cards' button is pressed
 */
function onPressedButtonCardLess() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - less cards button pressed")
}

/**
 * The 'more cards' button is pressed
 */
function onPressedButtonCardMore() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - more cards button pressed")
}

/**
 * The cash out button is pressed
 */
function onPressedButtonCashout() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - cash out button pressed")
}

/**
 * The 'change cards' button is pressed
 */
function onPressedButtonChangeCards() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - change cards button pressed")
}

/**
 * The help button is pressed
 */
function onPressedButtonHelp() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - help button pressed")
}

/**
 * The 'open all cards' button is pressed
 */
function onPressedButtonOpenAllCards() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - open all cards button pressed")
}

/**
 * The 'open extra' button is pressed
 */
function onPressedButtonOpenExtra() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - open extra button pressed")
}

/**
 * The play button is pressed
 */
function onPressedButtonPlay() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - play button Pressed")
}

/**
 * The speed up button is pressed
 */
function onPressedButtonSpeedUp() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - speed up button pressed")
}

/**
 * Refers to a winning card and it's value awarded
 * @param cardNumber
 * @param prizeIndex
 * @param value
 */
function onPrizeGot(cardNumber, prizeIndex, value) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - prize got = card number " + cardNumber + ", prize index " + prizeIndex + ", value " + value)
}

/**
 * When the player wins a prize (in spins)
 * @param lineTotalValue
 * @param line1Data
 * @param line2Data
 * @param symbolsValue
 * @param value
 * @param wasThereFreeSpins
 * @param wasThereBonus
 */
function onPrizeWon(lineTotalValue, line1Data, line2Data, symbolsValue, value, wasThereFreeSpins, wasThereBonus) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - prize won: " + lineTotalValue + ", symbolsValue " + symbolsValue + ", value " + value + ", was there free spins? " + wasThereFreeSpins + ", was there bonus? " + wasThereBonus);
    if (wasThereFreeSpins == "true") {
        setInterval('postOnPrizeWon', 1000, 'machine.DoInput("space", 1)');
        VLT = machine.GetIp().split('.')[3];
        print(VLT + ' - free spins');
    } else if (wasThereBonus == 'true') {
        setTimeout('postOnPrizeWon2', 15000, 'machine.DoInput("space", 1)');
    } else {
        setTimeout('endRunUp3', 4000, 'machine.DoInput("space", 1);');
    }
}

/**
 * When a game play ends and there are gains to add to the available credits
 * @param totalWon = sum of all the prizes awarded
 */
function onPrizesWon(totalWon) {
    if (totalWon > 0) {
        setTimeout('endRunUp4', 4000, 'machine.DoInput("space", 1);');
        VLT = machine.GetIp().split('.')[3];
        print(VLT + " - total won: " + totalWon);
    } else {
        machine.DoInput('space', 1);
    }
}

/**
 * When a progressive bonus is awarded
 */
function onProgressiveWon(moneyPrize) {
    setTimeout('endRunUp5', 4000, 'machine.DoInput("space", 1);');
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - progressive bonus won: " + moneyPrize)
}

/**
 * Game play ends
 * @param reelsPositionsList
 */
function onReelEnd(reelsPositionsList) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - reel ends: " + reelsPositionsList)
}

/**
 * When there's a info error message in the game's log
 */
function onWarningMessage(warnMessage) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - warning error: " + warnMessage)
}

/**
 * Press O and Space to choose the Wild Ball, after the Wild Ball entrance animation is over
 */
function onWildBallChance() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + ' - play wild ball');
    setTimeout('playWild', 5000, 'machine.DoInput("o space", 1);');
}

/**
 * When a wild symbol appears in the game
 * @param wildType
 * @param reel
 * @param position
 */
function onWild(wildType, reel, position) {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - wild symbol presented: type " + wildType + ", reel " + reel + ", position " + position)
}

/**
 * When the wild ball is chosen
 */
function onWildBallPlayed() {
    VLT = machine.GetIp().split('.')[3];
    print(VLT + " - wild ball chosen")
}