export const registrarEvento = (
    nombreEvento,
    parametros = {},
    callback = null
) => {

    if (typeof gtag !== "function") {
        callback?.();
        return;
    }

    let ejecutado = false;

    const ejecutar = () => {
        if (ejecutado) return;
        ejecutado = true;
        callback?.();
    };

    gtag("event", nombreEvento, {
        ...parametros,
        event_callback: ejecutar,
        event_timeout: 1500
    });

    // Por si Analytics falla completamente
    setTimeout(ejecutar, 1600);
};