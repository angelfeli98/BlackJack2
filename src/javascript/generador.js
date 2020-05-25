
const nuevoBoton = (id, clase,div) => {
    const boton = document.createElement('button');
    boton.setAttribute('id', id);
    //boton.classList.add(clase);
    div.append(boton)
}

export{
    nuevoBoton
}