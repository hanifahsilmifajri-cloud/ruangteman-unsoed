document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LOGIKA MENU MOBILE (HAMBURGER)
    // ==========================================
    setupMobileMenu();

    function setupMobileMenu() {
        const btn = document.getElementById('mobile-menu-button');
        const menu = document.getElementById('mobile-menu');
        const icon = document.getElementById('menu-icon');

        if(btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
                
                if(icon) {
                    if(menu.classList.contains('hidden')){
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    } else {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-xmark');
                    }
                }
            });
        }
    }

    // ==========================================
    // 2. LOGIKA ANIMASI SCROLL (OBSERVER)
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                entry.target.classList.add('opacity-100', 'translate-y-0', 'translate-x-0', 'scale-100');
                entry.target.classList.remove('opacity-0', 'translate-y-10', '-translate-x-5', '-translate-x-10', 'scale-90', 'scale-50');
                obs.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-on-scroll, .animate-slide-left, .animate-slide-right');
    animatedElements.forEach(el => observer.observe(el));


    // =========================================================
    // 3. CEK STATUS LOGIN GLOBAL (UBAH TOMBOL NAVBAR) + DEBUG
    // =========================================================
    
    // Mengambil status login dari memori browser
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userEmail = localStorage.getItem("userEmail");

    // Teks cetak di bawah ini buat kita ngintip di Inspect Element (F12)
    console.log("=== DEBUG MENCARI MASALAH NAVBAR ===");
    console.log("Apakah Status Login True?:", isLoggedIn);
    console.log("Email yang tersimpan:", userEmail);

    // Strategi paling aman: Ambil semua link yang ada di dalam navbar
    const allNavLinks = document.querySelectorAll('nav a');

    if (isLoggedIn) {
        allNavLinks.forEach(btn => {
            const text = btn.innerText.toLowerCase();
            const href = btn.getAttribute('href') || '';

            // Jika tombolnya ada tulisan "masuk" ATAU link-nya mengarah ke "login.html"
            if (text.includes('masuk') || href.includes('login.html')) {
                console.log("🎯 KETEMU! Tombol Masuk berhasil diubah jadi Dashboard.");
                btn.href = "dashboard.html"; 
                btn.innerHTML = `<i class="fa-solid fa-border-all"></i> Dashboard`; 
            }
        });
    }
});