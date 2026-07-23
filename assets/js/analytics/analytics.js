//funcion reutilizable que registra eventos
export const registrarEvento = (
    nombreEvento,
    parametros = {},
    callback = null
) => {

    if (typeof gtag !== "function") return;

    gtag("event", nombreEvento, {
        ...parametros,
        event_callback: callback
    });

}