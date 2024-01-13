const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    function showImg(block) {
        const img = block.querySelector('img');
        img.classList.add('animated', 'fadeIn');
        // something.png => somthing-1.png
        img.src = img.src.slice(0, -4) + '-1.png';

        block.querySelectorAll('p:not(.sizes-hit)').forEach((p) => p.style.display = 'none');
    }

    function hideImg(block) {
        const img = block.querySelector('img');
        img.classList.remove('animated', 'fadeIn');
        // somthing-1.png => somthing.png
        img.src = img.src.slice(0, -6) + '.png';

        block.querySelectorAll('p:not(.sizes-hit)').forEach((p) => p.style.display = 'block');
    }

    blocks.forEach((block) => {
        block.addEventListener('mouseover', () => {
            showImg(block)
        });
        block.addEventListener('mouseout', () => {
            hideImg(block)
        });
    });
};

export default pictureSize;