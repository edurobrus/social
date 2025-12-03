import { db } from './firebase.js';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

export let currentUser = null;
export let allNodes = [];
export let allEvents = [];

export function setCurrentUser(user) {
    currentUser = user;
}

export function getCurrentUser() {
    return currentUser;
}

// Load nodes
export async function loadNodes() {
    try {
        const q = query(collection(db, 'nodes'), where('user', '==', currentUser));
        const querySnapshot = await getDocs(q);
        allNodes = [];
        querySnapshot.forEach((doc) => {
            allNodes.push({ id: doc.id, ...doc.data() });
        });
        console.log(`Loaded ${allNodes.length} nodes`);
        return allNodes;
    } catch (error) {
        console.error('Error loading nodes:', error);
        alert('Error al cargar nodos: ' + error.message);
        return [];
    }
}

// Load events
export async function loadEvents() {
    try {
        const q = query(collection(db, 'events'), where('user', '==', currentUser));
        const querySnapshot = await getDocs(q);
        allEvents = [];
        querySnapshot.forEach((doc) => {
            allEvents.push({ id: doc.id, ...doc.data() });
        });
        allEvents.sort((a, b) => b.date.localeCompare(a.date));
        console.log(`Loaded ${allEvents.length} events`);
        return allEvents;
    } catch (error) {
        console.error('Error loading events:', error);
        alert('Error al cargar eventos: ' + error.message);
        return [];
    }
}

// Save node (create or update)
export async function saveNode(nodeId, nodeData) {
    try {
        if (nodeId) {
            await updateDoc(doc(db, 'nodes', nodeId), nodeData);
            return { success: true, message: 'Nodo actualizado correctamente' };
        } else {
            nodeData.createdAt = new Date().toISOString();
            const docRef = await addDoc(collection(db, 'nodes'), nodeData);
            return { success: true, message: 'Nodo creado correctamente', id: docRef.id };
        }
    } catch (error) {
        console.error('Error saving node:', error);
        return { success: false, message: 'Error al guardar el nodo: ' + error.message };
    }
}

// Delete node
export async function deleteNode(nodeId) {
    try {
        await deleteDoc(doc(db, 'nodes', nodeId));
        return { success: true, message: 'Nodo eliminado correctamente' };
    } catch (error) {
        console.error('Error deleting node:', error);
        return { success: false, message: 'Error al eliminar el nodo: ' + error.message };
    }
}

// Save event (create or update)
export async function saveEvent(eventId, eventData) {
    try {
        if (eventId) {
            await updateDoc(doc(db, 'events', eventId), eventData);
            return { success: true, message: 'Evento actualizado correctamente' };
        } else {
            eventData.createdAt = new Date().toISOString();
            const docRef = await addDoc(collection(db, 'events'), eventData);
            return { success: true, message: 'Evento guardado correctamente', id: docRef.id };
        }
    } catch (error) {
        console.error('Error saving event:', error);
        return { success: false, message: 'Error al guardar el evento: ' + error.message };
    }
}

// Delete event
export async function deleteEvent(eventId) {
    try {
        await deleteDoc(doc(db, 'events', eventId));
        return { success: true, message: 'Evento eliminado correctamente' };
    } catch (error) {
        console.error('Error deleting event:', error);
        return { success: false, message: 'Error al eliminar el evento: ' + error.message };
    }
}

// Load OwnData
export async function loadOwnData() {
    try {
        const q = query(collection(db, 'ownData'), where('user', '==', currentUser));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        }
        return null;
    } catch (error) {
        console.error('Error loading OwnData:', error);
        return null;
    }
}

// Save OwnData
export async function saveOwnData(ownData) {
    try {
        const q = query(collection(db, 'ownData'), where('user', '==', currentUser));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            ownData.createdAt = new Date().toISOString();
            await addDoc(collection(db, 'ownData'), ownData);
        } else {
            const docId = querySnapshot.docs[0].id;
            await updateDoc(doc(db, 'ownData', docId), ownData);
        }

        return { success: true, message: 'Perfil guardado correctamente' };
    } catch (error) {
        console.error('Error saving OwnData:', error);
        return { success: false, message: 'Error al guardar perfil: ' + error.message };
    }
}

// Count node events
export function countNodeEvents(nodeId) {
    return allEvents.filter(evt => evt.nodes && evt.nodes.includes(nodeId)).length;
}
