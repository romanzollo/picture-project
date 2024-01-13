import { getResource } from "../services/requests";

const calc = (size, material, options, promocode, result, calcResult) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

    let sum = 0;

    function calcFunction() {
        
        getDataToValue(sizeBlock, 'http://localhost:3000/size');
        getDataToValue(materialBlock, 'http://localhost:3000/material');
        getDataToValue(optionsBlock, 'http://localhost:3000/options');

        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);
            calcResult['price'] = resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
            calcResult['price'] = resultBlock.textContent = sum;
        }
        console.log(calcResult);

    }

    // загрузка данных option.value с сервера
    function getDataToValue(selector, url) {
        let arr = [];

        getResource(url)
        .then((res) => {
            for (let value of Object.values(res[0])) {
                arr.push(value);
            }
        }); 

        setTimeout(() => {
           let i = 0;
            for (let option of selector.options) {
                option.value = arr[i];
                i++;
            } 
        }, 1000);   
    }

    

    sizeBlock.addEventListener('change', calcFunction);
    materialBlock.addEventListener('change', calcFunction);
    optionsBlock.addEventListener('change', calcFunction);
    promocodeBlock.addEventListener('input', calcFunction);
};


export default calc;