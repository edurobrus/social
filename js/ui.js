import { allNodes, allEvents, countNodeEvents } from './data.js';

// Render nodes list
export function renderNodes() {
    if (allNodes.length === 0) {
        document.getElementById('nodesList').innerHTML = '<p>No has creado ningún nodo aún. Haz click en "Nuevo Nodo" para empezar.</p>';
        return;
    }

    const html = allNodes.map(node => `
        <div class="node-card" onclick="window.editNode('${node.id}')">
            <div class="node-header">
                <div>
                    <div class="node-name" style="border-left: 4px solid ${node.color || '#3498db'}; padding-left: 10px;">
                        ${node.name}
                    </div>
                    <div style="font-size: 0.9em; color: #666; margin-top: 5px;">
                        ${node.job || 'Sin trabajo'} ${node.age ? `• ${node.age} años` : ''}
                    </div>
                </div>
                <div class="node-badges">
                    ${node.romanticValue >= 7 ? '<span class="badge badge-romantic">💕 High Romantic</span>' : ''}
                    ${node.socialValue >= 7 ? '<span class="badge badge-social">🌟 High Social</span>' : ''}
                    ${node.trustLevel >= 8 ? '<span class="badge badge-high">🔒 High Trust</span>' : ''}
                </div>
            </div>
            <div class="kpi-grid">
                <div class="kpi-item">
                    <div class="kpi-label">Romántico</div>
                    <div class="kpi-value">${node.romanticValue || 0}/10</div>
                </div>
                <div class="kpi-item">
                    <div class="kpi-label">Social</div>
                    <div class="kpi-value">${node.socialValue || 0}/10</div>
                </div>
                <div class="kpi-item">
                    <div class="kpi-label">Confianza</div>
                    <div class="kpi-value">${node.trustLevel || 0}/10</div>
                </div>
                <div class="kpi-item">
                    <div class="kpi-label">Eventos</div>
                    <div class="kpi-value">${countNodeEvents(node.id)}</div>
                </div>
            </div>
            ${node.places ? `<p style="margin-top: 10px;"><strong>📍 Lugares:</strong> ${node.places}</p>` : ''}
            ${node.hobbies ? `<p><strong>🎯 Hobbies:</strong> ${node.hobbies}</p>` : ''}
        </div>
    `).join('');

    document.getElementById('nodesList').innerHTML = html;
}

