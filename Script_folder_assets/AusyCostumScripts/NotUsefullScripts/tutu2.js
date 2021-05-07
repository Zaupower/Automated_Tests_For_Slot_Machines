
console.log(2+2);
console.log(2/2);

console.log(2*2);
console.log(2-2);
var cena1 = 1;
var cena2 = 2;
var cena3 = 3;
var cena4 =4;

var total = cena1 * cena2 * cena3 * cena4;
console.log("total de multiplicaçao: " +total+ "7/24 : " + 7/24);
var fr1 = 5;
var fr2 = 5;
var total = fr1 + fr2;
console.log("A soma de: " + fr1 + " mais " + fr2 + " é : "+total);
// Aula 2
var a = 4;
var b = 3;
var c = 5;

if(a != b && a != c){
    console.log(a + " é diferente de " + b + " e de " + c +" tmabem");
}else if(a != b && a == c){
    console.log(a + " é diferente de "+b + " e igual "+c +" tmabem");
}else if(a == b && a != c){
    console.log(a + " é igual a " + b + " e diferente de  " + c +" tmabem");
}else{
    console.log(a + " é igual a " + b + " que é igual a " + c );
}


console.log("Vamos ver o que há na loja hoje!..Apetece me Bananas !? ");
var expr = 'Bananas';
switch (expr) {
  case 'laranjas':
    console.log('laranjas a 0.5 o k');
    break;
  case 'Mangas':
  case 'Bananas':
    console.log('Manga doce venezuelana a 20 o k');
   
    break;
  default:
    console.log(`Sem bananas :( ${expr}.`);
}h