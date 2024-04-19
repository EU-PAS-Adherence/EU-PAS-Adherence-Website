document.addEventListener("DOMContentLoaded", function(_) {
        const openMenuButton = document.getElementById('menu-open');
        const closeMenuButton = document.getElementById('menu-close');
        const menuDialog = document.getElementById('menu-dialog');
        
        openMenuButton.addEventListener('click', (_) => {
            menuDialog.classList.remove('hidden');
        });
        
        closeMenuButton.addEventListener('click', (_) => {
            menuDialog.classList.add('hidden');
        });
    }
);