# 👋 Welcome to **WortiAI Chat Application**

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