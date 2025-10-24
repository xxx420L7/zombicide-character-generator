export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { id } = req.query
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN

  if (!REPLICATE_API_TOKEN) {
    return res.status(500).json({ error: 'API key de Replicate no configurada en el servidor' })
  }

  if (!id) {
    return res.status(400).json({ error: 'ID de predicción no proporcionado' })
  }

  try {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error al verificar predicción:', response.status, errorText)

      if (response.status === 401) {
        return res.status(500).json({ error: 'API key de Replicate inválida o expirada' })
      } else if (response.status === 404) {
        return res.status(404).json({ error: 'Predicción no encontrada' })
      } else {
        return res.status(500).json({ error: `Error al verificar predicción (${response.status}): ${errorText}` })
      }
    }

    const prediction = await response.json()
    console.log('Estado de predicción:', prediction.status)

    res.status(200).json({
      status: prediction.status,
      output: prediction.output,
      error: prediction.error,
      created_at: prediction.created_at,
      completed_at: prediction.completed_at
    })

  } catch (error) {
    console.error('Error al verificar predicción:', error)
    res.status(500).json({
      error: 'Error al verificar el estado de la imagen: ' + error.message
    })
  }
}