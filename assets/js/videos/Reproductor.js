export default class Reproductor {
    constructor() {
        this.videos = document.querySelectorAll('.video-interactivo');
        this.audio();
        this.fullScreen();
        this.escucharPantallaCompleta();
    }

    audio() {
        this.videos.forEach(video => {
            // Activa/desactiva sonido con un click
            video.addEventListener('click', () => {
                const card = video.closest('.video-card');
                const volumeIcon = card.querySelector('.volume-icon');
                const mutedIcon = card.querySelector('.muted-icon');
                const volumeText = card.querySelector('.video-volume .video-actions');
                const mutedText = card.querySelector('.video-muted .video-actions');

                const estabaMuteado = video.muted;

                // 1. Resetear todos los DEMÁS videos de la página (Mute y limpiar textos)
                // Solo si NO estamos en pantalla completa para no romper el video actual
                if (!document.fullscreenElement) {
                    this.videos.forEach(v => {
                        if (v !== video) { // Ignoramos el video que recibió el click
                            v.muted = true;
                            const vCard = v.closest('.video-card');
                            vCard.querySelector('.volume-icon').style.display = "none";
                            vCard.querySelector('.muted-icon').style.display = "block";
                            vCard.querySelector('.video-volume .video-actions').textContent = "";
                            vCard.querySelector('.video-muted .video-actions').textContent = "Tap para audio";
                        }
                    });
                }

                // 2. Cambiar el estado del video actual
                if (estabaMuteado) {
                    video.muted = false;
                    mutedIcon.style.display = "none";
                    volumeIcon.style.display = "block";

                    // Si estamos en pantalla completa, no pintamos texto para evitar bugs visuales
                    mutedText.textContent = "";
                    volumeText.textContent = document.fullscreenElement ? "" : "Doble tap para pantalla completa";
                } else {
                    video.muted = true;
                    mutedIcon.style.display = "block";
                    volumeIcon.style.display = "none";

                    volumeText.textContent = "";
                    mutedText.textContent = document.fullscreenElement ? "" : "Tap para audio";
                }
            });
        });
    }

    async fullScreen() {
        this.videos.forEach(video => {
            video.addEventListener('dblclick', async (e) => {
                // Detenemos la propagación para que el navegador no se confunda con clicks normales residuales
                e.stopPropagation();

                try {
                    const card = video.closest('.video-card');

                    if (document.fullscreenElement) {
                        await document.exitFullscreen();
                    } else {
                        if (card.requestFullscreen) {
                            await card.requestFullscreen();
                        } else if (video.webkitEnterFullscreen) {
                            video.webkitEnterFullscreen();
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        });
    }

    escucharPantallaCompleta() {
        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {



                //pausamos todos los videos al entrar a fullScreen 

                // Video que quedó en pantalla completa
                const videoActivo = document.fullscreenElement.querySelector("video");

                // Pausar todos los demás
                this.videos.forEach(video => {
                    if (video !== videoActivo) {
                        video.pause();
                    }
                });

                // Al entrar a pantalla completa, limpiamos los textos de la tarjeta activa de inmediato
                const cardActiva = document.fullscreenElement.closest('.video-card');
                if (cardActiva) {
                    const volumeText = cardActiva.querySelector('.video-volume .video-actions');
                    const mutedText = cardActiva.querySelector('.video-muted .video-actions');
                    if (volumeText) volumeText.textContent = "";
                    if (mutedText) mutedText.textContent = "";
                }
            } else {
                // Al salir, restauramos los textos originales basándonos estrictamente en el estado real de cada video
                this.videos.forEach(v => {

                    
                    v.play().catch(() => { });

                    const vCard = v.closest('.video-card');
                    const volumeIcon = vCard.querySelector('.volume-icon');
                    const mutedIcon = vCard.querySelector('.muted-icon');
                    const volumeText = vCard.querySelector('.video-volume .video-actions');
                    const mutedText = vCard.querySelector('.video-muted .video-actions');

                    if (v.muted) {
                        volumeIcon.style.display = "none";
                        mutedIcon.style.display = "block";
                        if (volumeText) volumeText.textContent = "";
                        if (mutedText) mutedText.textContent = "Tap para audio";
                    } else {
                        volumeIcon.style.display = "block";
                        mutedIcon.style.display = "none";
                        if (volumeText) volumeText.textContent = "Doble tap para pantalla completa";
                        if (mutedText) mutedText.textContent = "";
                    }
                });
            }
        });
    }
}