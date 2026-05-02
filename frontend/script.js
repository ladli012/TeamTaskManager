const API_URL = 'http://localhost:5000/api';

// Signup Logic
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        try {
            const res = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role })
            });

            const data = await res.json();
            if (res.ok) {
                alert("Signup Successful! Redirecting to login...");
                window.location.href = 'login.html';
            } else {
                alert(data.msg || "Signup failed");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Server se connection nahi ho raha hai.");
        }
    });
}

// Login Logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                alert("Login Successful!");
                window.location.href = 'dashboard.html';
            } else {
                alert(data.msg || "Invalid Credentials");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Server se connection nahi ho raha hai.");
        }
    });
}

// Dashboard Logic
document.addEventListener("DOMContentLoaded", async () => {
    if (window.location.pathname.includes("dashboard.html")) {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first!");
            window.location.href = "login.html";
            return;
        }

        await loadTasks();

        const taskForm = document.getElementById("taskForm");
        if (taskForm) {
            taskForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const title = document.getElementById("taskTitle").value;
                const description = document.getElementById("taskDesc") ? document.getElementById("taskDesc").value : "No Description";
                const dueDate = document.getElementById("dueDate").value;
                const project = document.getElementById("projectSelect").value;

                try {
                    const res = await fetch(`${API_URL}/task`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            title,
                            description,
                            dueDate,
                            project
                        })
                    });
                    
                    if (res.ok) {
                        alert("Task Created!");
                        location.reload();
                    } else {
                        const errorData = await res.json();
                        alert(errorData.msg || "Failed to create task");
                    }
                } catch (err) {
                    console.error("Error creating task:", err);
                    alert("Server error, try again.");
                }
            });
        }
    }
});

async function loadTasks() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    try {
        const res = await fetch(`${API_URL}/task/my-tasks`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const tasks = await res.json();
        const taskList = document.getElementById("tasks");
        if (!taskList) return; 

        taskList.innerHTML = "";
        
        if (!Array.isArray(tasks) || tasks.length === 0) {
            taskList.innerHTML = `<p style="color: #888; text-align: center; padding: 20px;">No tasks found.</p>`;
            return;
        }

        tasks.forEach(task => {
            const li = document.createElement("li");

            let actionButton = `<button onclick="updateStatus('${task._id}', 'Completed')">Complete</button>`;
            if (role === 'Admin') {
                actionButton = `<span style="color: #3498db; font-weight: 500;">(Admin View)</span>`;
            }

            li.innerHTML = `
                <div style="width: 100%;">
                    <strong>${task.title}</strong>
                    <p style="font-size: 0.85rem; color: #7f8c8d; margin-top: 4px;">Project: ${task.project} | Due: ${task.dueDate ? task.dueDate.split('T')[0] : 'N/A'}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                        <span>Status: <b>${task.status}</b></span>
                        <div>${actionButton}</div>
                    </div>
                </div>
            `;
            taskList.appendChild(li);
        });
    } catch (err) {
        console.error("Error loading tasks:", err);
    }
}

async function updateStatus(id, newStatus) {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(`${API_URL}/task/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
        });
        
        if (res.ok) {
            alert("Task status updated successfully!");
            location.reload();
        } else {
            alert("Failed to update status.");
        }
    } catch (err) {
        console.error(err);
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}