var arrayTotal = [];
var arr1 = ["[1","2","3][4"];
var arr2 = ["5","6","7][8"];
var arr3 = ["9","10","11][12"];
var arr4 = ["13","14","15][16"];
var arr5 = ["17","18","19]"];

arrayTotal.push(arr1);
arrayTotal.push(arr2);
arrayTotal.push(arr3);
arrayTotal.push(arr4);
arrayTotal.push(arr5);

console.log(arrayTotal.toString());
formatArrays(arrayTotal);
console.log(arrayTotal.join("\n"))
console.log(arrayTotal[0].length);

console.log(arrayTotal[1].length);

console.log(arrayTotal[2].length);

console.log(arrayTotal[3].length);

console.log(arrayTotal[4].length);
function formatArrays(firstExtrationArrays){

    for(i = 0; i< arrayTotal.length; i++){
        if(i == 0 ){
            //START
            let firstpositionToFormat = firstExtrationArrays[i][0];
            firstpositionToFormat = firstpositionToFormat.split('[');
            
            //Só falta adicionar de volta ao array
            firstExtrationArrays[i][0] = firstpositionToFormat[1];
            console.log("First positions after change: "+firstExtrationArrays[i][0]);
            console.log("");
        }
        if(i < arrayTotal.length-1){
            //MIDDLE
            //get last position to split
            let intermediaryToFormat = firstExtrationArrays[i][firstExtrationArrays[i].length-1];
            intermediaryToFormat = intermediaryToFormat.split('][');
            
            let tmp_array = firstExtrationArrays[i];
            let tmp_length = tmp_array.length;
            tmp_array[tmp_length-1] = intermediaryToFormat[0];
            firstExtrationArrays[i] = tmp_array;
            //Add to final
            let tmp_array_end = firstExtrationArrays[i+1];
            tmp_array_end = [intermediaryToFormat[1]].concat(tmp_array_end);
            firstExtrationArrays[i+1] = tmp_array_end;
        }
        else if(i== arrayTotal.length-1){
            //END
            let last_position_idx = firstExtrationArrays[i].length;
            let lastpositionToFormat = firstExtrationArrays[i][last_position_idx-1];
            console.log("AQUI: "+lastpositionToFormat);
            lastpositionToFormat = lastpositionToFormat.split(']');
            
            //Só falta adicionar de volta ao array
            firstExtrationArrays[i][last_position_idx-1] = lastpositionToFormat[0];
        }
    }
    return firstExtrationArrays;
}