
import { Humano } from '../classes/Humano';
import { Jugador } from '../classes/jugador-class';
import { mandarAlerta } from './promesas';
import { Computadora } from '../classes/Computadora';

const _ = require('underscore');

const botonDetener = document.querySelector('#btndetener'),
        botonNuevo = document.querySelector('#btnnuevo'),
        tags = document.querySelector('#turnoTag'),
        botonAgregar = document.querySelector('#btagregar'),
        botonPedir = document.querySelector('#btpedir'),
        tagNumeroJugadores = document.querySelector('#noJugadores'),
        tagTurno = document.querySelector('#turnoJugador'),
        divTablero = document.querySelector('#jugadorestableros'),
        divCompu = document.querySelector('#compuid'),
        divCargando = document.querySelector('.cargandoCartas'),
        botonPasar = document.querySelector('#btnpasar'),
        Alertas = document.querySelector('#alertas');

let jugadores = [];
let turnoActual = 0;
let computadora;

const configurarJuego = () => {
    const jugaorDeault = new Humano({id: (new Date()).getTime(),nombre: 1});
    jugadores.push(jugaorDeault);
}

const iniciarJuego = () => {
    botonAgregar.classList.toggle('ocultar');
    computadora = new Computadora({id: 'xxx',nombre: jugadores.length + 1});
    (divCompu.querySelector('small')).setAttribute('id',`juagador${computadora.getUsuario*10}`);
    (divCompu.querySelector('.divCartas')).setAttribute('id',`juagador${computadora.getUsuario}`);
    computadora.barajear();
    jugadores.forEach((jugador) => {
        const html = `
            <h2>Puntos Jugador ${jugador.getUsuario} - <small id = "juagador${jugador.getUsuario*10}">0</small></h2>
            <div id="juagador${jugador.getUsuario}" class="divCartas">
                <!-- <img class = "carta" src = "assets/cartas/10C.png"> -->
            </div>
        `;
        const div = document.createElement('div');
        div.classList.add('a');
        div.innerHTML = html;
        divTablero.appendChild(div);
    })
    Humano.setJugadoresActivos = jugadores.length;
    divCargando.classList.toggle('ocultar');
    botonNuevo.disabled = true;
    computadora.repartirCartas(jugadores).then(() =>{
        divCargando.classList.toggle('ocultar');
        tagTurno.classList.toggle('ocultar');
        botonPedir.classList.toggle('ocultar');
        botonDetener.classList.toggle('ocultar');
        computadora.darCarta(2, computadora);
        botonNuevo.classList.toggle('ocultar');
        botonPasar.classList.toggle('ocultar');
    })
    
};

const eventos = () => {
    botonAgregar.addEventListener('click',async () => {
        const data = {
            id: (new Date()).getTime(),
            nombre: (Humano.getNoJugadores + 1)
        }
        const nuevoJugador = new Humano(data);
        jugadores.push(nuevoJugador);
        tagNumeroJugadores.innerText = Jugador.getNoJugadores;     
        if(Jugador.getNoJugadores == 5){
            mandarAlerta('Maximo de Jugadores Alcanzados', 'alert-danger', Alertas);
            botonAgregar.disabled = true;
        } 
    })

    botonNuevo.addEventListener('click', () => {
        iniciarJuego();
    })

    botonPedir.addEventListener('click', () =>{
        if(Humano.getJugadoresActivos == 0){
            computadora.turnoComputadora(computadora, jugadores, botonPedir, botonPasar);
        }else if(jugadores[turnoActual].getActivo){
            computadora.darCarta(2, jugadores[turnoActual]);
            turnoActual = computadora.checarJugador(jugadores[turnoActual]);
            if(turnoActual == Jugador.getNoJugadores){
                turnoActual = 0;
            }
            botonPedir.disabled =  (Humano.getJugadoresActivos == 0)? true: false;
        }
        terminar();
    })

    botonPasar.addEventListener('click', () => {
        turnoActual = computadora.checarJugador(jugadores[turnoActual], 2);
        terminar();
    })

    botonDetener.addEventListener('click', () =>{
        turnoActual = 0;
        tags.innerText = turnoActual + 1;
        ((document.querySelector('#compuid')).querySelector('small')).innerText = 0;
        jugadores = [];
        divTablero.innerHTML = '';
        botonPedir.classList.toggle('ocultar');
        botonDetener.classList.toggle('ocultar');
        botonNuevo.classList.toggle('ocultar');
        botonPasar.classList.toggle('ocultar');
        botonAgregar.classList.toggle('ocultar');
        botonPedir.disabled = false;
        botonPasar.disabled = false;
        tagNumeroJugadores.innerText = 1;
        tagTurno.classList.toggle('ocultar');
        botonNuevo.disabled = false;
        (divCompu.querySelector('.divCartas')).innerHTML = '';
        computadora.setPuntos = 0;
        computadora.reinicarCartas();
        Jugador.setNoJugadores = 0;
        configurarJuego();
    })
}

const terminar = () => {
    if(Humano.getJugadoresActivos == 0){
        computadora.turnoComputadora(computadora, jugadores, botonPedir, botonPasar);
        botonDetener.innerText = "Reiniciar Juego";
    }
    tags.innerText = turnoActual + 1;
}

const init = async() => {
    configurarJuego();
    eventos();
}


export{
    init,
    _  
}

