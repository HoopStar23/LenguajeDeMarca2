/*Controles del juego*/
let controls = {
    a: false,
    s: false,
    d: false,
    ' ': false,
    j: false,
    k: false,
    l: false
};

let dar = { perfecto: 0, bueno: 0, malo: 0, fallo: 0 };

let multiplicador = {
    perfecto: 1,
    bueno: 0.8,
    malo: 0.5,
    fallo: 0,
    combo40: 1.05,
    combo80: 1.10
}

let jugar = false;
let velocidad = 0;
let combo = 0;
let maxCombo = 0;
let score = 0;
let animation = 'moveDown';
let tiempoEmpezar;
let contenedor;
let track;
let llaveApretado;
let textoCombo;


/*CREACION DE LAS NOTAS*/
let inicializarNotas = function () {
    let notaElemento;
    let trackElemento;

    while (contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.lastChild);
    }
    
    cancion.sheet.forEach(function (llave, indice) {
        trackElemento = document.createElement('div');
        trackElemento.classList.add('track');

        llave.notas.forEach(function(nota){
            notaElemento = document.createElement('div');
            notaElemento.classList.add('nota');
            notaElemento.classList.add('nota--' + indice);
            notaElemento.style.backgroundColor = llave.color;
            notaElemento.style.animationName = animation;
            notaElemento.style.animationTimingFunction = 'linear';
            notaElemento.style.animationDuration = nota.duracion - velocidad + 's';
            notaElemento.style.animationDelay = nota.retraso + velocidad + 's';
            notaElemento.style.animationPlayState = 'paused';
            trackElemento.appendChild(notaElemento);
        });

        contenedor.appendChild(trackElemento);
        track = document.querySelectorAll('.track');
    });
};

/*INICIAR PARTIDA NUEVA */
let setupBotonEmpezar = function(){
    let botonEmpezar = document.querySelector(".btn");
    botonEmpezar.addEventListener("click", function(){
        jugar = true;
        tiempoEmpezar = Date.now();

        temporizadorEmpezar(cancion.duracion);
        document.querySelector('.menu').style.opacity = 0;
        document.querySelector('.musica').play();
        document.querySelectorAll('.nota').forEach(function(nota){
        nota.style.animationPlayState = 'running';
        });
    });
};

/*TEMPORIZADOR DE LA CANCION*/
let temporizadorEmpezar = function(duracion){
    let display = document.querySelector(".tiempo");
    let animation = document.querySelector(".animation");
    let movie = document.getElementById("myVideo");
    let temporizador = duracion;
    let minutos;
    let segundos;

    display.style.display = 'block';
    display.style.opacity = 1
    animation.style.opacity = 1;


    movie.play();
    movie.muted = true;

    let cancionDuracionIntervalo = setInterval(function(){
        minutos = Math.floor(temporizador/60);
        segundos = temporizador % 60;
        minutos = minutos < 10 ? '0' + minutos : minutos;
        segundos = segundos < 10 ? '0' + segundos : segundos;
        display.innerHTML = minutos + ':' + segundos;

        if (--temporizador < 0) {
            clearInterval(cancionDuracionIntervalo);
            enseñarResultado();
            textoCombo.style.transition = 'all 1s';
            textoCombo.style.opacity = 0;
        }
    }, 1000);
};

/*ENSEÑA RESULTADO FINAL*/
let enseñarResultado = function(){
    document.querySelector('.perfecto-cantidad').innerHTML = dar.perfecto;
    document.querySelector('.bueno-cantidad').innerHTML = dar.bueno;
    document.querySelector('.malo-cantidad').innerHTML = dar.malo;
    document.querySelector('.fallo-cantidad').innerHTML = dar.fallo;
    document.querySelector('.combo-cantidad').innerHTML = maxCombo;
    document.querySelector('.puntuacion-cantidad').innerHTML = score;
    document.querySelector('.tiempo').style.opacity = 0;
    document.querySelector('.animation').style.opacity = 0;
    document.querySelector('.resultado').style.opacity = 1;
    document.querySelector('.nextLevel').style.opacity = 1;
}

let setupNotaFallo = function(){
    contenedor.addEventListener('animationend', function(event){
        let indice = event.target.classList.item(1)[6];

        displayPunteria('fallo');
        actualizarDar('fallo');
        actualizarCombo('fallo');
        actualizarMaxCombo();
        eliminarNotaDeTrack(event.target.parentNode, event.target);
        actualizarSiguiente(indice);
    })
}

