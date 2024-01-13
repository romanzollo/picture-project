const checkNumInput = (selector) => {
    const textInputs = document.querySelectorAll(selector);

    textInputs.forEach((input) => {
        input.addEventListener('keypress', (e) => {
            if (e.key.match(/[^а-я 0-9]/ig)) {
                e.preventDefault();
            }
        });
        input.addEventListener('input', (e) => {
            if (e.target.value.match(/[^а-я 0-9]/ig)) {
                e.target.value = '';
            }
        });
    });
};

export default checkNumInput;