//funcion reutilizable que registra eventos en 4
export const registrarEvento = (nombreEvento, parametros = {}) => {
    if (typeof gtag === "function") {
        gtag("event", nombreEvento, parametros);
    }
}