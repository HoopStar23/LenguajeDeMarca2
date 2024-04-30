/*let factorial = document.getElementById("factorialnum");
let numfactorial = parseInt(factorial);*/
let factorial = parseInt(document.getElementById("factorialNum").value)+1;
let menos1 = -1;

/*function factorial(){
    factorialnum -= menos1;
    let resultado;
    let total = 0;

    console.log(factorialnum);
    if (factorialnum === 0 || factorialnum === 1) {
        document.getElementById("factorialResultado").innerHTML = 1;
    }else{
        total = factorialnum* factorial();
        document.getElementById("factorialResultado").innerHTML = total;
        console.log(resultado);
    }
}*/

function factorialNo(n){ 
    if (n === 0 || n === 1) 
        return 1; 
    let result = 1; 
    for (let i = 2; i <= n; i++){ 
        result *= i; 
    } 
    return result; 
}

function serieTaylor(){
    let n = parseInt(document.getElementById("serieTaylor").value);
    let x = parseFloat(document.getElementById("serieTaylor2").value);

    let result = 0;

    console.log(n + " " + x);
    for (let i = 0; i <= n; i++) {
        result += (Math.pow(-1,i)/factorialNo(2*i))*Math.pow(x,2*i);
    }

    console.log(Math.cos(result));

    document.getElementById("serieTaylorResultado").innerHTML = result;
}


/*function potencia(x, n){

}*/