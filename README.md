# Generador de Personajes Zombicide 2nd Edition

Generador de personajes con IA para el juego de mesa Zombicide, con sistema de usuarios y guardado en la nube.

## 🚀 Despliegue

### 1. Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto
2. Ejecuta el script `supabase-setup.sql` en el editor SQL de Supabase
3. Ve a Settings → API y copia:
   - Project URL
   - anon public key

### 2. Configurar Vercel

1. Instala Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Conecta el repositorio a Vercel

3. Configura las variables de entorno en Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`: URL de tu proyecto Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon key de Supabase
   - `REPLICATE_API_TOKEN`: Token de Replicate API

### 3. Despliegue

```bash
vercel --prod
```

## 🎮 Características

- ✅ Generación de personajes Zombicide fieles al juego
- ✅ Creación de imágenes únicas con Stable Diffusion
- ✅ Sistema de usuarios con registro/login
- ✅ Guardado de personajes en la nube
- ✅ Descarga de personajes en JSON
- ✅ Impresión optimizada
- ✅ Diseño responsive

## 🔧 Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Vercel Serverless Functions
- **Base de Datos**: Supabase (PostgreSQL)
- **IA**: Stable Diffusion vía Replicate API
- **Autenticación**: Supabase Auth

## 📁 Estructura del Proyecto

```
zombicide-web-app/
├── public/
│   └── index.html          # Aplicación principal
├── src/
│   └── lib/
│       └── supabase.js     # Cliente Supabase
├── api/
│   ├── generate-image.js   # API para generar imágenes
│   └── check-prediction.js # API para verificar estado
├── supabase-setup.sql      # Script para configurar BD
├── package.json           # Dependencias
├── vercel.json            # Configuración Vercel
└── README.md              # Este archivo
```

## 💰 Costos Estimados

- **Vercel**: $0-20/mes (depende del tráfico)
- **Supabase**: $0/mes (hasta 500MB, 50k conexiones/mes)
- **Replicate API**: ~$0.003 por imagen generada

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una feature branch
3. Commit tus cambios
4. Push a la branch
5. Abre un Pull Request

## 📄 Licencia

MIT License