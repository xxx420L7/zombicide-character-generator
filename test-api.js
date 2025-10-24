// Script para probar la API de generación de historias
const fetch = require('node-fetch');

async function testGenerateStoryAPI() {
    console.log('🧪 Probando API de generación de historias...');

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

    try {
        console.log('📤 Enviando datos:', JSON.stringify(testData, null, 2));

        const response = await fetch('http://localhost:3000/api/generate-story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        console.log(`📊 Status: ${response.status} ${response.statusText}`);

        const data = await response.json();
        console.log('📥 Respuesta:', JSON.stringify(data, null, 2));

        if (response.ok && data.story) {
            console.log('✅ API funcionando correctamente');
            console.log('📖 Historia generada:', data.story);
            console.log('🤖 Modelo usado:', data.model);
            if (data.fallback) {
                console.log('⚠️ Se usó fallback procedural');
            }
        } else {
            console.log('❌ Error en la API:', data.error || 'Error desconocido');
            if (data.details) {
                console.log('ℹ️ Detalles:', data.details);
            }
        }

    } catch (error) {
        console.error('💥 Error al conectar con la API:', error.message);
        console.log('💡 Asegúrate de que el servidor está corriendo en http://localhost:3000');
    }
}

// Probar también la API de imágenes
async function testGenerateImageAPI() {
    console.log('\n🖼️ Probando API de generación de imágenes...');

    const testData = {
        prompt: 'Carlos "El Lobo" García, 35 años, médico de emergencias, superviviente experto, Madrid, apocalipsis zombi, estilo Zombicide 2nd Edition, arte digital osuro, detallado'
    };

    try {
        const response = await fetch('http://localhost:3000/api/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        console.log(`📊 Status: ${response.status} ${response.statusText}`);

        const data = await response.json();
        console.log('📥 Respuesta:', JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log('✅ API de imágenes funcionando');
        } else {
            console.log('❌ Error en API de imágenes:', data.error || 'Error desconocido');
        }

    } catch (error) {
        console.error('💥 Error al conectar con API de imágenes:', error.message);
    }
}

// Ejecutar pruebas
console.log('🚀 Iniciando pruebas de APIs de Zombicide Web App');
console.log('=' .repeat(60));

testGenerateStoryAPI()
    .then(() => testGenerateImageAPI())
    .then(() => {
        console.log('\n✨ Pruebas completadas');
        console.log('\n💡 Si las APIs no funcionan localmente, verifica:');
        console.log('   1. Que las variables de entorno están configuradas en Vercel');
        console.log('   2. Que el proyecto está desplegado correctamente');
        console.log('   3. Las API keys son válidas y tienen créditos');
    })
    .catch(error => {
        console.error('💥 Error en las pruebas:', error);
    });