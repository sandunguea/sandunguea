function whatsApp() {
    //número de la Miss
    const numeroSandunguea = 525648546082;
    //seleccionamos todos los botones de whatsApp
    const btnsWhatsApp = document.querySelectorAll('[data-mensaje]');

    //un evento por cada btn
    btnsWhatsApp.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Obtenemos el mensaje específico de este botón
            const mensaje = btn.getAttribute('data-mensaje');
            // Construimos la URL usando encodeURIComponent para que no falle con acentos o espacios
            const url = `https://wa.me/${numeroSandunguea}?text=${encodeURIComponent(mensaje)}`;

            window.open(url, '_blank');
        });
    });
    

}


export {
    whatsApp
}