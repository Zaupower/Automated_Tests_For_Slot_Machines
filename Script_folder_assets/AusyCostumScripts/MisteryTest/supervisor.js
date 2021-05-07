events.AddCallback('PressedButtonAdmin', onPressedButtonAdmin);
setTimeout("timer", 800, "machine.DoInput('L', 1)");
//Fazer com async await
function onPressedButtonAdmin() {
    doInput("P", 1);
    doInput('D', 1);
    doInput('R', 4);
    doInput('space', 1);
    doInput('R', 6);
    doInput('space', 1);
    doInput('R', 2);
    doInput('space', 1);
    doInput('R', 4);
    doInput('space', 1);
    doInput('R', 12);
    doInput('space', 1);
    doInput('R', 2);
    doInput('space', 1);
    doInput('R', 5);
    doInput('space', 1);
    takeScreenShot();
    doInput('R', 5);
    doInput('space', 1);
    doInput('R', 5);
    doInput('space', 1);
    doInput('R', 9);
    doInput('space', 1);
    doInput('D', 1);
}

function doInput(key, times) {
    machine.DoInput(key, times);
}

function takeScreenShot() {
    machine.TakeScreenshot();
}

/*

events.AddCallback('PressedButtonAdmin', onPressedButtonAdmin);
setTimeout("timer", 800, "machine.DoInput('L', 1)");
function onPressedButtonAdmin(){
    machine.DoInput('D', 1);
    print("Admin pessed");
    machine.DoInput('R', 4);
    machine.DoInput('space', 1);
    machine.DoInput('R', 6);
    machine.DoInput('space', 1);
    machine.DoInput('R', 2);
    machine.DoInput('space', 1);
    machine.DoInput('R', 4);
    machine.DoInput('space', 1);
    machine.DoInput('R', 12);
    machine.DoInput('space', 1);
    machine.DoInput('R', 2);
    machine.DoInput('space', 1);
    machine.DoInput('R', 5);
    machine.DoInput('space', 1);
    TakeScreenshot();
    machine.DoInput('D', 1);
}

*/