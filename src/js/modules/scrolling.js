const scrolling = (upSelector) => {
    /* появление pageup при скролле от шапки */
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    /* --------------- реализация плавного скролла через requestAnimationFrame JS --------------- */
    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;

    links.forEach((link) => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                // верхняя граница элемента к которому нужно скроллить
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);
            
            function step(time) {
                // первый ли раз запускается анимация
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                // r => колличество px на которое нужно пролистать в течении анимации и в какое направлении (вверх или низ)
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                // 0 - ось X, r - ось Y
                document.documentElement.scrollTo(0, r);

                // когда останавливать анимацию
                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }

        });
    });
};

export default scrolling;