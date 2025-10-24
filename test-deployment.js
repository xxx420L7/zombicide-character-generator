// Script para probar tu deployment en Vercel
// Reemplaza la URL con la de tu aplicación

const DEPLOYMENT_URL = 'https://zombicide-web-app.vercel.app'; // CAMBIA ESTA URL

async function testDeployment() {
    console.log('🌐 Probando API en deployment...');

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
        console.log(`📤 Enviando solicitud a: ${DEPLOYMENT_URL}/api/generate-story`);

        const response = await fetch(`${DEPLOYMENT_URL}/api/generate-story`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        console.log(`📊 Status: ${response.status} ${response.statusText}`);

        const data = await response.json();
        console.log('📥 Respuesta completa:', JSON.stringify(data, null, 2));

        if (response.ok) {
            if (data.story) {
                console.log('\n✅ API funcionando correctamente');
                console.log('📖 Historia generada:');
                console.log('━'.repeat(80));
                console.log(data.story);
                console.log('━'.repeat(80));
                console.log(`🤖 Modelo usado: ${data.model}`);
                if (data.fallback) {
                    console.log('⚠️ Se usó fallback procedural (la IA falló)');
                } else {
                    console.log('🎉 Se usó IA real');
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
        }

    } catch (error) {
        console.error('💥 Error de red:', error.message);

        if (error.message.includes('fetch')) {
            console.log('💡 Problemas de conexión. Verifica:');
            console.log('   1. La URL del deployment es correcta');
            console.log('   2. La aplicación está desplegada');
            console.log('   3. No hay bloqueos de red/CORS');
        }
    }
}

// Para ejecutar: node test-deployment.js
if (require.main === module) {
    console.log('🚀 Probando API de Zombicide en deployment');
    console.log('🔗 URL:', DEPLOYMENT_URL);
    console.log('='.repeat(80));

    testDeployment().then(() => {
        console.log('\n✨ Prueba completada');
        console.log('\n📋 Resumen:');
        console.log('✅ Si ves una historia generada → La API funciona');
        console.log('⚠️ Si ves fallback procedural → La IA falla (problema de API key)');
        console.log('❌ Si ves error → Problema de configuración o red');
    });
}