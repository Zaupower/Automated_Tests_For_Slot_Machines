//Event to detect bill inserted
var bills = [10, 20, 50 ]
var startedPlay = false;
var g_buttonPosPoints = [674, 2118];
var g_machineState = "cenas";
var v_rebooting = false;
var v_startPlayRetry = 0;
var g_useTouch = true;

//XY button position on touchScreen
var g_buttonPosPlay = [1871, 2103];
var lastKnowCredits = 0;
var easyLinkReel;

//Prizes ID identifier on rreel
var miniPrize = ["221","mini"];
var minorPrize = ["222", "minor"];
var majorPrize = ["223", "major"];
var grandPrize = ["224", "grand"];

var arrayPrizes=[];

arrayPrizes.push(miniPrize);
arrayPrizes.push(minorPrize);
arrayPrizes.push(majorPrize);
arrayPrizes.push(grandPrize);

events.AddEvent("easyLinkReel", "EasyLink - Reel End Symbols: (.*)");
events.AddEvent("easyLinkRemainPlays", "EasyLink - Remaining Plays (.*)");


events.AddCallback('GameEnd', onGameEnd);
events.AddCallback("easyLinkReel", onEasyLinkReel);
events.AddCallback("easyLinkRemainPlays", onEasyLinkRemainPlays);


	StartUp();

	//Helper Function to start script
	function StartUp()
	{
	 machine.DoInput('space',1);
	}


//End Play function from callBack
function onGameEnd(credits)
	{
		print("onGameEnd: "+ credits);
		StartUp();
	}

//detect easyLink play
function onEasyLinkReel(reel){
    print("EasyLink Reel Detected");
    easyLinkReel = reel;
    print(easyLinkReel);
}


//Detect easyLink endPlay n calculate pizes
function onEasyLinkRemainPlays(plays){
	print("Plays remain: "+plays+":Termina");
	if (plays === "0") {
		print("Entrou no if");
		CalculatePrizes();
	}
}

function CalculatePrizes(){
	print("Calcuate easyLink Reel");
	easyLinkReel = easyLinkReel.replace(/[\[\]']+/g,'');
	//parse string to string[]
	var res = easyLinkReel.split(",");
	for(var i = 0; i<res.length; i++){
		for(var j = 0; j<arrayPrizes.length;j++){
			if (res[i] ===  arrayPrizes[j][0]) {
				print("Prize detected!!");
				print("Prize: "+ arrayPrizes[j][1]);
			}
		}
	}
}
