export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { prompt } = req.body
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN

  if (!REPLICATE_API_TOKEN) {
    return res.status(500).json({ error: 'API key de Replicate no configurada' })
  }

  try {
    // Iniciar predicción
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        input: {
          prompt: prompt,
          width: 512,
          height: 768,
          num_outputs: 1,
          num_inference_steps: 25,
          guidance_scale: 8.0,
          negative_prompt: "cartoon, anime, manga, disney, pixar, 3d render, video game, cgi, overly smooth, plastic, toy-like, childish, colorful, bright, cheerful, clean, perfect, pristine, cartoonish, animated, game graphics, polygonal, low poly, toy, figurine, chibi, kawaii, cute"
        }
      })
    })

    const prediction = await response.json()

    if (prediction.error) {
      return res.status(500).json({ error: prediction.error })
    }

    // Devolver el ID de la predicción para que el frontend haga polling
    res.status(200).json({
      id: prediction.id,
      status: prediction.status
    })

  } catch (error) {
    console.error('Error en API de generación:', error)
    res.status(500).json({ error: 'Error al generar la imagen' })
  }
}