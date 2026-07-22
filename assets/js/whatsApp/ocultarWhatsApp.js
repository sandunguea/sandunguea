const hideWhatsApp = () => {
    //boton flotante
    const btnWhatsApp = document.querySelector(".wa-wrapper");
    const footer = document.querySelector(".cierre");


    window.addEventListener('scroll', () => {

        const footerRect = footer.getBoundingClientRect();



        const trigger = 120; // px antes del footer

        if (footerRect.top < window.innerHeight - trigger) {
            btnWhatsApp.classList.add('hide');


        } else {
            btnWhatsApp.classList.remove('hide');
        }
    });

}


const pauseAnimation = () => {
    //seleccionamos el botón
    const btnWhatsApp = document.querySelector(".wa-wrapper");
    //opciones para insersection
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 0
    };
    //funcion que ejecuta intersection observer
    const callback = (entradas, observador) => {


        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                btnWhatsApp.classList.add('pause-animation');
                console.log('ya lo vi');
                


            } else {

                btnWhatsApp.classList.remove('pause-animation');
                console.log('No lo veo');

            };

        });

    }

    //instanciar función
    const observer = new IntersectionObserver(callback, options);

    const sadungueaSection = document.querySelector('.vive-sandunguea');
    //a quien observa
    observer.observe(sadungueaSection);




}


export {
    hideWhatsApp,
    pauseAnimation
}