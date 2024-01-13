import { postData } from "../services/requests";

const drop = () => {
    // drag *
    // dragend *
    // dragenter - объект над dropArea
    // dragleave - объект за пределами dropArea
    // dragexit *
    // dragover - объект зависает над dropArea
    // dragstart *
    // drop - объект отправлен в dropArea

    const fileInputs = document.querySelectorAll('[name="upload"]'),
          dropInput = document.querySelector('[data-drop]');
    
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
        fileInputs.forEach((input) => {
            input.addEventListener(eventName, preventDefaultFunction, false);
        });
    });

    function preventDefaultFunction(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = '3px solid #c51abb';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0,.5)';
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = 'none';
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else {
            item.closest('.file_upload').style.backgroundColor = '#f7e7e6';
        }
    }

    ['dragenter', 'dragover'].forEach((eventName) => {
        fileInputs.forEach((input) => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
        fileInputs.forEach((input) => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach((input) => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;

            let dots;

            // пример split //
            // feretghggjthjhgfjj.jpg => split => ['feretghggjthjhgfjj', 'jpg']

            // оптимизируем код
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            
            const name = arr[0].substring(0, 6) + dots + arr[arr.length - 1];
            input.previousElementSibling.textContent = name;

            if (input.hasAttribute('data-drop')) {
				const formData = new FormData(input.closest('form'));
                postData('assets/server.php', formData)
					.then((res) => {
						console.log(res);
					})
					.catch((res) => console.log(res))
					.finally(() => {
						setTimeout(() => {
							document.querySelector('[name="upload"]').previousElementSibling.textContent = 'Фаил не выбран';
						},3000)
					});
            }
        });
    });
};

export default drop;