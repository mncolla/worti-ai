# 👋 Welcome to **WortiAI Chat Application**

Una aplicación de chat inteligente desarrollada con Expo Router, que utiliza Google Vertex AI para generar respuestas y PostgreSQL como base de datos.

## 🚀 Configuración del Proyecto

### Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- Docker y Docker Compose
- Expo CLI (`npm install -g @expo/cli`)
- Una cuenta de Google Cloud Platform con Vertex AI habilitado

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd wortiAI
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Copia el archivo de ejemplo y configura las variables necesarias:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
# Google Vertex AI Configuration
GOOGLE_VERTEX_LOCATION='us-central1'  # Tu región de Vertex AI
GOOGLE_VERTEX_PROJECT='tu-proyecto-gcp'  # ID de tu proyecto en GCP
GOOGLE_APPLICATION_CREDENTIALS='./credentials.json'  # Ruta a tu archivo de credenciales

# Database Configuration
DATABASE_URL='postgresql://postgres:postgres@localhost:5432/wortiai'
```

### 4. Configurar Google Cloud Credentials

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Vertex AI
4. Crea una cuenta de servicio con permisos de Vertex AI
5. Descarga el archivo JSON de credenciales
6. Guárdalo como `credentials.json` en la raíz del proyecto

### 5. Configurar Base de Datos

Inicia PostgreSQL usando Docker Compose:

```bash
# Levantar la base de datos
docker-compose up -d

# Verificar que esté funcionando
docker-compose ps
```

### 6. Ejecutar Migraciones

Configura las tablas de la base de datos:

```bash
# Generar migraciones (si es necesario)
npx drizzle-kit generate

# Aplicar migraciones
npx drizzle-kit migrate
```

### 7. Iniciar la Aplicación

```bash
# Modo desarrollo
npm start

# Para dispositivos específicos
npm run ios     # iOS Simulator
npm run android # Android Emulator
npm run web     # Navegador web
```

### 8. Primer Uso

1. La aplicación se abrirá en Expo Go o en tu simulador
2. Verás la pantalla principal con la opción "Nuevo Chat"
3. Abre el drawer lateral para ver la lista de chats
4. Escribe un mensaje para comenzar a chatear con la IA

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

- **Frontend**: Expo Router + React Native
- **UI**: Tamagui (componentes y theming)
- **Estado**: TanStack Query (cache y sincronización)
- **Base de Datos**: PostgreSQL + Drizzle ORM
- **IA**: Google Vertex AI (Gemini 2.5 Flash)
- **Navegación**: Expo Router con Drawer Navigation

### Estructura de Carpetas

```
src/
├── app/                    # Expo Router páginas
│   ├── api/               # API Routes
│   ├── _layout.tsx        # Layout principal
│   ├── index.tsx          # Página de inicio
│   └── [chatId].tsx       # Página de chat específico
├── features/              # Arquitectura basada en features
│   └── chat/
│       ├── components/    # Componentes UI del chat
│       ├── hooks/         # Hooks personalizados
│       ├── queries/       # TanStack Query hooks
│       ├── mutations/     # Mutaciones de datos
│       └── types/         # Tipos TypeScript
├── contexts/              # Contextos React globales
├── db/                    # Configuración de base de datos
│   ├── schema.ts          # Esquema Drizzle
│   └── index.ts           # Conexión DB
└── components/            # Componentes compartidos
```

## 🔧 Scripts Disponibles

```bash
npm start          # Iniciar servidor de desarrollo
npm run ios        # Abrir en iOS Simulator
npm run android    # Abrir en Android Emulator
npm run web        # Abrir en navegador
npm run lint       # Ejecutar linter
```

## 📱 Funcionalidades

- ✅ Chat en tiempo real con IA
- ✅ Persistencia de conversaciones
- ✅ Tema claro/oscuro
- ✅ Navegación con drawer
- ✅ Lista de chats guardados
- ✅ Eliminación de chats con confirmación
- ✅ IDs únicos auto-generados
- ✅ Cache inteligente con TanStack Query

## 🛠️ Desarrollo

### Base de Datos

Para resetear la base de datos:

```bash
# Detener contenedores
docker-compose down

# Eliminar volúmenes (¡CUIDADO: elimina todos los datos!)
docker-compose down -v

# Volver a levantar
docker-compose up -d

# Aplicar migraciones
npx drizzle-kit migrate
```

### Estructura de la Base de Datos

- **chats**: Almacena conversaciones con ID único, título, mensajes y timestamps
- **Campos**: id (varchar), userId, title, messages (json), createdAt, updatedAt

## 🤖 AI Used in the Project

**Model:** `Claude Code (sonnet-4)`

**Prompts used:**

1. **Theme Context**
   ```ts
   Genera un contexto de React para manejar tema claro/oscuro de la aplicación.
   Este contexto debe persistir el estado mediante `@react-native-async-storage/async-storage`
   bajo la key `@app_theme`.

   Debe proveer una función `toggleTheme` para alternar entre `'dark'` y `'light'`.
   Usar en el provider `Theme` de **Tamagui** y en el provider `ThemeProvider`.
   Estos providers deben envolver la aplicacion en `@app/_layout.tsx`.
   ```

2. **Features based architecture**
   ```ts
   Genera una arquitectura de carpetas basada en el enfoque por features (feature-based architecture).

   Cada feature debe contener su propio conjunto de subcarpetas internas para mantener una estructura modular y escalable.

   Las subcarpetas que debe incluir cada feature son:
      •	components/ → Componentes UI específicos de la feature
      •	hooks/ → Hooks personalizados relacionados con la lógica de la feature
      •	services/ → Funciones o módulos que interactúan con APIs o lógica externa
      •	contexts/ → Contextos de React (si aplica)
      •	assets/ → Imágenes, íconos o recursos multimedia específicos
      •	types/ → Tipos y definiciones TypeScript relacionados

   Por el momento, solo necesitamos crear la estructura correspondiente a la feature chat aplicando este patrón.

   Muestra el resultado en formato de árbol de carpetas, siguiendo las convenciones más comunes de un proyecto React + TypeScript.
   ```

3. **Haptics custom hook**
   ```ts
   Genera un custom hook de React Native llamado useHaptics que utilice la librería expo-haptics para manejar feedback háptico.

   El hook debe:
	•	Tener funciones para distintos tipos de vibraciones: light, medium, heavy, success, warning, error y selection.
	•	Usar internamente Haptics.impactAsync, Haptics.notificationAsync y Haptics.selectionAsync según el tipo.
	•	Incluir un modo debug activado solo en __DEV__, que muestre en consola el tipo de haptic disparado junto a un emoji representativo.
	•	Manejar errores con try/catch para evitar fallos si el dispositivo no soporta vibración.
	•	Ser exportado como useHaptics y devolver las funciones mencionadas listas para usar en componentes.
	•	Escribirlo en TypeScript y con buenas prácticas de código limpias y seguras.
   ```