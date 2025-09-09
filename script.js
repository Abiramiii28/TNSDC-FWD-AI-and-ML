let net;

const imageUpload = document.getElementById('imageUpload');

const preview = document.getElementById('preview');

const prediction = document.getElementById('prediction');

async function loadModel() {

  prediction.textContent = 'Loading model...';

  net = await mobilenet.load();

  prediction.textContent = 'Model loaded. Upload an image!';

}

imageUpload.addEventListener('change', async (event) => {

  const file = event.target.files[0];

  const reader = new FileReader();

  

  reader.onload = function(e) {

    preview.src = e.target.result;

    preview.style.display = 'block';

  };

  

  reader.readAsDataURL(file);

  preview.onload = async () => {

    prediction.textContent = 'Classifying...';

    const result = await net.classify(preview);

    prediction.textContent = `Prediction: ${result[0].className} (${(result[0].probability * 100).toFixed(2)}%)`;

  };

});

loadModel();