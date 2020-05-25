import { Jugador } from "./jugador-class";
import { _ } from "../javascript/components";
import { crearCarta, esperar, mandarAlerta } from '../javascript/promesas';
import { Humano } from "./Humano";

class Computadora extends Jugador{
    static Instancia = null;

    #baraja = [];
    #Alertas = document.querySelector('#alertas');

    constructor(data){
        Computadora.Instancia = (!!!Computadora.Instancia)? super(data) : Computadora.Instancia;
        return Computadora.Instancia;
    }

    set setBaraja(baraja){
        this.#baraja = baraja;
    }

    get getBaraja(){
        return this.#baraja;
    }

    barajear(){
        const letras = ['C', 'D', 'H', 'S'],
                especial = {11: 'A', 12: 'J', 13: 'K', 14: 'Q'};
        for(let i = 2; i <= 14; i++){
            for(let letra of letras){
                const s = (i > 10) ? especial[i] : i;
                this.#baraja.push(s.toString() + letra)
            }    
        }
        const baraja = this.#baraja;
        this.#baraja = _.shuffle(baraja);
    }

    async darCarta(mode = 1, jugador = undefined){

        if (this.#baraja.length === 0){
            throw 'Ya no hay mas cartas'
        }
        const carta =  (this.#baraja.length >= 1) ? this.#baraja.pop() : null;
        const valor = this.calcularValorCarta(carta);
        if(mode == 1){
            return {carta, valor};
        }
        else if(mode == 2){
            jugador.setCarta = {carta, valor};
            await crearCarta(jugador, carta);
        }
        
    }

    async turnoComputadora(jugador,jugadores,botonPe, botonPa){
        botonPe.disabled = true;
        botonPa.disabled = true;
        const mejorPuntaje = this.carlcularMejorJugador(jugadores);
        console.log('Mejor Puntaje',mejorPuntaje);
        console.log(Computadora.Instancia)
        do{
            this.darCarta(2, jugador);
            if(mejorPuntaje > 21){
                break;
            }
        }
        while(super.getPuntos < 21 && super.getPuntos <= mejorPuntaje);
        this.asignarGanador(jugadores, mejorPuntaje);
    }

    carlcularMejorJugador(jugadores){
        const puntosOrdenados = [];
        jugadores.forEach(jugador => {
            puntosOrdenados.push(jugador.getPuntos);
        });
        puntosOrdenados.sort();
        console.log(puntosOrdenados);
        if(puntosOrdenados.length == 1)
        {
            return puntosOrdenados[puntosOrdenados.length - 1];
        }else{
            let aux = puntosOrdenados[0];
            puntosOrdenados.forEach(numero => {
                if(numero <= 21){
                    aux = (numero > aux)? numero: aux;
                }
            })
            return aux;
        }
    }

    calcularValorCarta(carta){
        let valor = carta.substring(0, carta.length - 1);
        return (valor === 'A') ? 11:
                (isNaN(valor)) ? 10 : valor*1;
    }

    async asignarGanador(jugadores, mejorPuntaje){
        let texto, clase;
        if(mejorPuntaje > 21 && super.getPuntos < 21){
            texto = `Todos Pierden`;
            clase = 'alert-danger';
            await mandarAlerta(texto, clase, this.#Alertas);
            await esperar(500);
        }
        else{
            for(let jugador of jugadores){
                if(jugador.getPuntos == super.getPuntos && super.getPuntos <= 21){
                    texto = `Jugador ${jugador.getUsuario} Empato`;
                    clase = 'alert-info';
                    console.log('1')
                }else if(jugador.getPuntos < super.getPuntos && super.getPuntos <= 21){
                    texto = `Jugador ${jugador.getUsuario} Perdio`;
                    clase = 'alert-danger';
                    console.log('2')
                }else if(jugador.getPuntos > super.getPuntos && jugador.getPuntos <= 21){
                    texto = `Jugador ${jugador.getUsuario} Gano`;
                    clase = 'alert-success';
                    console.log('3')
                }else if(jugador.getPuntos <= 21  && super.getPuntos > 21){
                    texto = `Jugador ${jugador.getUsuario} Gano`;
                    clase = 'alert-success';
                    console.log('4')
                }else if(jugador.getPuntos > 21){
                    texto = `Jugador ${jugador.getUsuario} Perdio`;
                    clase = 'alert-danger';
                    console.log('5')
                }
                await mandarAlerta(texto, clase, this.#Alertas);
                await esperar(500);
            }
        }
    }

    checarJugador(jugador, mode = 1){
        if(jugador.getPuntos > 21 || jugador.getPuntos === 21 || mode == 2){
            jugador.setActivo = false;
            (jugador.getPuntos > 21)? mandarAlerta(`Jugador ${jugador.getUsuario} Perdio`,'alert-danger', this.#Alertas): null;
            Humano.disminuirJugadoresActivos();
            return (jugador.getUsuario == Jugador.getNoJugadores)? 0: jugador.getUsuario;
        }else{
            return jugador.getUsuario - 1;
        }
    }

    async repartirCartas(jugadores){
        for(let jugador of jugadores){
            for(let i=0; i < 2; i++)
            {
                const {carta, valor} = await this.darCarta(1);
                jugador.setCarta = {carta, valor};
                await crearCarta(jugador, carta);
            }
            await esperar(1000);
        }
    }
}

export{
    Computadora
}