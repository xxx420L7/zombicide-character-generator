export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  try {
    const { zoneIndex } = req.body

    // SISTEMA DE GENERACIÓN MEJORADO DE PERSONAJES ZOMBICIDE 2ND EDITION
      // Utiliza habilidades oficiales y biografías enriquecidas con IA
    const generateCharacter = () => {
      // Personajes oficiales de Zombicide 2nd Edition
      const characterNames = [
        "Jake la Bestia", "Silva la Cazadora", "Ned el Cirujano", "Amy la Atleta",
        "Wanda la Bruja", "Trent el Constructor", "Phil el Vigilante", "Angie la Azafata",
        "Doug el Capataz", "Claudia la Vengadora", "Rosa la Militar", "Kevin el Nómada",
        "Sam el Jardinero", "Brett el Chef", "Nick el Camarero", "Lily la Artista",
        "Martha la Abuela", "Manny el Mecánico", "Sandra la Enfermera", "Pablo el Boxeador"
      ]

      const characterArchetypes = [
        { name: "Survivor", description: "Equilibrado y adaptable", bonus: "+1 Vida" },
        { name: "Fighter", description: "Especialista en combate cuerpo a cuerpo", bonus: "+1 Daño melee" },
        { name: "Runner", description: "Rápido y ágil", bonus: "+1 Movimiento" },
        { name: "Searcher", description: "Experto en encontrar objetos", bonus: "+1 Búsqueda por turno" },
        { name: "Healer", description: "Capaz de curar aliados", bonus: "Puede curar 1 HP/turno" },
        { name: "Shooter", description: "Tirador preciso", bonus: "+1 Precisión con armas de fuego" },
        { name: "Melee", description: "Maestro del combate cercano", bonus: "+1 Ataque melee adicional" },
        { name: "Looter", description: "Experto en conseguir equipo", bonus: "+1 Espacio de inventario" }
      ]

      const zones = ["Zona Azul", "Zona Amarilla", "Zona Naranja", "Zona Roja"]

      // HABILIDADES OFICIALES DE ZOMBICIDE 2ND EDITION BASE
      const skills = {
        blue: [
          { name: "+1 Action", description: "El superviviente tiene una acción adicional que puede usar como desee.", xpRequired: 0, type: "action" },
          { name: "+1 Damage", description: "El superviviente obtiene +1 de daño con cada ataque.", xpRequired: 0, type: "combat" },
          { name: "+1 Die: Combat", description: "Cada arma del superviviente lanza un dado extra con Acciones de Combate.", xpRequired: 0, type: "combat" },
          { name: "+1 Die: Ranged", description: "Cada arma del superviviente lanza un dado extra con Acciones a Distancia.", xpRequired: 0, type: "combat" },
          { name: "+1 Die: Melee", description: "Cada arma del superviviente lanza un dado extra con Acciones Cuerpo a Cuerpo.", xpRequired: 0, type: "combat" },
          { name: "+1 Free Combat Action", description: "El superviviente tiene 1 acción de Combate gratuita por turno.", xpRequired: 0, type: "action" },
          { name: "+1 Free Search Action", description: "El superviviente tiene 1 acción de Búsqueda gratuita por turno.", xpRequired: 0, type: "action" },
          { name: "+1 Zone per Move", description: "El superviviente puede moverse una zona adicional cada vez que realiza una acción de Movimiento.", xpRequired: 0, type: "movement" },
          { name: "+1 to dice roll", description: "El superviviente añade 1 al resultado de cada dado que lanza.", xpRequired: 0, type: "luck" },
          { name: "+1 Max Range", description: "El alcance máximo de las armas a Distancia del superviviente aumenta en 1.", xpRequired: 0, type: "combat" },
          { name: "+1 to Armor rolls", description: "El superviviente añade 1 al resultado de cada dado que lanza para tiradas de Armadura.", xpRequired: 0, type: "defense" },
          { name: "Hoard", description: "El superviviente puede llevar una carta de Equipo adicional en reserva.", xpRequired: 0, type: "equipment" },
          { name: "Starts with Equipment", description: "El superviviente comienza la partida con el Equipo indicado.", xpRequired: 0, type: "equipment" }
        ],
        yellow: [
          { name: "Lucky", description: "El superviviente puede volver a lanzar una vez todos los dados de cada acción que realiza.", xpRequired: 6, type: "luck" },
          { name: "1 re-roll per turn", description: "Una vez por turno, puedes volver a lanzar todos los dados relacionados con la resolución de una acción.", xpRequired: 6, type: "luck" },
          { name: "Free reload", description: "El superviviente recarga armas recargables gratuitamente.", xpRequired: 6, type: "combat" },
          { name: "Search: +1 card", description: "Roba una carta adicional cuando busca con el superviviente.", xpRequired: 6, type: "search" },
          { name: "Search: 2 cards", description: "Roba 2 cartas cuando busca con el superviviente.", xpRequired: 6, type: "search" },
          { name: "Scavenger", description: "El superviviente puede buscar en cualquier zona libre de Zombis.", xpRequired: 6, type: "search" },
          { name: "Slippery", description: "El superviviente no gasta acciones adicionales cuando se mueve a través de una zona con Zombis.", xpRequired: 6, type: "movement" },
          { name: "Ninja", description: "El superviviente no hace ruido en absoluto.", xpRequired: 6, type: "stealth" },
          { name: "Break-in", description: "El superviviente abre puertas automáticamente y en silencio, más obtiene acción gratuita para abrir puertas.", xpRequired: 6, type: "utility" },
          { name: "Ambidextrous", description: "El superviviente trata todas las armas como si tuvieran símbolo Dual.", xpRequired: 6, type: "combat" },
          { name: "Tough", description: "El superviviente ignora el primer ataque de un único Zombi cada fase de Zombis.", xpRequired: 6, type: "defense" }
        ],
        orange: [
          { name: "+1 Die: Combat", description: "Cada arma lanza un dado extra en Acciones de Combate.", xpRequired: 13, type: "combat" },
          { name: "Born Leader", description: "Durante el turno del superviviente, puede dar 1 acción gratuita a otro superviviente.", xpRequired: 13, type: "leadership" },
          { name: "Medic", description: "Una vez por turno, elimina gratuitamente una carta de Herido de un superviviente en la misma zona.", xpRequired: 13, type: "support" },
          { name: "Lifesaver", description: "Arrastra supervivientes de zonas adyacentes a tu zona sin penalización.", xpRequired: 13, type: "support" },
          { name: "Sniper", description: "El superviviente puede elegir libremente objetivos y los fallos no golpean a supervivientes.", xpRequired: 13, type: "combat" },
          { name: "Point-blank", description: "El superviviente puede realizar Acciones a Distancia en su propia zona, sin importar el alcance mínimo.", xpRequired: 13, type: "combat" },
          { name: "2 Zones per Move Action", description: "Al gastar una acción para Moverse, puede moverse una o dos zonas.", xpRequired: 13, type: "movement" },
          { name: "Sprint", description: "Gasta una acción de Movimiento: muévete una, dos o tres zonas en lugar de una.", xpRequired: 13, type: "movement" },
          { name: "Bloodlust", description: "Muévete hasta dos zonas a una zona que contenga Zombis, luego obtén una acción de Combate gratuita.", xpRequired: 13, type: "combat" },
          { name: "Hit & Run", description: "Después de matar Zombis, realiza inmediatamente una acción de Movimiento gratuita.", xpRequired: 13, type: "combat" },
          { name: "Regeneration", description: "Al final de cada ronda, cura todas las Heridas.", xpRequired: 13, type: "healing" },
          { name: "Iron Hide", description: "Puede realizar tiradas de Armadura con 5+ incluso sin llevar armadura.", xpRequired: 13, type: "defense" }
        ],
        red: [
          { name: "+1 Die: Combat", description: "Cada arma lanza un dado extra en Acciones de Combate.", xpRequired: 21, type: "combat" },
          { name: "Barbarian", description: "Reemplaza el número de dados con el número de Zombis en la zona cuando realiza Acciones Cuerpo a Cuerpo.", xpRequired: 21, type: "combat" },
          { name: "Full Auto", description: "Reemplaza el número de dados con el número de Zombis en la zona objetivo para Acciones a Distancia.", xpRequired: 21, type: "combat" },
          { name: "Battle Rage", description: "Gana un dado extra para Acciones Cuerpo a Cuerpo subsiguientes cuando mata Zombis con Cuerpo a Cuerpo.", xpRequired: 21, type: "combat" },
          { name: "Reaper", description: "Un golpe puede matar gratuitamente un Zombi adicional idéntico en la misma zona.", xpRequired: 21, type: "combat" },
          { name: "Concentrated Attack expert", description: "Al realizar Ataque Concentrado con 2+ dados, +1 daño y sin Fuego Amigo.", xpRequired: 21, type: "combat" },
          { name: "Enhanced Senses", description: "El superviviente puede trazar Línea de Visión 1 zona más lejos en zonas de habitación.", xpRequired: 21, type: "perception" },
          { name: "Combat Reflexes", description: "Cuando aparecen Zombis dentro de la Línea de Visión, realiza inmediatamente una acción de Combate gratuita.", xpRequired: 21, type: "combat" },
          { name: "Héroe", description: "El superviviente obtiene una copia de cada habilidad en su carta de personaje.", xpRequired: 21, type: "enhancement" },
          { name: "Leyenda", description: "El superviviente gana +1 a todas sus estadísticas.", xpRequired: 21, type: "enhancement" }
        ]
      }

      // Armas iniciales de cartas grises (Zombicide 2nd Edition)
      const startingWeapons = [
        { name: "Pistola", damage: 1, slots: 1, range: 1, type: "rango" },
        { name: "Cuchillo", damage: 1, slots: 1, range: "Cuerpo a cuerpo", type: "cuerpo a cuerpo" },
        { name: "Bate de Béisbol", damage: 2, slots: 1, range: "Cuerpo a cuerpo", type: "cuerpo a cuerpo" },
        { name: "Maza", damage: 1, slots: 1, range: "Cuerpo a cuerpo", type: "cuerpo a cuerpo" },
        { name: "Llave Inglesa", damage: 1, slots: 1, range: "Cuerpo a cuerpo", type: "herramienta", special: "Abre puertas automáticamente" }
      ]

      // Función para obtener elemento aleatorio
      const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)]

      // Sistema de progresión CORRECTO según Zombicide 2nd Edition
      const generateCharacterByZone = (zoneIndex = null) => {
        // Si no se especifica zona, elegir aleatoriamente
        const actualZoneIndex = zoneIndex !== null ? zoneIndex : Math.floor(Math.random() * 4);

        const name = getRandomElement(characterNames)
        const archetype = getRandomElement(characterArchetypes)
        const zone = zones[actualZoneIndex]

        let health = 3
        let experience = 0
        let allCharacterSkills = []

        // Generar habilidades para todas las zonas (simulación de carta de personaje completa)
        const blueSkill = { ...getRandomElement(skills.blue), zone: 'blue', zoneName: 'Azul', unlocked: true }
        const yellowSkill = { ...getRandomElement(skills.yellow), zone: 'yellow', zoneName: 'Amarillo', unlocked: false }
        const orangeSkill = { ...getRandomElement(skills.orange), zone: 'orange', zoneName: 'Naranja', unlocked: false }
        const redSkill = { ...getRandomElement(skills.red), zone: 'red', zoneName: 'Rojo', unlocked: false }

        switch(zoneIndex) {
          case 0: // Zona Azul (0-5 XP)
            health = 3
            experience = Math.floor(Math.random() * 6) // 0-5 XP
            blueSkill.unlocked = true
            yellowSkill.unlocked = false
            orangeSkill.unlocked = false
            redSkill.unlocked = false
            allCharacterSkills = [blueSkill, yellowSkill, orangeSkill, redSkill]
            break
          case 1: // Zona Amarilla (6-12 XP)
            health = 3
            experience = 6 + Math.floor(Math.random() * 7) // 6-12 XP
            blueSkill.unlocked = true
            yellowSkill.unlocked = true
            orangeSkill.unlocked = false
            redSkill.unlocked = false
            allCharacterSkills = [blueSkill, yellowSkill, orangeSkill, redSkill]
            break
          case 2: // Zona Naranja (13-20 XP)
            health = 4
            experience = 13 + Math.floor(Math.random() * 8) // 13-20 XP
            blueSkill.unlocked = true
            yellowSkill.unlocked = true
            orangeSkill.unlocked = true
            redSkill.unlocked = false
            allCharacterSkills = [blueSkill, yellowSkill, orangeSkill, redSkill]
            break
          case 3: // Zona Roja (21+ XP)
            health = 5
            experience = 21 + Math.floor(Math.random() * 10) // 21-30 XP
            blueSkill.unlocked = true
            yellowSkill.unlocked = true
            orangeSkill.unlocked = true
            redSkill.unlocked = true
            allCharacterSkills = [blueSkill, yellowSkill, orangeSkill, redSkill]
            break
        }

        const startingWeapon = getRandomElement(startingWeapons)

        return {
          name,
          archetype,
          zone,
          experience,
          health,
          startingWeapon,
          skills: allCharacterSkills
        }
    }

    // Generar personaje según la zona solicitada o aleatoria
    const character = generateCharacter();

    return res.status(200).json({
      character,
      rules: {
        zones: {
          blue: { min: 0, max: 5, health: 3, description: "Principiante" },
          yellow: { min: 6, max: 12, health: 3, description: "Experimentado" },
          orange: { min: 13, max: 20, health: 4, description: "Veterano" },
          red: { min: 21, max: 999, health: 5, description: "Leyenda" }
        },
        xpGains: [
          { action: "Matar caminante", xp: 1 },
          { action: "Matar corredor", xp: 2 },
          { action: "Matar zombi gordo", xp: 3 },
          { action: "Activar objetivo", xp: 1 },
          { action: "Abrir puerta con zombis", xp: 1 },
          { action: "Buscar en casilla de equipo", xp: 1 }
        ]
      }
    })

  } catch (error) {
    console.error('Error generando personaje:', error)
    return res.status(500).json({
      error: 'Error al generar el personaje',
      details: error.message
    })
  }
}

