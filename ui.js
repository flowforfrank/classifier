const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const santaButton = document.querySelector('.santa');
const elderlyButton = document.querySelector('.elderly');

const onDrop = e => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = file => {
        const img = new Image();

        img.onload = () => {
            context.drawImage(img, 0, 0, 224, 224);
        };

        img.src = file.target.result;
    };

    reader.readAsDataURL(file);
};

canvas.addEventListener('dragover', e => e.preventDefault(), false);
canvas.addEventListener('drop', onDrop, false);

santaButton.addEventListener('click', () => addExample('santa'));
elderlyButton.addEventListener('click', () => addExample('elderly'));

document.querySelector('.predict').addEventListener('click', predict);
