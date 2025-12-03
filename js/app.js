import {
    setCurrentUser,
    getCurrentUser,
    loadNodes,
    loadEvents,
    saveNode,
    deleteNode,
    saveEvent,
    deleteEvent,
    loadOwnData,
    saveOwnData,
    allNodes,
    allEvents
} from './data.js';
import {
    renderNodes,
    renderEvents,
    renderNetwork,
    renderAnalytics,
    renderSpawnAnalysis,
    updateOwnDataSummary
} from './ui.js';
import { exportNodes, exportEvents, exportAllData } from './export.js';

// Global variables
let currentNodeId = null;
let currentEventId = null;

// Login
window.login = async function(username) {
    setCurrentUser(username);
    document.getElementById('currentUser').textContent = username;
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.remove('hidden');
    await loadData();
};

// Logout
window.logout = function() {
    setCurrentUser(null);
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('appScreen').classList.add('hidden');
};

// Load all data
async function loadData() {
    await loadNodes();
    await loadEvents();
    renderNodes();
}

// Tab navigation
window.showTab = function(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');

    if (tabName === 'nodes') renderNodes();
    else if (tabName === 'events') renderEvents();
    else if (tabName === 'network') renderNetwork();
    else if (tabName === 'analytics') renderAnalytics();
    else if (tabName === 'spawn') renderSpawnAnalysis();
    else if (tabName === 'profile') renderProfile();
};

// Render profile
async function renderProfile() {
    const data = await loadOwnData();
    if (data) {
        document.getElementById('ownHobbies').value = data.hobbies || '';
        document.getElementById('ownCurrentActivities').value = data.currentActivities || '';
        document.getElementById('ownIsInLove').value = data.isInLove || 'single';
        document.getElementById('ownAvailability').value = data.availability || 'medium';
        document.getElementById('ownJob').value = data.job || '';
        document.getElementById('ownLongTermGoals').value = data.longTermGoals || '';
        document.getElementById('ownDreamsAchieved').value = data.dreamsAchieved || '';
        document.getElementById('ownInvolvement').value = data.involvement || 5;
        document.getElementById('ownFitness').value = data.fitness || 5;
        document.getElementById('ownOriginality').value = data.originality || 5;
        document.getElementById('ownEgoism').value = data.egoism || 5;
        document.getElementById('ownIntelligence').value = data.intelligence || 5;
        document.getElementById('ownMusicTaste').value = data.musicTaste || '';

        updateAllOwnSliders();
        updateOwnDataSummary(data);
    }
}

// Save OwnData
window.saveOwnData = async function() {
    const ownData = {
        user: getCurrentUser(),
        hobbies: document.getElementById('ownHobbies').value,
        currentActivities: document.getElementById('ownCurrentActivities').value,
        isInLove: document.getElementById('ownIsInLove').value,
        availability: document.getElementById('ownAvailability').value,
        job: document.getElementById('ownJob').value,
        longTermGoals: document.getElementById('ownLongTermGoals').value,
        dreamsAchieved: document.getElementById('ownDreamsAchieved').value,
        involvement: parseInt(document.getElementById('ownInvolvement').value),
        fitness: parseInt(document.getElementById('ownFitness').value),
        originality: parseInt(document.getElementById('ownOriginality').value),
        egoism: parseInt(document.getElementById('ownEgoism').value),
        intelligence: parseInt(document.getElementById('ownIntelligence').value),
        musicTaste: document.getElementById('ownMusicTaste').value,
        updatedAt: new Date().toISOString()
    };

    const result = await saveOwnData(ownData);
    alert(result.message);
    if (result.success) {
        updateOwnDataSummary(ownData);
    }
};

// Update own slider
window.updateOwnSlider = function(name) {
    const slider = document.getElementById('own' + name);
    const display = document.getElementById('own' + name + 'Display');
    display.textContent = slider.value;
};

function updateAllOwnSliders() {
    ['Involvement', 'Fitness', 'Originality', 'Egoism', 'Intelligence'].forEach(name => {
        updateOwnSlider(name);
    });
}

// Modal functions
window.openNodeModal = function() {
    currentNodeId = null;
    document.getElementById('nodeForm').reset();
    document.getElementById('nodeName').value = '';
    document.getElementById('deleteNodeBtn').style.display = 'none';
    updateSlider('romanticValue');
    updateSlider('socialValue');
    updateSlider('trustLevel');
    document.getElementById('nodeModal').style.display = 'block';
};

window.closeNodeModal = function() {
    document.getElementById('nodeModal').style.display = 'none';
};

window.openEventModal = function() {
    currentEventId = null;
    document.getElementById('eventForm').reset();
    document.getElementById('eventDate').valueAsDate = new Date();
    document.getElementById('deleteEventBtn').style.display = 'none';

    // Populate nodes selector
    const select = document.getElementById('eventNodes');
    select.innerHTML = allNodes.map(n => `<option value="${n.id}">${n.name}</option>`).join('');

    document.getElementById('eventModal').style.display = 'block';
};

window.closeEventModal = function() {
    document.getElementById('eventModal').style.display = 'none';
};

window.updateSlider = function(name) {
    const slider = document.getElementById('node' + name.charAt(0).toUpperCase() + name.slice(1));
    const display = document.getElementById(name + 'Display');
    display.textContent = slider.value;
};

