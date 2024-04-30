let partidas = 0;
let puntos1 = 0;
let puntos2 = 0;
let totalDados1 = 12;
let totalDados2 = 12;
/*let dado = '<img src="../../img/evaluable/d1.png"'
let dado2 = '<img src="../../img/evaluable/d2.png"'
let dado3 = '<img src="../../img/evaluable/d3.png"'
let dado4 = '<img src="../../img/evaluable/d4.png"'
let dado5 = '<img src="../../img/evaluable/d5.png"'*/


function lanzar() { 
    let dado1 = 0;
    let dado2 = 0;
    const partidasMAX = 3;
    let suma1 = 0;
    let suma2 = 0;

    let cantidadJ1 = document.getElementById("player1").value;
    let cantidadJ2 = document.getElementById("player2").value;

    //let dadosImg1 = document.getElementById("dados1");


    if (partidas < partidasMAX) {
        suma1 = 0;
        suma2 = 0;
        
        if (partidas == 0 && cantidadJ1 > 10 || cantidadJ2 > 10) {
            alert("No puedes tirar mas de 10 en tu primera partida");
        } else {
            partidas++;
            for (let j = 0; j < cantidadJ1; j++) {
                dado1 = Math.floor((Math.random() * 6) + 1);

                generarDado(dado1,1);

                suma1 += dado1;
            }

            for (let j = 0; j < cantidadJ2; j++) {
                dado2 = Math.floor((Math.random() * 6) + 1);

                generarDado(dado2,2);

                suma2 += dado2;
            }

            deleteDados(cantidadJ1,totalDados1,1);
            deleteDados(cantidadJ2,totalDados2,2);


            if (suma1 > suma2) {
                document.getElementById("partidas").innerHTML += suma1 + " ======== " + suma2 + "<br>";
                puntos1++;
            } else if (suma2 > suma1) {
                document.getElementById("partidas").innerHTML += suma1 + " ======== " + suma2 + "<br>";
                puntos2++;
            }

        }
    } else {
        alert("Ya has acabado las tres partidas");
        console.log(puntos1 + " " + puntos2);
        if (puntos1 > puntos2) {
            document.getElementById("resultado").innerHTML += j1Select +  " ES EL GANADOR: " + "<br>" + "PLAYER 1 -->" + puntos1 + " ======== " + "PLAYER 2 -->" + puntos2;
            document.querySelector('.reiniciar').style.opacity = 1;
        } else if (puntos1 < puntos2) {
            document.getElementById("resultado").innerHTML += j2Select + " ES EL GANADOR: " + "<br>" + "PLAYER 1 -->" + puntos1 + " ======== " + "PLAYER 2 -->" + puntos2;
            document.querySelector('.reiniciar').style.opacity = 1;
        } else {
            document.getElementById("resultado").innerHTML += "EMPATE!!!: " + "<br>" + "PLAYER 1 -->" + puntos1 + " ======== " + "PLAYER 2 -->" + puntos2;
            document.querySelector('.reiniciar').style.opacity = 1;
        }
    }
}

/*if (cantidadJ1 > totalDados1 || cantidadJ2 > totalDados2) {
    alert("No tienes suficientes dados como para tirar esa cantidad");
}*/



const deleteDados = (cantidadDelete,total,num) =>{
    for (let i = 0; i < cantidadDelete; i++) {
        total--;
        document.getElementById("player"+num).remove(total);
    }
    if (num == 1) {
        totalDados1 = total;
    }else{
        totalDados2 = total;
    }
}

const generarDado = (dado,num) => {
    let imagen = document.createElement('img');
    imagen.src = "../../img/dados/imagenes/d" + dado + ".png"

    imagen.setAttribute('class', 'dados');

    document.getElementById("dados"+num).appendChild(imagen);
}

let j1Select = "";
let j2Select = "";

const elegir = (nombre) =>{

    if (j1Select === "") {
        j1Select = nombre;
    }else if( j2Select === ""){
        j2Select = nombre;
    }

    verificarNombre();

    if (j1Select == 'mickey') {
        document.getElementById("pers1").innerHTML = j1Select;
    }else if (j1Select == 'goku') {
        document.getElementById("pers1").innerHTML = j1Select;
    }else if (j1Select == 'po') {
        document.getElementById("pers1").innerHTML = j1Select;
    }else if (j1Select == 'eren') {
        document.getElementById("pers1").innerHTML = j1Select;
    }else if (j1Select == 'mulan') {
        document.getElementById("pers1").innerHTML = j1Select;
    }else if (j1Select == 'kelsier') {
        document.getElementById("pers1").innerHTML = j1Select;
    }

    if (j2Select == 'mickey') {
        document.getElementById("pers2").innerHTML = j2Select;
    }else if (j2Select == 'goku') {
        document.getElementById("pers2").innerHTML = j2Select;
    }else if (j2Select == 'po') {
        document.getElementById("pers2").innerHTML = j2Select;
    }else if (j2Select == 'eren') {
        document.getElementById("pers2").innerHTML = j2Select;
    }else if (j2Select == 'mulan') {
        document.getElementById("pers2").innerHTML = j2Select;
    }else if (j2Select == 'kelsier') {
        document.getElementById("pers2").innerHTML = j2Select;
    }
}

const verificarNombre = () =>{
    if (j1Select != "" && j2Select != "") {
        document.querySelector('.juego_dados').style.opacity = 1;
        document.querySelector('.juego_dados').style.zIndex = 10;
        document.querySelector('.center-grid-items').style.opacity = 0;
    }
}