/*CONTROL DE LLAVES*/
let setupLlave = function(){
    document.addEventListener('keydown', function (event) {
        let llaveIndice = getLlaveIndice(event.key);
        if (Object.keys(controls).indexOf(event.key) !== -1 
            && !controls[event.key]) {
            controls[event.key] = true;
            llaveApretado[llaveIndice].style.display = 'block';

            if (jugar && track[llaveIndice].firstChild) {
                judge(llaveIndice);
            }
        }
    });

    document.addEventListener('keyup', function(event){
        if (Object.keys(controls).indexOf(event.key) !== -1) {
            let llaveIndice = getLlaveIndice(event.key);
            controls[event.key] = false;
            llaveApretado[llaveIndice].style.display = 'none';
        }
    });
};

let getLlaveIndice = function(llave){
    if (llave === 'a') {
        return 0;
    }else if (llave === 's') {
        return 1;
    } else if (llave === 'd') {
        return 2;
    } else if (llave === ' ') {
        return 3;
    } else if (llave === 'j') {
        return 4;
    } else if (llave === 'k') {
        return 5;
    }else if (llave === 'l') {
        return 6;
    }
};

/*PUNTUAR NOTAS*/
let judge = function(indice){
    let tiempoEnSegundo = (Date.now() - tiempoEmpezar) / 1000;
    let siguienteNotaIndice = cancion.sheet[indice].next;
    let siguienteNota = cancion.sheet[indice].notas[siguienteNotaIndice];
    let tiemporPerfect = siguienteNota.duracion + siguienteNota.retraso;
    let punteria = Math.abs(tiempoEnSegundo - tiemporPerfect);
    let darJugdement;

    if (punteria > (siguienteNota.duracion - velocidad)/4) {
        return;
    }

    darJugdement = getDarJugdement(punteria);
    displayPunteria(darJugdement);
    ensenyarDarEfecto(indice);
    actualizarDar(darJugdement);
    actualizarCombo(darJugdement);
    actualizarMaxCombo();
    calcularScore(darJugdement);
    eliminarNotaDeTrack(track[indice], track[indice].firstChild);
    actualizarSiguiente(indice);
}

let getDarJugdement = function(punteria){
    console.log("LLAVE APRETADO");

    if (punteria < 0.1) {
        return 'perfecto'
    }else if (punteria < 0.2) {
        return 'bueno';
    } else if (punteria < 0.3) {
        return 'malo';
    } else {
        return 'fallo';
    }
};

let displayPunteria = function (punteria) {
    let punteriaTexto = document.createElement('div');
    document.querySelector('.dar-punteria').remove();
    punteriaTexto.classList.add('dar-punteria');
    punteriaTexto.classList.add('dar-punteria--' + punteria);
    punteriaTexto.innerHTML = punteria;
    document.querySelector('.dar').appendChild(punteriaTexto);
}

let ensenyarDarEfecto = function(indice){
    let llave = document.querySelectorAll('.llave')[indice];
    let darEfecto = document.createElement('div');
    darEfecto.classList.add('llave_dar');
    llave.appendChild(darEfecto);
};

let actualizarDar = function (jugdement){
    dar[jugdement]++;
};

let actualizarCombo = function(jugdement){
    if (jugdement === 'malo' || jugdement === 'fallo') {
        combo = 0;
        textoCombo.innerHTML = '';
    }else{
        textoCombo.innerHTML = ++combo;
    }
};

let actualizarMaxCombo = function(){
    maxCombo = maxCombo > combo ? maxCombo : combo;
};

let calcularScore = function (jugdement){
    if (combo >= 80) {
        score += 1000 * multiplicador[jugdement] * multiplicador.combo80;
    }else if (combo >= 40) {
        score += 1000 * multiplicador[jugdement] * multiplicador.combo40;
    } else {
        score += 1000 * multiplicador[jugdement];
    }
};

let eliminarNotaDeTrack = function(parent, child){
    parent.removeChild(child);
};

let actualizarSiguiente = function(indice){
    cancion.sheet[indice].next++;
};

window.onload = function (){
    contenedor = document.querySelector('.contenedor');
    llaveApretado = document.querySelectorAll('.llaveApretado');
    textoCombo = document.querySelector('.dar-combo');

    inicializarNotas();
    setupBotonEmpezar();
    setupLlave();
    setupNotaFallo();
};