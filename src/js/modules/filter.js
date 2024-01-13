const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {
        markAll.forEach((mark) => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        if (markType.length) {
            markType.forEach((mark) => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        } else {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    };

    function clickToFilter(target, content) {
        menu.querySelector(`.${target}`).addEventListener('click', typeFilter(content));
    };

    menu.addEventListener('click', (e) => {
        let target = e.target;
        let btnClass = target.classList[0];
        let content = wrapper.querySelectorAll(`.${btnClass}`);

        clickToFilter(btnClass, content);
        
        if (target && target.tagName === 'LI') {
            items.forEach((item) => item.classList.remove('active'));
            target.classList.add('active');
        }
    });

};

export default filter;