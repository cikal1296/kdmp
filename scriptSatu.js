
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('mainNavbar');
            if (window.scrollY > 30) {              
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
// Tunggu sampai DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Handle semua dropdown
    document.querySelectorAll('.dropdown-wrapper').forEach(wrapper => {
        const btn = wrapper.querySelector('.btn-dropdown');
        const dropdown = wrapper.querySelector('.dropdown-menu');
        
        if (btn && dropdown) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                
                // Tutup semua dropdown lain yang terbuka
                document.querySelectorAll('.dropdown-menu.show').forEach(openDropdown => {
                    if (openDropdown !== dropdown) {
                        openDropdown.classList.remove('show');
                    }
                });
                
                // Tutup semua button active lain
                document.querySelectorAll('.btn-dropdown.active').forEach(activeBtn => {
                    if (activeBtn !== btn) {
                        activeBtn.classList.remove('active');
                    }
                });
                
                // Toggle dropdown dan button saat ini
                dropdown.classList.toggle('show');
                btn.classList.toggle('active');
            });
            
            // Tutup dropdown saat memilih item
            dropdown.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', function() {
                    dropdown.classList.remove('show');
                    btn.classList.remove('active');
                });
            });
        }
    });

    // Klik di luar → tutup semua dropdown
    document.addEventListener('click', function () {
        document.querySelectorAll('.dropdown-menu.show').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
        document.querySelectorAll('.btn-dropdown.active').forEach(btn => {
            btn.classList.remove('active');
        });
    });
});
