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