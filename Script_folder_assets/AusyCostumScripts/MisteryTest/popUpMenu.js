setInterval(popUpTest(), 2000);
function popUpTest() {
    if (machine.Credits != 0) {
      machine.SetTimeout("autoMode", 2500, "machine.DoInput('p',2)");
      machine.SetTimeout("insert credits", 2500, "machine.InsertBill(7)");
      machine.SetTimeout("autoMode", 3000, "machine.TakeScreenshot();");
    } else {
      machine.SetTimeout("insert credits", 500, "machine.InsertBill(7)");
      machine.SetTimeout("autoMode", 2000, "machine.TakeScreenshot();");
    }
}





/*
insert credits
machine.SetTimeout("insert credits", 2500, "machine.InsertBill(7)");
*/