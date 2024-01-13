import { postData } from "../services/requests";

const forms = (calcResult) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          // инпут загрузки изображения
          upload = document.querySelectorAll('[name="upload"]');
    
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png',
    };

    // создаем объект с разными адресами серверов для отправки изображения или текста
    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach((item) => {
            item.previousElementSibling.textContent = 'Фаил не выбран';
        });
    };

    upload.forEach((el) => {
        el.addEventListener('input', () => {
            console.log(el.files[0]);
            let dots;

            // пример split //
            // feretghggjthjhgfjj.jpg => split => ['feretghggjthjhgfjj', 'jpg']

            // оптимизируем код
            const arr = el.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            console.log(arr);
            
            const name = arr[0].substring(0, 6) + dots + arr[arr.length - 1];
            console.log(name);
            el.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            // добавляем стили css animate, и чтобы блок нам не мешал(не занимал место) скрываем его через setTimeout
            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            // создаем и добавляем спиннер
            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.append(statusImg);
            // так же создаем и добавляем текст оповещения загрузки
            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.append(textMessage);

            const formData = new FormData(item);
            if (item.classList.contains('calc_form')) {
                for (let key in calcResult) {
                    formData.append(key, calcResult[key]);
                }
            }
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        // возвращаем ранее удаленную форму
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                        // for calc.js
                        item.reset();
                        calcResult['price'] = 0;
                        document.querySelector('.calc-price').textContent = 'Для расчета нужно выбрать размер картины и материал картины';
                    }, 3000);
                });
        });
    });
};

export default forms;