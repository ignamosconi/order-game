export function generarNumero(){

    let numero = Math.floor(Math.random() * 1000);

    if(numero == 0){
        numero = 1;
    }

    return numero;

}

