export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { prompt } = req.body
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN

  if (!REPLICATE_API_TOKEN) {
    return res.status(500).json({ error: 'API key de Replicate no configurada en el servidor' })
  }

  if (!prompt || prompt.trim() === '') {
    return res.status(400).json({ error: 'El prompt no puede estar vacío' })
  }

  try {
    // Usar un modelo más actualizado y confiable de Stable Diffusion
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", // Stable Diffusion v1.5
        input: {
          prompt: prompt,
          width: 768,
          height: 1024,
          num_outputs: 1,
          num_inference_steps: 30,
          guidance_scale: 7.0,
          negative_prompt: "blurry, low quality, bad anatomy, 3d render, toy, chibi, anime, cartoonish, low contrast, flat shading, out of frame, extra limbs, extra fingers, bad hands, watermark, text, signature, nsfw, clean, pristine, colorful, bright, cheerful, plastic, shiny"
        }
      })
    })

    console.log('Respuesta de Replicate:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error en respuesta de Replicate:', errorText)

      if (response.status === 401) {
        return res.status(500).json({ error: 'API key de Replicate inválida o expirada. Por favor, verifica tu API key.' })
      } else if (response.status === 402) {
        return res.status(500).json({ error: 'No tienes crédito suficiente en tu cuenta de Replicate. Por favor, recarga tu cuenta.' })
      } else if (response.status === 429) {
        return res.status(429).json({ error: 'Demasiadas solicitudes. Por favor, espera unos segundos e intenta de nuevo.' })
      } else {
        return res.status(500).json({ error: `Error de API (${response.status}): ${errorText}` })
      }
    }

    const prediction = await response.json()
    console.log('Predicción creada:', prediction)

    if (prediction.error) {
      console.error('Error en predicción:', prediction.error)
      return res.status(500).json({ error: prediction.error })
    }

    if (!prediction.id) {
      console.error('Respuesta inesperada de Replicate:', prediction)
      return res.status(500).json({ error: 'Respuesta inesperada de la API de Replicate' })
    }

    // Devolver el ID de la predicción para que el frontend haga polling
    res.status(200).json({
      id: prediction.id,
      status: prediction.status,
      message: 'Generación de imagen iniciada correctamente'
    })

  } catch (error) {
    console.error('Error en API de generación:', error)
    res.status(500).json({
      error: 'Error al generar la imagen: ' + error.message,
      details: 'Verifica que tu API key de Replicate sea correcta y tengas crédito suficiente'
    })
  }
}