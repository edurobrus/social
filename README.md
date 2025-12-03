# Social Graph Analyzer

Aplicación basada en teoría de grafos para analizar y optimizar tu red social mediante tracking de nodos (personas) y eventos.

## 🎯 Concepto

Social Graph Analyzer trata tu vida social como un grafo dirigido donde:
- **Nodos** = Personas con atributos y valores heurísticos
- **Eventos** = Interacciones que conectan nodos
- **Análisis** = Identificación de patrones y zonas de alto valor

El objetivo es **optimizar tu red social** identificando:
- Nodos de alto valor (romántico/social)
- Zonas de "spawn" de nodos valiosos
- Patrones de conexión exitosos
- Evolución de relaciones a lo largo del tiempo

## 🔬 Modelo de Datos

### 📍 Nodos (Personas)

Cada nodo representa una persona con:

**Atributos Básicos:**
- Nombre, edad, trabajo
- Hobbies
- Objetivos a largo plazo
- Color de identificación

**Estado Relacional:**
- isInLove (sí/no/desconocido)
- Tipo de relación (amigo, familia, pareja, conocido, profesional)

**Heurísticas & KPIs (0-10):**
- **Valor Romántico**: Potencial como pareja
- **Valor Social**: Potencial de networking/nuevos nodos
- **Nivel de Confianza**: KPI de confiabilidad

**Contexto:**
- Lugares predecibles frecuentes
- Highlights y notas importantes

### 📅 Eventos (Event Logs)

Cada evento registra una interacción con:

**Datos Temporales:**
- Fecha y hora
- Clima

**Contexto Social:**
- Nodos participantes (multi-selección)
- Lugar
- Número total de personas

**Detalles:**
- Outfit usado
- Situación/Objetivo
- Ambiente (ruido, iluminación, etc.)
- Notas adicionales

### 🔗 Relaciones

Las relaciones entre nodos son **implícitas** a través de eventos compartidos. El sistema calcula automáticamente:
- Frecuencia de interacción entre nodos
- Lugares comunes
- Contextos de encuentro

## ✨ Funcionalidades

### 👥 Gestión de Nodos

- ➕ Crear nuevos nodos (personas)
- ✏️ Editar atributos y KPIs
- 🎨 Asignar colores para identificación visual
- 🗑️ Eliminar nodos
- 🏷️ Badges automáticos: High Romantic, High Social, High Trust

### 📅 Event Logging

- Registrar eventos con múltiples nodos
- Tracking contextual (clima, outfit, ambiente)
- Historial cronológico completo
- Asociación automática nodo-evento

### 🕸️ Visualización de Red

- Estadísticas de red (nodos totales, eventos, ratio)
- Mapa de conexiones (en desarrollo)
- Vista de grafo interactiva (próximamente)

### 📊 Analytics & KPIs

**Dashboard General:**
- Valor romántico promedio de tu red
- Valor social promedio
- Nivel de confianza promedio
- Total de nodos

**Rankings:**
- Top 5 nodos románticos
- Top 5 nodos sociales
- Top 5 nodos de confianza

**Análisis Individual:**
- Eventos por nodo
- Evolución temporal
- Lugares frecuentes

### 🎯 High-Value Spawn Zones

**Análisis de zonas donde aparecen nodos de alto valor:**

- Identificación de lugares con alta densidad de nodos valiosos
- **Spawn Rate**: Nodos únicos / Eventos totales
- **High-Value Count**: Nodos con romántico≥7 o social≥7
- Ranking de mejores lugares para networking

**Métricas por Zona:**
- High-Value Nodes count
- Total eventos en el lugar
- Nodos únicos encontrados
- Spawn rate (eficiencia del lugar)

### ⚙️ OwnData (Mi Perfil)

**Sistema completo de perfil personal:**

**Información Personal:**
- Hobbies actuales
- Actividades actuales
- Estado sentimental
- Disponibilidad social
- Trabajo/Estudios
- Objetivos a largo plazo
- Sueños alcanzados

**Auto-Evaluación (1-10):**
- Nivel de involucramiento social
- Nivel de fitness
- Nivel de originalidad
- Nivel de egoísmo (auto-honestidad)
- Nivel de inteligencia
- Gusto musical

**Resumen automático:**
- Puntuación general calculada
- Estado actual consolidado
- Recomendaciones basadas en tu perfil

