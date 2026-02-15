# Code Comparator

Este proyecto es una herramienta web interactiva diseñada para comparar fragmentos de código y visualizar sus diferencias con precisión. He desarrollado esta aplicación utilizando React y Vite para proporcionar un entorno rápido y limpio, enfocado principalmente en su uso en escritorio.

El propósito principal de esta herramienta es facilitar mi flujo de trabajo al comparar código en desarrollo con versiones de producción o de clientes. Decidí crear mi propia solución para evitar el uso de herramientas de terceros que suelen estar saturadas de publicidad, requieren pagos o comprometen la privacidad de los datos.

## Características Principales

**Comparación en Tiempo Real:** Visualización de diferencias línea por línea (Diff Viewer) con resaltado de sintaxis, lo que facilita la detección inmediata de modificaciones, adiciones o eliminaciones.

**Enfoque en Escritorio:** La interfaz está optimizada para pantallas grandes, permitiendo una vista amplia y detallada del código sin distracciones.

**Personalización Visual:**
- **Modo Oscuro / Claro:** Cambio de tema fluido para reducir la fatiga visual según la preferencia del usuario.
- **Fondo Interactivo:** Animación de partículas sutiles para ofrecer una experiencia visual moderna y premium.

**Soporte Multilenguaje (i18n):** La aplicación cuenta con soporte completo tanto para inglés como para español.

**Herramientas de Edición:** Funcionalidades intuitivas para copiar, intercambiar (swap) y limpiar el código rápidamente.

## Tecnologías Utilizadas

- **Frontend:** React (Hooks, Context API).
- **Herramienta de Construcción:** Vite.
- **Funcionalidades Clave:**
    - `diff`: Para el cálculo algorítmico de diferencias de texto.
    - `react-i18next`: Para la gestión de la internacionalización.
    - `tsparticles`: Para la implementación del fondo animado.
    - `@heroicons/react`: Iconografía SVG moderna y optimizada.

## Instalación y Uso Local

Para ejecutar este proyecto en su entorno local, siga los siguientes pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Yairu4439/CodeComparator.git
    cd CodeComparator
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador:**
    Visite `http://localhost:5173` (o el puerto indicado en su terminal).

## Autor y Contacto

Desarrollado por **Yahir Umaña Arroyo**.

- **Correo Electrónico:** yairu4439@gmail.com 
- **Portafolio:** [Ver más proyectos](https://github.com/Yairu4439)

---
© 2026 Code Comparator. Todos los derechos reservados.