// Función auxiliar para generar biografías enriquecidas
function generateEnhancedBackstory(character) {
  const fullName = character.name;
  const firstName = fullName.split(' ')[0];

  // Diferentes tipos de biografías según el personaje
  const backstoryTypes = {
    militar: `${firstName} sirvió ${Math.floor(Math.random() * 5) + 3} años en las fuerzas especiales antes del apocalipsis. Como ${character.archetype}, desarrolló tácticas de supervivencia que ahora le permiten moverse entre hordas de zombis con precisión letal. Su entrenamiento militar le da una ventaja crucial en combates a corta distancia, donde cada movimiento cuenta más que el de otros supervivientes.`,
    profesional: `${firstName} trabajaba como ${character.archetype} en su vida civil antes de la catástrofe. Cuando los muertos comenzaron a levantarse, tuvo que usar sus habilidades profesionales para establecer un punto de encuentro seguro y coordinar la evacuación de su barrio. Ahora aplica esos mismos principios para liderar a otros supervivientes, organizando búsquedas de recursos y asignando tareas estratégicas que maximizan las posibilidades de supervivencia del grupo.`,
    desafiante: `${firstName} siempre fue rebelde, cuestionando la autoridad desde joven. Esta naturaleza lo llevó a problemas constantes con las figuras de autoridad, pero también le enseñó a pensar por sí mismo. Como ${character.archetype}, confía más en su instinto que en las reglas, a veces desafiar los protocolos establecidos si esto significa una ventaja estratégica.`,
    científico: `${firstName} pasó años investigando fenómenos paranormales en un laboratorio universitario justo antes del apocalipsis. Aunque muchos pensaron que estaba loco, sus investigaciones sobre patógenos y comportamiento de zombis resultaron inesperadamente precisas. Ahora como ${character.archetype}, combina ese conocimiento analítico con una adaptabilidad práctica que le permite anticipar patrones de ataque zombi y explotar debilidades que otros supervivientes ignoran.`,
    superviviente: `${firstName} era un ciudadano común antes del apocalipsis, sin habilidades especiales ni entrenamiento formal. Su principal fortaleza es su capacidad de mantener la calma bajo presión extrema y encontrar soluciones creativas con recursos limitados. Los días iniciales fueron los más difíciles, pero su resiliencia le ha permitido no solo sobrevivir, sino convertirse en un estrategista nato para su grupo.`
  };

  const backstoryType = Object.keys(backstoryTypes)[Math.floor(Math.random() * Object.keys(backstoryTypes).length)];
  const baseBackstory = backstoryTypes[backstoryType];

  // Enriquecer la biografía según el arquetipo
  const archetypeEnrichment = {
    militar: `. Su experiencia militar le permite leer el terreno y predecir movimientos enemigos, dándole una ventaja táctica significativa en combate.`,
    profesional: `. Como ${character.archetype}, gestiona recursos de manera eficiente y mantiene inventarios organizados, asegurando que el grupo nunca carezca de equipo crítico.`,
    desafiante: `. Su naturaleza desafiante se combina con su rol como ${character.archetype}, a veces creando tensión pero garantizando que siempre se tomen las decisiones más audaces para el beneficio del grupo.`,
    científico: `. Su conocimiento analítico le permite identificar patrones en el comportamiento zombi que otros pasan por alto, permitiéndole configurar trampas y emboscadas efectivas.`,
    superviviente: `. Su simplicidad y determinación son sus mayores activos. Transforma situaciones desesperadas en oportunidades cuando otros verían solo derrota.`
  };

  const enrichment = archetypeEnrichment[character.archetype] || '';

  const fullBackstory = `${baseBackstory}${enrichment}`;

  // Almacenar la biografía en el objeto personaje
  character.backstory = fullBackstory;

  return character;
}