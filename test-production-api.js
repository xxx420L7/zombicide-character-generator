// Script para probar la API en producción con Groq
const DEPLOYMENT_URL = 'https://zombicide-web-app.vercel.app';

async function testProductionAPI() {
    console.log('🌐 Probando API en producción con Groq...');
    console.log(`🔗 URL: ${DEPLOYMENT_URL}`);

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
        console.log('\n📤 Enviando solicitud a la API...');

        const startTime = Date.now();
        const response = await fetch(`${DEPLOYMENT_URL}/api/generate-story`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        const responseTime = Date.now() - startTime;
        console.log(`⏱️  Tiempo de respuesta: ${responseTime}ms`);

        console.log(`📊 Status: ${response.status} ${response.statusText}`);

        const data = await response.json();
        console.log('\n📥 Respuesta completa:');
        console.log('━'.repeat(80));
        console.log(JSON.stringify(data, null, 2));
        console.log('━'.repeat(80));

        if (response.ok) {
            if (data.story) {
                console.log('\n✅ ¡API funcionando perfectamente!');
                console.log('📖 Historia generada:');
                console.log('━'.repeat(80));
                console.log(data.story);
                console.log('━'.repeat(80));

                console.log(`🤖 Modelo usado: ${data.model}`);

                if (data.fallback) {
                    console.log('⚠️  Se usó fallback procedural (la IA de Groq falló)');
                } else {
                    console.log('🎉 ¡Se usó IA real de Groq!');
                }

                if (responseTime < 2000) {
                    console.log(`⚡ ¡Ultra rápido! (${responseTime}ms)`);
                } else {
                    console.log(`🐌 Un poco lento (${responseTime}ms)`);
                }

            } else {
                console.log('❌ La respuesta no contiene historia');
            }
        } else {
            console.log('❌ Error en la API:');
            console.log('Error:', data.error);
            if (data.details) {
                console.log('Detalles:', data.details);
            }
            if (data.lastError) {
                console.log('Último error:', data.lastError);
            }

            console.log('\n🔧 Soluciones posibles:');
            console.log('1. Verifica que GROQ_API_KEY esté configurada en Vercel');
            console.log('2. Confirma que la API key es válida');
            console.log('3. Revisa los logs de Vercel para más detalles');
        }

    } catch (error) {
        console.error('💥 Error de red:', error.message);

        if (error.message.includes('fetch')) {
            console.log('\n💡 Problemas de conexión:');
            console.log('1. La aplicación podría estar desplegándose');
            console.log('2. Espera unos minutos y prueba de nuevo');
            console.log('3. Revisa la URL del deployment');
        }
    }
}

// Ejecutar prueba
console.log('🚀 Probando API de Zombicide con Groq en producción');
console.log('=' .repeat(80));

testProductionAPI().then(() => {
    console.log('\n✨ Prueba completada');

    console.log('\n📋 Resumen:');
    console.log('✅ Si ves historia con modelo Groq → ¡Perfecto!');
    console.log('⚠️  Si ves fallback → Problema con API key');
    console.log('❌ Si ves error → Problema de configuración');

    console.log('\n🎮 Para probar la aplicación completa:');
    console.log(`🌐 Abre: ${DEPLOYMENT_URL}`);
    console.log('📱 Genera un personaje y revisa la historia');

    console.log('\n🔧 Si hay problemas, revisa:');
    console.log('1. Console del navegador (F12)');
    console.log('2. Logs de Vercel: vercel --logs');
    console.log('3. Variables de entorno en Vercel dashboard');
});