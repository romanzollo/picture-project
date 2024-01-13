const sliders = (slides, direction, prev, next, interval = '3000') => {
    let slideIndex = 1,
        paused = false;

        // next и prev ниже в try catch
    const items = document.querySelectorAll(slides);

    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach((item) => {
            item.classList.add('animated'); // css Animate
            item.style.display = 'none';
        });

        items[slideIndex - 1].style.display = 'block';
    }

    showSlides(slideIndex);

    function changeSlides(n) {
        showSlides(slideIndex += n);
    }
 
    // чтобы не было ошибок если кнопок 'prev', 'next' нет
    try {
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            changeSlides(-1);
            // классы из animate css
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });

        nextBtn.addEventListener('click', () => {
            changeSlides(1);
            // классы из animate css
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });

    } catch (error) {
        console.log(error);
    }

    // реализация остановки интервала при наведении на родительский блок слайдера (parentNode) и продолжение интервала после 'mouseleave' с родительского блока слайдера
    function activateAnimation() {
        if (direction === 'vertical') {
            paused = setInterval(() => {
                changeSlides(-1);
                // класс из animate css
                items[slideIndex - 1].classList.add('slideInDown');
            }, interval);
        } else {
            paused = setInterval(() => {
                changeSlides(-1);
                // классы из animate css
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, interval);
        }
    }
    activateAnimation();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
          
};

export default sliders;