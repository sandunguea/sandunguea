const restringirCalendario = () => {
    const clase = document.querySelector('#clase');
    const fecha = document.querySelector('#fecha');
    let flatpickrInstance = null;
    
    // Configuración centralizada de clases
    const clasesConfig = {
        "Salsa en línea - Lunes 7:00 PM a 8:00 PM": {
            dias: [1], // Lunes
            placeholder: "Selecciona un Lunes para Salsa en Línea"
        },
        "Cumbia - Lunes y miércoles 8:00 PM a 9:00 PM": {
            dias: [1, 3], // Lunes y Miércoles
            placeholder: "Selecciona Lunes o Miércoles para Cumbia"
        },
        "Salsa Cubana - Lunes y miércoles 9:00 PM a 10:00 PM": {
            dias: [1, 3], // Lunes y Miércoles
            placeholder: "Selecciona Lunes o Miércoles para Salsa Cubana"
        },
        "Bachata - Jueves 8:00 PM a 9:00 PM": {
            dias: [4], // Jueves
            placeholder: "Selecciona un Jueves para Bachata"
        }
    };
    
    const destruirFlatpickr = () => {
        if (flatpickrInstance) {
            flatpickrInstance.destroy();
            flatpickrInstance = null;
        }
    };
    
    const inicializarFlatpickr = (config) => {
        destruirFlatpickr();
        
        flatpickrInstance = flatpickr("#fecha", {
            minDate: "today",
            disable: [
                function(date) {
                    return !config.dias.includes(date.getDay());
                }
            ],
            dateFormat: "d-m-Y",
            locale: {
                ...flatpickr.l10ns.es,
                firstDayOfWeek: 0
            },
            disableMobile: true,
            allowInput: false,
            onOpen: function(selectedDates, dateStr, instance) {
                instance.input.placeholder = config.placeholder;
            }
        });
        
        // Habilitar el input de fecha
        fecha.disabled = false;
    };
    
    clase.addEventListener('change', (e) => {
        fecha.value = "";
        
        const claseSeleccionada = clase.value;
        const config = clasesConfig[claseSeleccionada];
        
        if (config) {
            inicializarFlatpickr(config);
        } else {
            destruirFlatpickr();
            fecha.disabled = true;
            fecha.placeholder = "Selecciona una clase primero";
        }
    });
    
    // Inicializar si ya hay una clase seleccionada
    const claseInicial = clase.value;
    const configInicial = clasesConfig[claseInicial];
    if (configInicial) {
        inicializarFlatpickr(configInicial);
    } else if (claseInicial) {
        fecha.disabled = true;
        fecha.placeholder = "Clase no válida para agendar";
    }
}

export {
    restringirCalendario
}