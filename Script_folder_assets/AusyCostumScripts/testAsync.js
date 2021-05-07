//Nao funciona!

const f1 = "foo";
const f2 = "bar";
function StartNewGame() {
    console.log("start");
    return Promise.resolve(true);
}

function TentrJogar() {
    console.log("Done");
    return Promise.resolve(false);
}

function Three() {
    console.log("three");
    return Promise.resolve(true);
}
function InsertCredits() {
    console.log("InsertingCredits");
    return Promise.resolve(true);
}
function PlayGame() {
    console.log("PLay game");
}
function StartCreditsConversion() {
    console.log("Start Credits Converison");
    return Promise.resolve(true);
}



StartNewGame()
.then(() => TentrJogar())
.then(cb => {
            //Retorna cb que deve ser verdadeiro se for possivel jogar
            //ou falso caso as 4 tentativas de jogar falhem
            if (cb) {
                console.log("Existem Creditos");
                console.log("CB: " + cb);
            //Caso cb falso adiciona creditos
            } else {
                console.log("Nao há creditos");
                InsertCredits().then(() => {
                    console.log("Creditos inseridos");
                    StartCreditsConversion().then(result => {
                    console.log("Point conversion terminated");
                    })
                })
                //Three();
            }
        });