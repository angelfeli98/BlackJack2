class Jugador{
    static _noJugadores = 0;

    static get getNoJugadores(){
        return Jugador._noJugadores;
    }

    static set setNoJugadores(numero){
        Jugador._noJugadores = numero;
    }

    #puntos = 0;
    #id = "";
    #cartas = [];
    #usuario = "";
    
    constructor({id, nombre}){
        this.#puntos = 0;
        this.#id = id;
        this.#usuario = nombre;
        Jugador._noJugadores++;
    }

    set setPuntos(puntos){
        this.#puntos = puntos;
    }

    set setUsuario(usuario){
        this.#usuario = usuario;
    }

    get getPuntos(){
        return this.#puntos;
    }

    get getId(){
        return this.#id;
    }

    set setCarta({carta, valor}){
        this.#cartas.push(carta);
        this.actualizarPuntos(valor);
    }

    reinicarCartas(){
        this.#cartas = [];
    }

    get getCartas(){
        return this.#cartas;
    }

    get getUsuario(){
        return this.#usuario;
    }

    actualizarPuntos(puntos){
        this.#puntos = this.#puntos + puntos; 
    }

}

export{
    Jugador
}