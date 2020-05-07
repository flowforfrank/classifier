let classifier;
let net;

let trainingSets = [0, 0];

const loadClassifier = async () => {
    classifier = knnClassifier.create();
    net = await mobilenet.load();

    document.querySelector('.loading').classList.add('hidden');
};

const addExample = label => {
    const image = tf.browser.fromPixels(canvas);
    const feature = net.infer(image, 'conv_preds');

    classifier.addExample(feature, label);

    context.clearRect(0, 0, canvas.width, canvas.height);

    label === 'santa'
        ? (santaButton.innerText = `Santa (${++trainingSets[0]})`)
        : (elderlyButton.innerText = `Elderly (${++trainingSets[1]})`);

    document.querySelector('.info').innerText = `Trained classifier with ${label}`;

    image.dispose();
};

const predict = async () => {
    if (classifier.getNumClasses() > 0) {
        const image = tf.browser.fromPixels(canvas);
        const feature = net.infer(image, 'conv_preds');

        const result = await classifier.predictClass(feature);

        context.clearRect(0, 0, canvas.width, canvas.height);

        document.querySelector('.info').innerText = `Predicted to be ${result.label}`;

        image.dispose();
    }
};

loadClassifier();
