import Reproductor from "./Reproductor.js";

const reproductor = new Reproductor();
const autoPause = () => {
    //seleccionamos el elemento que queremos observar
    const videos = document.querySelectorAll('.video-interactivo');

    //creamos una instancia de IntersectionObserver

    const opciones = {
        //no necesita que si o si estes a mitad de videos viendo para activar la reproducción
        threshold: 0.4,
        rootMargin: '100px'
    }
    const observer = new IntersectionObserver(isVisible, opciones);

    //asignando el elemento a observar
    videos.forEach(video => {
        observer.observe(video);
    });
    //una vez que le defines que observar se ejecuta su callback
    function isVisible(entradas) {
        //nos entrega un array IntersectionObserver
        entradas.forEach(entrada => {

            const video = entrada.target;


            //si se intersecciona activamos video
            if (entrada.isIntersecting) {
                const playVideo = () => {
                    video.play().catch(error => console.log(error));
                };

                if (video.readyState >= 3) {
                    playVideo();
                } else {
                    video.addEventListener('canplay', playVideo, { once: true });
                }

            } else {
                video.pause();

            };


        });


    }

}

export {
    autoPause
}