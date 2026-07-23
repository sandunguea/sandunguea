import { registrarEvento } from "./analytics.js";
export const eventos = () => {



    const elementosAnalytics = document.querySelectorAll('[data-event]');
    elementosAnalytics.forEach(elemento => {
        elemento.addEventListener('click', (e) => {
            
            const evento = elemento.dataset.event;
            if(evento){
                registrarEvento(evento);
            }

        });


    });
}