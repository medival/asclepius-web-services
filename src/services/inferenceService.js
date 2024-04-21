const tf = require('@tensorflow/tfjs-node');

const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const prediction = model.predict(tensor);

    const classResult = await prediction.data();

    if (classResult[0] === 1) {
      result = 'Cancer';
      suggestion = "Segera periksa ke dokter!";
    } else {
      result = 'Non-cancer';
      suggestion = "Anda sehat!";
    }

    return { result, suggestion }
  } catch (error) {
    throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`)
  }
}

module.exports = predictClassification;