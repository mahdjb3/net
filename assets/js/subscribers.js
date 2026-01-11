// subscribers.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addSubscriberForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const tableBody = document.getElementById('subscribersTableBody');

    // Render table from Firebase data
    function renderTable(subscribers) {
        tableBody.innerHTML = '';
        for (let key in subscribers) {
            const sub = subscribers[key];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${subscribers ? Object.keys(subscribers).indexOf(key) + 1 : 1}</td>
                <td>${sub.name}</td>
                <td>${sub.phone}</td>
                <td><button class="deleteBtn" data-key="${key}">Delete</button></td>
            `;
            tableBody.appendChild(row);
        }

        // Delete button
        document.querySelectorAll('.deleteBtn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const key = e.target.dataset.key;
                db.ref('subscribers/' + key).remove();
            });
        });
    }

    // Listen to Firebase for real-time updates
    db.ref('subscribers').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            renderTable(data);
        } else {
            tableBody.innerHTML = ''; // No subscribers
        }
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

        // Push new subscriber to Firebase
        const newSubRef = db.ref('subscribers').push();
        newSubRef.set({ name, phone });

        form.reset();
    });
});
