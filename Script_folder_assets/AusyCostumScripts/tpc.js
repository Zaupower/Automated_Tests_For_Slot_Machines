var lista = ["marcelo", "andre", "carlos", "sven"];

for(var i = lista.length-1; i<=0; i-- ){
    if(lista[i] != "andre"){
        console.log(lista[i]);
    }else{

        console.log("Bingo!");
    }
}