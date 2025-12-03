# Estructura del Proyecto

## Archivos Principales

### `index.html`
Contiene solo la estructura HTML de la aplicación. Ya no tiene CSS ni JavaScript embebido.

### `css/styles.css`
Todos los estilos CSS de la aplicación.

### `js/firebase.js`
Configuración de Firebase y exportación de la instancia de Firestore.

### `js/data.js`
Funciones CRUD (Create, Read, Update, Delete) para:
- Nodos (personas)
- Eventos
- OwnData (datos del usuario)

Exporta:
- Variables globales: `currentUser`, `allNodes`, `allEvents`
- Funciones de datos: `loadNodes()`, `loadEvents()`, `saveNode()`, `deleteNode()`, `saveEvent()`, `deleteEvent()`, `loadOwnData()`, `saveOwnData()`

### `js/ui.js`
Funciones de renderizado y visualización:
- `renderNodes()` - Muestra la lista de nodos
- `renderEvents()` - Muestra la lista de eventos (con botones de editar y eliminar)
- `renderNetwork()` - Visualización en canvas de la red social
- `renderAnalytics()` - Estadísticas y análisis
- `renderSpawnAnalysis()` - Análisis de lugares de alto valor
- `updateOwnDataSummary()` - Resumen del perfil del usuario

### `js/export.js`
Funciones de exportación de datos:
- `exportNodes()` - Exporta nodos a CSV
- `exportEvents()` - Exporta eventos a CSV
- `exportAllData()` - Exporta todo a JSON

### `js/app.js`
Lógica principal de la aplicación:
- Login/Logout
- Navegación entre tabs
- Gestión de modales
- Coordinación entre las diferentes funciones

## Nuevas Funcionalidades

### ✅ Editar Eventos
- Cada evento ahora tiene un botón "✏️ Editar"
- Al hacer click, se abre el modal con los datos del evento
- Puedes modificar cualquier campo y guardar los cambios

### ✅ Eliminar Eventos
- Cada evento tiene un botón "🗑️ Eliminar"
- También puedes eliminar desde el modal cuando estás editando
- Confirmación antes de eliminar

### ✅ Editar Nodos (ya existía)
- Click en cualquier nodo para editarlo
- Modificar todos los campos
- Botón de eliminar en el modal

### ✅ Eliminar Nodos (ya existía)
- Botón de eliminar en el modal de edición
- Confirmación antes de eliminar

## Cómo Usar

1. **Abrir la aplicación**: Abre `index.html` en tu navegador
2. **Seleccionar usuario**: Dani o Edu
3. **Gestionar nodos**:
   - Crear: Click en "➕ Nuevo Nodo"
   - Editar: Click en cualquier tarjeta de nodo
   - Eliminar: Desde el modal de edición
4. **Gestionar eventos**:
   - Crear: Click en "➕ Nuevo Evento"
   - Editar: Click en "✏️ Editar" en cada evento
   - Eliminar: Click en "🗑️ Eliminar" en cada evento

## Ventajas de la Nueva Estructura

✅ **Código más mantenible**: Cada archivo tiene una responsabilidad clara
✅ **Más fácil de depurar**: Puedes encontrar errores más rápidamente
✅ **Reutilizable**: Las funciones están bien organizadas y documentadas
✅ **Escalable**: Fácil añadir nuevas características sin tocar todo el código
✅ **Mejor separación de concerns**: UI, datos, lógica y estilos están separados
