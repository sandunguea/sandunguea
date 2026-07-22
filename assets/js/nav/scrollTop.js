let bloqueandoNavbar = false;

const scrollTop = () => {

    const links = document.querySelectorAll('a[href^="#"]');
    const nav = document.querySelector('.nav');

    links.forEach(link => {

        link.addEventListener('click', e => {

            e.preventDefault();

            const id = link.getAttribute('href');
            const section = document.querySelector(id);

            if (!section) return;

            // 👇 bloqueamos autohide
            bloqueandoNavbar = true;

            // 👇 mostramos navbar
            nav.classList.remove('minimizarNav');

            const offset = nav.offsetHeight;

            const top =
                section.getBoundingClientRect().top +
                window.scrollY -
                offset;

            window.scrollTo({
                top,
                behavior: 'smooth'
            });

            // 👇 desbloqueamos después de terminar scroll
            setTimeout(() => {
                bloqueandoNavbar = false;
            }, 900);

        });

    });

}

export {
    scrollTop,
    bloqueandoNavbar
}