export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  try {
    // Habilidades oficiales simplificadas de Zombicide 2nd Edition
    const character = {
      name: "Test",
      archetype: "Survivor",
      zone: "Zona Azul",
      experience: 2,
      health: 3,
      skills: [
        {
          name: "+1 Action",
          description: "El superviviente tiene una acción adicional que puede usar como desee.",
          zone: "blue",
          unlocked: true
        }
      ]
    };

    return res.status(200).json({ character });
  } catch (error) {
    return res.status(500).json({
      error: 'Error al generar el personaje',
      details: error.message
    });
  }
}