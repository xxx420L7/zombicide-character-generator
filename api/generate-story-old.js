export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { characterName, archetype, profession, location, lifeEvent, personality, age, survivalTime } = req.body
  const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY

  if (!HUGGINGFACE_API_KEY) {
    return res.status(500).json({ error: 'API key de Hugging Face no configurada' })
  }

  try {
    // Prompt estructurado para generar historias de Zombicide
    const structuredPrompt = `Genera una historia de personaje para el juego de mesa Zombicide 2nd Edition con los siguientes datos:

Nombre: ${characterName}
Arquetipo: ${archetype}
Edad: ${age} años
Profesión antes del apocalipsis: ${profession}
Lugar donde comenzó todo: ${location}
Evento traumático: ${lifeEvent}
Personalidad actual: ${personality}
Meses sobreviviendo: ${survivalTime}

INSTRUCCIONES IMPORTANTES:
- La historia debe tener entre 200-300 palabras
- Debe estar 100% en español (ninguna palabra en inglés)
- Debe ser coherente con el universo de Zombicide
- Incluir detalles sobre cómo el personaje se adaptó al nuevo mundo
- La historia debe sentirse realista y emocionante
- Mencionar cómo su profesión anterior le ayuda ahora
- Terminar con una reflexión sobre su supervivencia

La historia debe tener este formato:
"[Primer párrafo sobre antes del apocalipsis y cómo cambió todo]. [Segundo párrafo sobre su adaptación y habilidades actuales]. [Tercer párrafo sobre su perspectiva actual y futuro]."

Historia:`;

    // Usar Llama-3.1-8B-Instruct (excelente para español y narrativa)
    const response = await fetch(
      `https://api-inference.huggingface.co/models/meta-llama/Llama-3.1-8B-Instruct`,
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: structuredPrompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.8,
            top_p: 0.9,
            do_sample: true,
            return_full_text: false
          }
        })
      }
    );

    if (!response.ok) {
      console.error('Error en respuesta de Hugging Face:', response.status, response.statusText);
      return res.status(500).json({ error: 'Error al generar historia con IA' });
    }

    const data = await response.json();

    if (data.error) {
      console.error('Error en Hugging Face:', data.error);
      return res.status(500).json({ error: data.error });
    }

    // Extraer la historia generada
    let story = '';
    if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
      story = data[0].generated_text.trim();

      // Limpiar el texto si contiene el prompt original
      if (story.includes('Historia:')) {
        story = story.split('Historia:')[1].trim();
      }
    } else {
      return res.status(500).json({ error: 'Respuesta inesperada de Hugging Face' });
    }

    res.status(200).json({
      story: story,
      model: 'mistralai/Mistral-7B-Instruct-v0.2'
    });

  } catch (error) {
    console.error('Error en API de generación de historias:', error);
    res.status(500).json({
      error: 'Error al generar la historia: ' + error.message,
      details: 'Verifica que tu API key de Hugging Face sea correcta'
    });
  }
}