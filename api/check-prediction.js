export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { id } = req.query
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN

  if (!REPLICATE_API_TOKEN) {
    return res.status(500).json({ error: 'API key de Replicate no configurada' })
  }

  try {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      }
    })

    const prediction = await response.json()

    res.status(200).json({
      status: prediction.status,
      output: prediction.output,
      error: prediction.error
    })

  } catch (error) {
    console.error('Error al verificar predicción:', error)
    res.status(500).json({ error: 'Error al verificar el estado de la imagen' })
  }
}