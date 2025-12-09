let model;
let video;
let label = "Cargando...";

const MODEL_URL = "model/";   // Asegúrate que coincide EXACTO con tu carpeta

async function preload() {
  model = await tmImage.load(
    MODEL_URL + "model.json",
    MODEL_URL + "metadata.json"
  );
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  classifyVideo();
}

function draw() {
  image(video, 0, 0);

  // Mostrar etiqueta
  fill(0, 255, 0);
  textSize(32);
  textAlign(CENTER, BOTTOM);
  text(label, width / 2, height - 20);
}

async function classifyVideo() {
  const predictions = await model.predict(video.elt);

  // Buscar la clase con mayor probabilidad
  let bestLabel = "Detectando...";
  let bestProb = 0;

  for (let p of predictions) {
    if (p.probability > bestProb) {
      bestProb = p.probability;
      bestLabel = p.className;
    }
  }

  label = `${bestLabel} (${nf(bestProb * 100, 2, 1)}%)`;

  classifyVideo(); // sigue detectando
}