### 📥 Exportación de Datos

**Formatos disponibles:**
- **CSV de Nodos**: Exporta todos tus contactos con sus KPIs
- **CSV de Eventos**: Exporta todos los event logs
- **JSON Completo**: Exporta todo (nodos + eventos + perfil + estadísticas)

## 🛠️ Tecnología

- **Frontend**: HTML5, CSS3, JavaScript ES6+, Canvas API
- **Backend**: Firebase Firestore
- **Modelo**: Teoría de Grafos
- **Arquitectura**: Single Page Application (SPA)
- **Storage**: Cloud Firestore (3 colecciones: `nodes`, `events`, `ownData`)
- **Export**: CSV y JSON nativo

## ⚙️ Configuración de Firebase

**IMPORTANTE**: Antes de usar la aplicación, configura las reglas de Firestore:

1. Ve a [Firebase Console](https://console.firebase.google.com/project/farmeo-dbd64/firestore/rules)
2. Configura las siguientes reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /nodes/{document=**} {
      allow read, write: if true;
    }

    match /events/{document=**} {
      allow read, write: if true;
    }

    match /ownData/{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click en **"Publicar"**

## 🚀 Uso

1. Visita: [https://edurobrus.github.io/social/](https://edurobrus.github.io/social/)
2. Selecciona tu usuario (Dani o Edu)
3. **Configura tu perfil** en la pestaña "Mi Perfil"
4. **Crea nodos** para las personas en tu red
5. **Registra eventos** cuando interactúas con ellas
6. **Visualiza la red** en el grafo interactivo
7. **Analiza patrones** en Analytics y Spawn Zones
8. **Exporta tus datos** cuando lo necesites

## 📊 Flujo de Trabajo Recomendado

### 1. Setup Inicial
1. Crear nodos para todas las personas importantes en tu vida
2. Asignar valores heurísticos iniciales (romántico, social, confianza)
3. Anotar lugares predecibles donde las encuentras

### 2. Tracking Continuo
1. Después de cada interacción social, registrar un evento
2. Seleccionar todos los nodos que participaron
3. Anotar contexto (outfit, lugar, clima, objetivo)

### 3. Análisis Periódico
1. Revisar Analytics semanalmente
2. Identificar qué nodos están generando más valor
3. Analizar spawn zones para optimizar dónde pasas tiempo
4. Ajustar KPIs de nodos según nuevas interacciones

### 4. Optimización
1. Frecuentar spawn zones de alto valor
2. Invertir más tiempo en nodos de alta confianza/valor
3. Experimentar con nuevos contextos y lugares
4. Tracking de evolución temporal

## 🎯 Casos de Uso

### Dating/Romance
- Identificar nodos con alto potencial romántico
- Encontrar spawn zones donde conocer gente interesante
- Analizar qué contextos funcionan mejor (outfits, lugares, situaciones)

### Networking Profesional
- Mapear tu red profesional
- Identificar conectores (alto valor social)
- Encontrar eventos/lugares para ampliar red

### Análisis Social
- Entender tu red de amistades
- Identificar relaciones de alta confianza
- Optimizar tiempo social en personas que aportan valor

### Self-Improvement
- Tracking de evolución de relaciones
- Identificar patrones exitosos
- Mejorar habilidades sociales basado en datos

## 🔮 Roadmap

### ✅ Completado
- [x] Visualización interactiva de grafo con Canvas
- [x] Exportación de datos (CSV/JSON)
- [x] OwnData completo con auto-análisis
- [x] Sistema de badges automático
- [x] Análisis de spawn zones

### 🚧 En Desarrollo
- [ ] Visualización más avanzada con D3.js o vis.js (drag & drop)
- [ ] Análisis de caminos entre nodos (shortest path)
- [ ] Detección de clusters/comunidades (algoritmo Louvain)
- [ ] Predicción de compatibilidad entre nodos (ML)
- [ ] Timeline/evolución temporal de KPIs
- [ ] Heatmap de actividad social por día/hora
- [ ] Sugerencias automáticas basadas en patrones
- [ ] Import de datos (CSV/JSON)
- [ ] Modo oscuro
- [ ] Mobile app (PWA)

## 📄 Licencia

Proyecto personal de código abierto

---

**Nota**: Esta herramienta es para análisis y optimización personal. Respeta la privacidad de las personas en tu red y usa los datos responsablemente.
