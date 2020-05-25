import { Jugador } from './jugador-class';

class Humano extends Jugador{
    static jugadorActivos = 0;

    static set setJugadoresActivos(numero){
        Humano.jugadorActivos = numero;
    }

    static disminuirJugadoresActivos(){
        Humano.jugadorActivos -= 1; 
    }

    static get getJugadoresActivos(){
        return Humano.jugadorActivos;
    }

    #activo = true;

    constructor(data){
        super(data);
    }

    set setActivo(data){
        this.#activo = data;
    }

    get getActivo(){
        return this.#activo;
    }
}

export{
    Humano
}