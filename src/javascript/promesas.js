 
const crearCarta = async (jugador, carta) => {
    //await esperar(1000);
    const cartaimg = document.createElement('img');
    cartaimg.src = `src/assets/${carta}.png`;
    cartaimg.classList.add('carta'); 
    const div = document.querySelector(`#juagador${jugador.getUsuario}`)
    div.append(cartaimg);
    const tag = document.querySelector(`#juagador${jugador.getUsuario*10}`);
    tag.innerText = jugador.getPuntos;
    await esperar(1500);
}

const esperar = (ms) => {
    return new Promise((resolve, reject) =>{
        setTimeout(resolve, ms)
    })
}

const mandarAlerta = async (texto,clase,div) => {
    div.classList.toggle('ocultar');
    div.innerText = texto;
    div.classList.remove('alert-success', 'alert-danger', 'alert-warning');
    div.classList.add(clase);
    await esperar(2500);
    div.classList.toggle('ocultar');
}


export{
    crearCarta,
    esperar,
    mandarAlerta
} 