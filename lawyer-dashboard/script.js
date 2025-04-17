document.addEventListener('DOMContentLoaded', function() {
    // Sidebar navigation
    const navLinks = document.querySelectorAll('.sidebar-nav a[data-section]');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === sectionId) {
                        section.classList.add('active');
                    }
                });
            }
        });
    });

    // Submenu toggle
    const submenuToggles = document.querySelectorAll('.has-submenu > a');
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');

    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });

    // Notifications panel toggle
    const notificationsIcon = document.querySelector('.notifications');
    const notificationsPanel = document.querySelector('.notifications-panel');

    if (notificationsIcon && notificationsPanel) {
        notificationsIcon.addEventListener('click', function() {
            notificationsPanel.classList.toggle('active');
        });
    }

    // Dark mode toggle
    const themeToggle = document.querySelector('#theme-toggle');
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Load theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Modal handling
    const modal = document.querySelector('#modal');
    const modalContent = modal.querySelector('.modal-content');
    const closeModalBtn = modal.querySelector('.close');

    window.openModal = function(type) {
        modal.style.display = 'block';
        let title;
        switch(type) {
            case 'addCase':
                title = 'Add New Case';
                break;
            case 'addClient':
                title = 'Add New Client';
                break;
            case 'addTask':
                title = 'Add New Task';
                break;
            case 'editClient':
                title = 'Edit Client Profile';
                break;
            case 'editCase':
                title = 'Edit Case Details';
                break;
            default:
                title = 'Add New';
        }
        modalContent.querySelector('h3').textContent = title;
    };

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Drag-and-drop tasks
    const taskList = document.querySelector('.task-list');
    if (taskList && typeof Sortable !== 'undefined') {
        new Sortable(taskList, {
            animation: 150,
            handle: '.task-card',
            onEnd: function() {
                console.log('Task reordered');
            }
        });
    }

    // Chart.js initialization
    const chartCanvas = document.getElementById('caseChart');
    if (chartCanvas) {
        new Chart(chartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Pending', 'Closed', 'In Progress'],
                datasets: [{
                    data: [24, 15, 10],
                    backgroundColor: ['#facc15', '#3b82f6', '#1e3a8a']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Form submission handling
    const forms = document.querySelectorAll('#add-case-form, #add-client-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submitted successfully!');
            window.location.href = 'index.html#' + form.id.replace('add-', '').replace('-form', '');
        });
    });

    // Handle document upload
    const documentUpload = document.getElementById('document-upload');
    if (documentUpload) {
        documentUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                alert(`File "${file.name}" uploaded successfully!`);
            }
        });
    }

    // Handle note saving
    const saveNoteButtons = document.querySelectorAll('.case-notes .btn, .client-communication .btn');
    saveNoteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textarea = this.parentElement.querySelector('textarea');
            if (textarea.value.trim()) {
                alert('Note saved successfully!');
                textarea.value = '';
            }
        });
    });
});