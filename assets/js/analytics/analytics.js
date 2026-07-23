//funcion reutilizable que registra eventos en GA4
export const registrarEvento = (nombreEvento, parametros = {}) => {
    if (typeof gtag === "function") {
        gtag("event", nombreEvento, parametros);
    }
}