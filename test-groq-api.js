// Script para probar la API con Groq
console.log('🚀 Probando API con Groq...');

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

// Simular el prompt que se enviaría
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

console.log('📝 Prompt que se enviará a Groq:');
console.log('━'.repeat(80));
console.log(structuredPrompt);
console.log('━'.repeat(80));

console.log('\n🤖 Modelos Groq que se intentarán usar:');
const models = [
  'llama-3.1-70b-versatile',
  'llama-3.1-8b-instant',
  'mixtral-8x7b-32768',
  'gemma2-9b-it'
];

models.forEach((model, index) => {
    console.log(`${index + 1}. ${model}`);
});

console.log('\n📡 Estructura de la llamada a Groq:');
const groqRequest = {
    model: 'llama-3.1-70b-versatile',
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
};

console.log(JSON.stringify(groqRequest, null, 2));

console.log('\n🌐 Para probar tu API en producción:');
console.log('curl -X POST https://tu-app.vercel.app/api/generate-story \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'' + JSON.stringify(testData) + '\'');

console.log('\n💡 Ventajas de Groq sobre Hugging Face:');
console.log('✅ Mucho más rápido (response time: <1s vs 5-10s)');
console.log('✅ Rate limits más generosos');
console.log('✅ 99.9% uptime garantizado');
console.log('✅ Soporte nativo para español');
console.log('✅ Modelos optimizados para chat');

console.log('\n⚠️ Pasos para desplegar:');
console.log('1. Los cambios ya están en tu código');
console.log('2. Confirma que GROQ_API_KEY está configurada en Vercel');
console.log('3. Haz deploy a Vercel');
console.log('4. Prueba la generación de personajes');

console.log('\n🎉 ¡Todo listo para probar las historias con IA real!');