import { allNodes, allEvents, getCurrentUser, loadOwnData } from './data.js';

// Helper functions
function escapeCSV(str) {
    if (str === null || str === undefined) return '';
    str = String(str);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type: type });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Export nodes to CSV
export function exportNodes() {
    if (allNodes.length === 0) {
        alert('No hay nodos para exportar');
        return;
    }

    const headers = [
        'Nombre',
        'Edad',
        'Trabajo',
        'Hobbies',
        'Objetivos Largo Plazo',
        'Está Enamorado',
        'Tipo Relación',
        'Valor Romántico',
        'Valor Social',
        'Nivel Confianza',
        'Lugares',
        'Highlights',
        'Color',
        'Fecha Creación'
    ];

    let csv = headers.join(',') + '\n';

    allNodes.forEach(node => {
        const row = [
            escapeCSV(node.name),
            node.age || '',
            escapeCSV(node.job),
            escapeCSV(node.hobbies),
            escapeCSV(node.longTermGoals),
            escapeCSV(node.isInLove),
            escapeCSV(node.relationType),
            node.romanticValue || 0,
            node.socialValue || 0,
            node.trustLevel || 0,
            escapeCSV(node.places),
            escapeCSV(node.highlights),
            node.color || '',
            escapeCSV(node.createdAt)
        ];
        csv += row.join(',') + '\n';
    });

    const currentUser = getCurrentUser();
    const filename = `nodes-${currentUser}-${new Date().toISOString().split('T')[0]}.csv`;
    downloadFile(csv, filename, 'text/csv;charset=utf-8;');
}

// Export events to CSV
export function exportEvents() {
    if (allEvents.length === 0) {
        alert('No hay eventos para exportar');
        return;
    }

    const headers = [
        'Fecha',
        'Hora',
        'Lugar',
        'Nodos',
        'Clima',
        'Outfit',
        'Número Personas',
        'Situación',
        'Ambiente',
        'Notas',
        'Fecha Creación'
    ];

    let csv = headers.join(',') + '\n';

    allEvents.forEach(evt => {
        const nodeNames = evt.nodes ? evt.nodes.map(nid => {
            const node = allNodes.find(n => n.id === nid);
            return node ? node.name : 'Desconocido';
        }).join('; ') : '';

        const row = [
            escapeCSV(evt.date),
            escapeCSV(evt.time),
            escapeCSV(evt.place),
            escapeCSV(nodeNames),
            escapeCSV(evt.weather),
            escapeCSV(evt.outfit),
            evt.peopleCount || '',
            escapeCSV(evt.situation),
            escapeCSV(evt.environment),
            escapeCSV(evt.notes),
            escapeCSV(evt.createdAt)
        ];
        csv += row.join(',') + '\n';
    });

    const currentUser = getCurrentUser();
    const filename = `events-${currentUser}-${new Date().toISOString().split('T')[0]}.csv`;
    downloadFile(csv, filename, 'text/csv;charset=utf-8;');
}

// Export all data to JSON
export async function exportAllData() {
    if (allNodes.length === 0 && allEvents.length === 0) {
        alert('No hay datos para exportar');
        return;
    }

    // Load OwnData
    const ownData = await loadOwnData();

    const currentUser = getCurrentUser();
    const exportData = {
        user: currentUser,
        exportDate: new Date().toISOString(),
        nodes: allNodes,
        events: allEvents,
        ownData: ownData,
        stats: {
            totalNodes: allNodes.length,
            totalEvents: allEvents.length,
            avgRomanticValue: allNodes.length > 0 ? (allNodes.reduce((sum, n) => sum + (n.romanticValue || 0), 0) / allNodes.length).toFixed(2) : 0,
            avgSocialValue: allNodes.length > 0 ? (allNodes.reduce((sum, n) => sum + (n.socialValue || 0), 0) / allNodes.length).toFixed(2) : 0,
            avgTrustLevel: allNodes.length > 0 ? (allNodes.reduce((sum, n) => sum + (n.trustLevel || 0), 0) / allNodes.length).toFixed(2) : 0
        }
    };

    const json = JSON.stringify(exportData, null, 2);
    const filename = `social-graph-${currentUser}-${new Date().toISOString().split('T')[0]}.json`;
    downloadFile(json, filename, 'application/json');
}
