//Event to detect bill inserted
var bills = [10, 20, 50, ]

events.AddEvent("detectBill", "bill ");


events.AddCallback("detectBill", ondetectBill);

function ondetectBill(){
    print("Bill detected");
}