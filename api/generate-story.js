export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { characterName, archetype, profession, location, lifeEvent, personality, age, survivalTime } = req.body
  const GROQ_API_KEY = process.env.GROQ_API_KEY

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'API key de Groq no configurada' })
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

    // Lista de modelos Groq disponibles para intentar en orden de preferencia
    const models = [
      'llama-3.3-70b-versatile',
      'llama-3.1-8b-instant',
      'mixtral-8x7b-32768',
      'gemma2-9b-it'
    ];

    let lastError = null;

    for (const model of models) {
      try {
        console.log(`Intentando con modelo Groq: ${model}`);

        const response = await fetch(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              model: model,
              messages: [
                {
                  role: 'system',
                  content: 'Eres un experto en crear historias inmersivas para el juego de mesa Zombicide 2nd Edition. Genera historias coherentes, emocionantes y en español que encajen perfectamente en el universo del juego.'
                },
                {
                  role: 'user',
                  content: structuredPrompt
                }
              ],
              max_tokens: 500,
              temperature: 0.8,
              top_p: 0.9
            })
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error con modelo ${model}:`, response.status, errorText);
          lastError = `Modelo ${model}: ${response.status} ${errorText}`;
          continue;
        }

        const data = await response.json();

        if (data.error) {
          console.error(`Error en respuesta de ${model}:`, data.error);
          lastError = `Modelo ${model}: ${data.error}`;
          continue;
        }

        // Extraer la historia generada
        let story = '';
        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
          story = data.choices[0].message.content.trim();

          // Validar que la historia tenga contenido suficiente
          if (story.length > 50) {
            return res.status(200).json({
              story: story,
              model: model
            });
          }
        } else {
          lastError = `Respuesta inesperada del modelo ${model}`;
          continue;
        }
      } catch (error) {
        console.error(`Error con modelo ${model}:`, error.message);
        lastError = `Modelo ${model}: ${error.message}`;
        continue;
      }
    }

    // Si todos los modelos fallan, generar una historia procedural mejorada
    console.log('Todos los modelos de IA fallaron, usando generacion procedural mejorada');

    const proceduralStory = generarHistoriaProcedural(characterName, archetype, profession, location, lifeEvent, personality, age, survivalTime);

    return res.status(200).json({
      story: proceduralStory,
      model: 'procedural-enhanced',
      fallback: true,
      lastError: lastError
    });

  } catch (error) {
    console.error('Error en API de generación de historias:', error);
    res.status(500).json({
      error: 'Error al generar la historia: ' + error.message,
      details: 'Verifica que tu API key de Groq sea correcta'
    });
  }
}

function generarHistoriaProcedural(characterName, archetype, profession, location, lifeEvent, personality, age, survivalTime) {
  const firstName = characterName.split(' ')[0];

  const introductions = [
    `Antes del apocalipsis, ${characterName} era un ${profession.toLowerCase()} de ${age} años que vivía una vida normal en ${location}.`,
    `En su vida anterior, ${characterName} trabajaba como ${profession.toLowerCase()} en ${location}, donde tenía ${age} años y nunca imaginó lo que estaba por venir.`,
    `${characterName}, de ${age} años, era ${profession.toLowerCase()} en ${location} cuando el mundo que conocía comenzó a desmoronarse.`
  ];

  const developments = [
    `Cuando los muertos comenzaron a levantarse, ${lifeEvent.toLowerCase()}. Este evento traumático transformó completamente su perspectiva de la vida.`,
    `El día que todo cambió, ${lifeEvent.toLowerCase()}, forjando en ${firstName} una determinación de hierro para sobrevivir.`,
    `La caída de la civilización lo alcanzó cuando ${lifeEvent.toLowerCase()}. A partir de ese momento, solo una obsesión lo mantuvo con vida: sobrevivir.`
  ];

  const adaptations = [
    `Ahora, después de ${survivalTime} meses en este nuevo mundo, ${firstName} se ha convertido en un ${archetype.toLowerCase()}. Su experiencia como ${profession.toLowerCase()} le ha dado ventajas únicas para navegar entre los muertos vivientes.`,
    `Han pasado ${survivalTime} meses desde el comienzo del fin, y ${firstName} ha aprendido a adaptarse. Su trabajo como ${profession.toLowerCase()} le enseño habilidades que ahora aplica diariamente para sobrevivir.`,
    `En los ${survivalTime} meses de supervivencia, ${firstName} ha dominado las habilidades necesarias para ser un verdadero ${archetype.toLowerCase()}. Su pasado como ${profession.toLowerCase()} le provee una perspectiva única que otros no tienen.`
  ];

  const conclusions = [
    `Aunque ha perdido mucho, ${personality.toLowerCase()} sigue adelante, sabiendo que cada amanecer es una victoria más en este mundo infestado de zombis.`,
    `Con una personalidad ahora ${personality.toLowerCase()}, enfrenta cada día con la determinación de quien ha visto lo peor y aún así sigue de pie.`,
    `A pesar de todo, ${firstName} mantiene su esencia ${personality.toLowerCase()}, encontrando razones para continuar luchando en un mundo donde la humanidad está al borde de la extinción.`
  ];

  const intro = introductions[Math.floor(Math.random() * introductions.length)];
  const develop = developments[Math.floor(Math.random() * developments.length)];
  const adapt = adaptations[Math.floor(Math.random() * adaptations.length)];
  const conclusion = conclusions[Math.floor(Math.random() * conclusions.length)];

  return `${intro} ${develop} ${adapt} ${conclusion}`;
}