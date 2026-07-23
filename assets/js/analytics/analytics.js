//funcion reutilizable que registra eventos en GA4
export const registrarEvento = (nombreEvento, parametros = {}, callback = null) => {
    if (typeof gtag === "function") {
        gtag("event", nombreEvento, {
            ...parametros,
            event_callback: callback
        });
    }
}