// Render events
export function renderEvents() {
    if (allEvents.length === 0) {
        document.getElementById('eventsList').innerHTML = '<p>No has registrado ningún evento aún.</p>';
        return;
    }

    const html = allEvents.map(evt => {
        const nodeNames = evt.nodes ? evt.nodes.map(nid => {
            const node = allNodes.find(n => n.id === nid);
            return node ? node.name : 'Desconocido';
        }).join(', ') : '';

        return `
            <div class="event-card">
                <div class="event-header">
                    <span>📅 ${evt.date} ${evt.time || ''}</span>
                    <span>📍 ${evt.place}</span>
                </div>
                <p><strong>👥 Nodos:</strong> ${nodeNames}</p>
                ${evt.situation ? `<p><strong>🎯 Situación:</strong> ${evt.situation}</p>` : ''}
                ${evt.weather ? `<p><strong>🌤️ Clima:</strong> ${evt.weather}</p>` : ''}
                ${evt.outfit ? `<p><strong>👔 Outfit:</strong> ${evt.outfit}</p>` : ''}
                ${evt.peopleCount ? `<p><strong>👥 Personas:</strong> ${evt.peopleCount}</p>` : ''}
                ${evt.notes ? `<p style="margin-top: 10px; font-style: italic;">${evt.notes}</p>` : ''}
                <div class="event-actions">
                    <button class="btn btn-small" onclick="window.editEvent('${evt.id}'); event.stopPropagation();">✏️ Editar</button>
                    <button class="btn btn-small btn-danger" onclick="window.handleDeleteEvent('${evt.id}'); event.stopPropagation();">🗑️ Eliminar</button>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('eventsList').innerHTML = html;
}

// Render network visualization with Canvas
export function renderNetwork() {
    const canvas = document.getElementById('networkCanvas');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (allNodes.length === 0) {
        ctx.fillStyle = '#666';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('No hay nodos para visualizar. Crea algunos nodos primero.', canvas.width / 2, canvas.height / 2);
        return;
    }

    // Calculate node positions in a circle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 80;

    const nodePositions = {};
    allNodes.forEach((node, index) => {
        const angle = (index / allNodes.length) * 2 * Math.PI;
        nodePositions[node.id] = {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
            node: node
        };
    });

    // Draw connections (edges) first
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;

    allEvents.forEach(event => {
        if (!event.nodes || event.nodes.length < 2) return;

        // Draw lines between all nodes in the event
        for (let i = 0; i < event.nodes.length; i++) {
            for (let j = i + 1; j < event.nodes.length; j++) {
                const node1Pos = nodePositions[event.nodes[i]];
                const node2Pos = nodePositions[event.nodes[j]];

                if (node1Pos && node2Pos) {
                    ctx.beginPath();
                    ctx.moveTo(node1Pos.x, node1Pos.y);
                    ctx.lineTo(node2Pos.x, node2Pos.y);
                    ctx.stroke();
                }
            }
        }
    });

    // Draw nodes
    Object.values(nodePositions).forEach(pos => {
        const node = pos.node;

        // Determine node color based on highest value
        let color = node.color || '#3498db';
        if ((node.romanticValue || 0) >= 7) color = '#e74c3c'; // Red for romantic
        else if ((node.socialValue || 0) >= 7) color = '#27ae60'; // Green for social
        else if ((node.trustLevel || 0) >= 8) color = '#3498db'; // Blue for trust

        // Draw node circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 25, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw node label
        ctx.fillStyle = '#333';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, pos.x, pos.y + 45);

        // Draw event count
        const eventCount = countNodeEvents(node.id);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px Arial';
        ctx.fillText(eventCount, pos.x, pos.y + 5);
    });
}

// Render analytics
export function renderAnalytics() {
    const topRomantic = [...allNodes].sort((a, b) => (b.romanticValue || 0) - (a.romanticValue || 0)).slice(0, 5);
    const topSocial = [...allNodes].sort((a, b) => (b.socialValue || 0) - (a.socialValue || 0)).slice(0, 5);
    const topTrust = [...allNodes].sort((a, b) => (b.trustLevel || 0) - (a.trustLevel || 0)).slice(0, 5);

    const avgRomantic = allNodes.length > 0 ? (allNodes.reduce((sum, n) => sum + (n.romanticValue || 0), 0) / allNodes.length).toFixed(1) : 0;
    const avgSocial = allNodes.length > 0 ? (allNodes.reduce((sum, n) => sum + (n.socialValue || 0), 0) / allNodes.length).toFixed(1) : 0;
    const avgTrust = allNodes.length > 0 ? (allNodes.reduce((sum, n) => sum + (n.trustLevel || 0), 0) / allNodes.length).toFixed(1) : 0;

    document.getElementById('analyticsGrid').innerHTML = `
        <div class="stat-card">
            <div class="stat-label">Valor Romántico Promedio</div>
            <div class="stat-value">${avgRomantic}/10</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Valor Social Promedio</div>
            <div class="stat-value">${avgSocial}/10</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Confianza Promedio</div>
            <div class="stat-value">${avgTrust}/10</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Total Nodos</div>
            <div class="stat-value">${allNodes.length}</div>
        </div>
    `;

    document.getElementById('topNodes').innerHTML = `
        <div class="form-row">
            <div>
                <h3 style="color: #e74c3c; margin-bottom: 10px;">💕 Top Romántico</h3>
                ${topRomantic.map(n => `<p>• ${n.name} (${n.romanticValue || 0}/10)</p>`).join('') || '<p>No hay datos</p>'}
            </div>
            <div>
                <h3 style="color: #27ae60; margin-bottom: 10px;">🌟 Top Social</h3>
                ${topSocial.map(n => `<p>• ${n.name} (${n.socialValue || 0}/10)</p>`).join('') || '<p>No hay datos</p>'}
            </div>
        </div>
        <div style="margin-top: 20px;">
            <h3 style="color: #3498db; margin-bottom: 10px;">🔒 Top Confianza</h3>
            ${topTrust.map(n => `<p>• ${n.name} (${n.trustLevel || 0}/10)</p>`).join('') || '<p>No hay datos</p>'}
        </div>
    `;
}

// Render spawn analysis
export function renderSpawnAnalysis() {
    const placeStats = {};
    allEvents.forEach(evt => {
        if (!placeStats[evt.place]) {
            placeStats[evt.place] = { count: 0, nodes: new Set(), highValue: 0 };
        }
        placeStats[evt.place].count++;
        if (evt.nodes) {
            evt.nodes.forEach(nid => {
                placeStats[evt.place].nodes.add(nid);
                const node = allNodes.find(n => n.id === nid);
                if (node && ((node.romanticValue || 0) >= 7 || (node.socialValue || 0) >= 7)) {
                    placeStats[evt.place].highValue++;
                }
            });
        }
    });

    const sortedPlaces = Object.entries(placeStats)
        .map(([place, stats]) => ({
            place,
            ...stats,
            uniqueNodes: stats.nodes.size,
            spawnRate: stats.uniqueNodes / stats.count
        }))
        .sort((a, b) => b.highValue - a.highValue);

    document.getElementById('spawnAnalysis').innerHTML = `
        <p style="margin-bottom: 20px;">Análisis de lugares donde aparecen nodos de alto valor (romántico ≥7 o social ≥7)</p>
        ${sortedPlaces.map(place => `
            <div class="node-card">
                <h3>📍 ${place.place}</h3>
                <div class="kpi-grid" style="margin-top: 15px;">
                    <div class="kpi-item">
                        <div class="kpi-label">High-Value Nodes</div>
                        <div class="kpi-value">${place.highValue}</div>
                    </div>
                    <div class="kpi-item">
                        <div class="kpi-label">Total Eventos</div>
                        <div class="kpi-value">${place.count}</div>
                    </div>
                    <div class="kpi-item">
                        <div class="kpi-label">Nodos Únicos</div>
                        <div class="kpi-value">${place.uniqueNodes}</div>
                    </div>
                    <div class="kpi-item">
                        <div class="kpi-label">Spawn Rate</div>
                        <div class="kpi-value">${place.spawnRate.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        `).join('') || '<p>No hay datos suficientes para análisis</p>'}
    `;
}

// Update OwnData summary
export function updateOwnDataSummary(data) {
    const avgScore = ((data.involvement + data.fitness + data.originality + data.intelligence) / 4).toFixed(1);

    document.getElementById('ownDataSummary').innerHTML = `
        <h3 style="color: #1e3c72; margin-bottom: 15px;">Resumen de tu Perfil</h3>
        <div class="kpi-grid">
            <div class="kpi-item">
                <div class="kpi-label">Puntuación General</div>
                <div class="kpi-value">${avgScore}/10</div>
            </div>
            <div class="kpi-item">
                <div class="kpi-label">Social</div>
                <div class="kpi-value">${data.involvement}/10</div>
            </div>
            <div class="kpi-item">
                <div class="kpi-label">Fitness</div>
                <div class="kpi-value">${data.fitness}/10</div>
            </div>
            <div class="kpi-item">
                <div class="kpi-label">Inteligencia</div>
                <div class="kpi-value">${data.intelligence}/10</div>
            </div>
        </div>
        <p style="margin-top: 15px;"><strong>Estado:</strong> ${data.isInLove === 'single' ? 'Soltero/a' : data.isInLove === 'relationship' ? 'En relación' : data.isInLove}</p>
        <p><strong>Disponibilidad:</strong> ${data.availability === 'high' ? 'Alta' : data.availability === 'medium' ? 'Media' : 'Baja'}</p>
        ${data.job ? `<p><strong>Ocupación:</strong> ${data.job}</p>` : ''}
        ${data.hobbies ? `<p><strong>Hobbies:</strong> ${data.hobbies}</p>` : ''}
    `;
}