// Edit node
window.editNode = function(nodeId) {
    const node = allNodes.find(n => n.id === nodeId);
    if (!node) return;

    currentNodeId = nodeId;
    document.getElementById('nodeName').value = node.name || '';
    document.getElementById('nodeAge').value = node.age || '';
    document.getElementById('nodeColor').value = node.color || '#3498db';
    document.getElementById('nodeJob').value = node.job || '';
    document.getElementById('nodeHobbies').value = node.hobbies || '';
    document.getElementById('nodeLongTermGoals').value = node.longTermGoals || '';
    document.getElementById('nodeIsInLove').value = node.isInLove || 'no';
    document.getElementById('nodeRelationType').value = node.relationType || '';
    document.getElementById('nodeRomanticValue').value = node.romanticValue || 5;
    document.getElementById('nodeSocialValue').value = node.socialValue || 5;
    document.getElementById('nodeTrustLevel').value = node.trustLevel || 5;
    document.getElementById('nodePlaces').value = node.places || '';
    document.getElementById('nodeHighlights').value = node.highlights || '';

    updateSlider('romanticValue');
    updateSlider('socialValue');
    updateSlider('trustLevel');

    document.getElementById('deleteNodeBtn').style.display = 'inline-block';
    document.getElementById('nodeModal').style.display = 'block';
};

// Save node
window.saveNode = async function(e) {
    e.preventDefault();

    const nodeData = {
        user: getCurrentUser(),
        name: document.getElementById('nodeName').value,
        age: parseInt(document.getElementById('nodeAge').value) || null,
        color: document.getElementById('nodeColor').value,
        job: document.getElementById('nodeJob').value,
        hobbies: document.getElementById('nodeHobbies').value,
        longTermGoals: document.getElementById('nodeLongTermGoals').value,
        isInLove: document.getElementById('nodeIsInLove').value,
        relationType: document.getElementById('nodeRelationType').value,
        romanticValue: parseInt(document.getElementById('nodeRomanticValue').value),
        socialValue: parseInt(document.getElementById('nodeSocialValue').value),
        trustLevel: parseInt(document.getElementById('nodeTrustLevel').value),
        places: document.getElementById('nodePlaces').value,
        highlights: document.getElementById('nodeHighlights').value,
        updatedAt: new Date().toISOString()
    };

    const result = await saveNode(currentNodeId, nodeData);
    alert(result.message);
    if (result.success) {
        closeNodeModal();
        await loadNodes();
        renderNodes();
    }
};

// Delete node
window.deleteNode = async function() {
    if (!currentNodeId) return;
    if (!confirm('¿Estás seguro de eliminar este nodo?')) return;

    const result = await deleteNode(currentNodeId);
    alert(result.message);
    if (result.success) {
        closeNodeModal();
        await loadNodes();
        renderNodes();
    }
};

// Edit event
window.editEvent = function(eventId) {
    const evt = allEvents.find(e => e.id === eventId);
    if (!evt) return;

    currentEventId = eventId;
    document.getElementById('eventDate').value = evt.date || '';
    document.getElementById('eventTime').value = evt.time || '';
    document.getElementById('eventPlace').value = evt.place || '';
    document.getElementById('eventWeather').value = evt.weather || '';
    document.getElementById('eventOutfit').value = evt.outfit || '';
    document.getElementById('eventPeopleCount').value = evt.peopleCount || '';
    document.getElementById('eventSituation').value = evt.situation || '';
    document.getElementById('eventEnvironment').value = evt.environment || '';
    document.getElementById('eventNotes').value = evt.notes || '';

    // Populate and select nodes
    const select = document.getElementById('eventNodes');
    select.innerHTML = allNodes.map(n => `<option value="${n.id}">${n.name}</option>`).join('');

    // Select the nodes that are part of this event
    if (evt.nodes) {
        Array.from(select.options).forEach(option => {
            option.selected = evt.nodes.includes(option.value);
        });
    }

    document.getElementById('deleteEventBtn').style.display = 'inline-block';
    document.getElementById('eventModal').style.display = 'block';
};

// Save event
window.saveEvent = async function(e) {
    e.preventDefault();

    const selectedNodes = Array.from(document.getElementById('eventNodes').selectedOptions).map(opt => opt.value);

    const eventData = {
        user: getCurrentUser(),
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        nodes: selectedNodes,
        place: document.getElementById('eventPlace').value,
        weather: document.getElementById('eventWeather').value,
        outfit: document.getElementById('eventOutfit').value,
        peopleCount: parseInt(document.getElementById('eventPeopleCount').value) || null,
        situation: document.getElementById('eventSituation').value,
        environment: document.getElementById('eventEnvironment').value,
        notes: document.getElementById('eventNotes').value,
        updatedAt: new Date().toISOString()
    };

    const result = await saveEvent(currentEventId, eventData);
    alert(result.message);
    if (result.success) {
        closeEventModal();
        await loadEvents();
        renderEvents();
    }
};

// Delete event - wrapped to avoid naming conflict
window.handleDeleteEvent = async function(eventId) {
    if (!confirm('¿Estás seguro de eliminar este evento?')) return;

    const result = await deleteEvent(eventId);
    alert(result.message);
    if (result.success) {
        await loadEvents();
        renderEvents();
    }
};

// Delete event from modal
window.deleteEventFromModal = async function() {
    if (!currentEventId) return;
    if (!confirm('¿Estás seguro de eliminar este evento?')) return;

    const result = await deleteEvent(currentEventId);
    alert(result.message);
    if (result.success) {
        closeEventModal();
        await loadEvents();
        renderEvents();
    }
};

// Refresh network
window.refreshNetwork = function() {
    renderNetwork();
};

// Export functions
window.exportNodes = exportNodes;
window.exportEvents = exportEvents;
window.exportAllData = exportAllData;

// Close modals on outside click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};
