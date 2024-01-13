const accordeon = (triggerSelecor, itemSelector) => {
    const btns = document.querySelectorAll(triggerSelecor),
        blocks = document.querySelectorAll(itemSelector);

    btns.forEach((btn) => {
        btn.addEventListener('click', function () {
            btns.forEach((btn) => {
                if (!this.classList.contains('active-style')) {
                    btn.classList.remove('active-style');
                }
            });

            blocks.forEach((block) => {
                if (
                    !this.nextElementSibling.classList.contains(
                        'active-content'
                    )
                ) {
                    block.classList.remove('active-content');
                    block.style.maxHeight = '0px';
                }
            });

            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');

            if (this.classList.contains('active-style')) {
                this.nextElementSibling.style.maxHeight =
                    this.nextElementSibling.scrollHeight + 180 + 'px';
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });
};

export default accordeon;
