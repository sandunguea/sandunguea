const alertas = (tipo, mensaje, referencia) => {


    //limpiamos la alerta primero
    limpiarAlerta(referencia);
    
    
    const alerta = document.querySelector('.alertas');
    //si no existe la alerta la imprimimos, sí no NO
    if (!alerta) {
        //creamos nuestro contenedor para la alerta
        const alerta = document.createElement('DIV');
        //agregamos clases genericas para el contenedor
        alerta.classList.add('div-alertas');
        //si es error le damos el estilo del error
        if (tipo === 'error') {
            alerta.classList.add('error');
        } else {
            alerta.classList.add('success');
        }
        //agregamos el mensaje de error a nuestro div
        alerta.textContent = mensaje;
        //inyectamos la alerta al dom
        referencia.appendChild(alerta);
        //eliminamos alerta despues de 3seg
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

const limpiarAlerta = (referencia) => {
    console.log(referencia);
    
    while (referencia.firstChild) {
        referencia.removeChild(referencia.firstChild);
    }
}

export {
    alertas,
    limpiarAlerta
}