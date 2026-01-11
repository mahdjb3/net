// subscribers.js
import { database } from './firebase.js';
import { ref, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addSubscriberForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const tableBody = document.getElementById('subscribersTableBody');

    // Render table from Firebase data
    function renderTable(subscribers) {
        tableBody.innerHTML = '';
        Object.keys(subscribers || {}).forEach((key, index) => {
            const sub = subscribers[key];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${sub.name}</td>
                <td>${sub.phone}</td>
                <td><button class="deleteBtn" data-key="${key}">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Attach delete handlers
        document.querySelectorAll('.deleteBtn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const key = e.target.dataset.key;
                remove(ref(database, 'subscribers/' + key));
            });
        });
    }

    // Listen to Firebase for changes
    onValue(ref(database, 'subscribers'), (snapshot) => {
        renderTable(snapshot.val());
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (!name || !phone) {
            alert('Please enter both name and phone.');
            return;
        }

        const newSubscriberRef = push(ref(database, 'subscribers'));
        set(newSubscriberRef, { name, phone });

        form.reset();
    });
});
