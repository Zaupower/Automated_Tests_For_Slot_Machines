var cr = machine.Credits
if(cr > 0){
    print("CashingOut "+ cr+ " credits");
    onDoInput('p', 1);
}
else{
    print("No credits");
    }

function onDoInput(key, times){
    print("Doing input "+key+" times: "+times);
    machine.DoInput(key, times);
}