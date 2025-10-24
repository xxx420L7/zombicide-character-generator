// Prueba directa de la API sin necesidad de servidor local
console.log('🧪 Analizando el código de la API...');

// Simular los datos que se enviarían a la API
const testData = {
    characterName: 'Carlos "El Lobo" García',
    archetype: 'Superviviente',
    profession: 'Médico de emergencias',
    location: 'Madrid',
    lifeEvent: 'Perdió a su familia en el primer brote',
    personality: 'Valiente y protector',
    age: 35,
    survivalTime: 12
};

console.log('\n📤 Datos de prueba que se enviarían a la API:');
console.log(JSON.stringify(testData, null, 2));

// Verificar el prompt que se generaría
const structuredPrompt = `Genera una historia de personaje para el juego de mesa Zombicide 2nd Edition con los siguientes datos:

Nombre: ${testData.characterName}
Arquetipo: ${testData.archetype}
Edad: ${testData.age} años
Profesión antes del apocalipsis: ${testData.profession}
Lugar donde comenzó todo: ${testData.location}
Evento traumático: ${testData.lifeEvent}
Personalidad actual: ${testData.personality}
Meses sobreviviendo: ${testData.survivalTime}

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

console.log('\n📝 Prompt que se enviaría a Hugging Face:');
console.log('━'.repeat(80));
console.log(structuredPrompt);
console.log('━'.repeat(80));

// Verificar los modelos que se intentarían usar
const models = [
    'meta-llama/Llama-3.1-8B-Instruct',
    'mistralai/Mistral-7B-Instruct-v0.2',
    'google/gemma-7b-it',
    'microsoft/DialoGPT-medium'
];

console.log('\n🤖 Modelos que se intentarán usar (en orden):');
models.forEach((model, index) => {
    console.log(`${index + 1}. ${model}`);
});

// Generar historia de fallback para mostrarla
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

console.log('\n📖 Historia de fallback (si la IA falla):');
console.log('━'.repeat(80));
const fallbackStory = generarHistoriaProcedural(
    testData.characterName,
    testData.archetype,
    testData.profession,
    testData.location,
    testData.lifeEvent,
    testData.personality,
    testData.age,
    testData.survivalTime
);
console.log(fallbackStory);
console.log('━'.repeat(80));

console.log('\n🔍 Análisis completado');
console.log('\n💡 Próximos pasos para solucionar el problema:');
console.log('1. Verifica que HUGGINGFACE_API_KEY esté configurada en Vercel');
console.log('2. Verifica que la API key tenga créditos disponibles');
console.log('3. Prueba la API directamente en tu deployment de Vercel');
console.log('4. Revisa los logs de Vercel para ver errores específicos');

// URL para probar directamente
console.log('\n🌐 Para probar la API directamente en tu deployment:');
console.log('curl -X POST https://tu-app.vercel.app/api/generate-story \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'' + JSON.stringify(testData) + '\'');