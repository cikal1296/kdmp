

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
    
    // Button click animations
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
    

    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    document.body.appendChild(darkModeToggle);
    
    // Add dark mode styles
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = `
        body.dark-mode {
            background-color: #111827 !important;
            color: #f9fafb !important;
        }
        
        body.dark-mode .hero-section {
            background-color: #111827 !important;
        }
        
        body.dark-mode .hero-title,
        body.dark-mode .feature-card h3 {
            color: #f9fafb !important;
        }
        
        body.dark-mode .hero-subtitle,
        body.dark-mode .feature-card p {
            color: #d1d5db !important;
        }
        
        body.dark-mode .btn-secondary {
            background-color: #374151 !important;
            border-color: #4b5563 !important;
            color: #f9fafb !important;
        }
        
        body.dark-mode .btn-secondary:hover {
            background-color: #4b5563 !important;
        }
        
        body.dark-mode .features-section {
            background-color: #1f2937 !important;
        }
        
        body.dark-mode .feature-card {
            background-color: #374151 !important;
        }
        
        body.dark-mode .stat-number {
            color: #f9fafb !important;
        }
        
        body.dark-mode .stat-label {
            color: #d1d5db !important;
        }
        
        #darkModeToggle:hover {
            transform: scale(1.1) rotate(30deg);
        }
    `;
    document.head.appendChild(darkModeStyles);
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
});


// Team Section Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll for team members
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe team members
    document.querySelectorAll('.team-member').forEach(member => {
        teamObserver.observe(member);
    });

    // Observe supervisor items
    document.querySelectorAll('.supervisor-item').forEach(item => {
        teamObserver.observe(item);
    });

    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .team-member.animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        .supervisor-item.animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
    `;
    document.head.appendChild(style);

    // Social media link interactions
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact info copy functionality
    document.querySelectorAll('.contact-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.title = 'Klik untuk menyalin';
        
        item.addEventListener('click', function() {
            const textToCopy = this.textContent.trim();
            
            // Create temporary textarea for copying
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // Show feedback
            const originalContent = this.innerHTML;
            const icon = this.querySelector('i').cloneNode(true);
            
            this.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
            this.style.color = '#28a745';
            this.style.backgroundColor = '#f0fff4';
            
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.style.color = '';
                this.style.backgroundColor = '';
            }, 1500);
        });
    });

    // Hover effect for team members
    document.querySelectorAll('.team-member').forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Badge for new members (optional feature)
    const currentYear = new Date().getFullYear();
    const teamData = [
        { name: 'H. Ahmad Sujana', joinYear: currentYear - 3 },
        { name: 'Sri Wulandari, S.E.', joinYear: currentYear - 2 },
        { name: 'Dewi Kusuma Wardani', joinYear: currentYear - 1 },
        { name: 'Bambang Sutrisno', joinYear: currentYear - 4 }
    ];

    // Add experience badge to team members
    document.querySelectorAll('.team-member').forEach((member, index) => {
        const memberName = member.querySelector('.member-name').textContent;
        const memberData = teamData.find(data => data.name === memberName);
        
        if (memberData) {
            const experience = currentYear - memberData.joinYear;
            if (experience <= 1) {
                const badge = document.createElement('span');
                badge.className = 'experience-badge';
                badge.textContent = 'Anggota Baru';
                badge.style.cssText = `
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: linear-gradient(135deg, #dc3545, #c82333);
                    color: white;
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    z-index: 2;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                `;
                
                const memberImage = member.querySelector('.member-image');
                if (memberImage) {
                    memberImage.style.position = 'relative';
                    memberImage.appendChild(badge);
                }
            }
        }
    });

    // Parallax effect for team section
    let scrollPosition = 0;
    const teamSection = document.querySelector('.team-section');
    
    if (teamSection) {
        window.addEventListener('scroll', function() {
            scrollPosition = window.pageYOffset;
            const teamSectionTop = teamSection.offsetTop;
            const teamSectionHeight = teamSection.offsetHeight;
            
            if (scrollPosition > teamSectionTop - window.innerHeight && 
                scrollPosition < teamSectionTop + teamSectionHeight) {
                
                const scrolled = scrollPosition - teamSectionTop;
                const members = teamSection.querySelectorAll('.team-member');
                
                members.forEach((member, index) => {
                    const speed = 0.1 * (index + 1);
                    const yPos = -(scrolled * speed * 0.3);
                    member.style.transform = `translateY(${yPos}px)`;
                });
            }
        });
    }
});

// Additional utility functions
function initTeamGallery() {
    // This function can be extended for a team gallery modal
    const memberImages = document.querySelectorAll('.member-image img');
    
    memberImages.forEach(image => {
        image.style.cursor = 'zoom-in';
        
        image.addEventListener('click', function() {
            // Create modal for larger image view
            const modal = document.createElement('div');
            modal.className = 'team-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: zoom-out;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Close modal on click
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Close on ESC key
            document.addEventListener('keydown', function closeModal(e) {
                if (e.key === 'Escape') {
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', closeModal);
                }
            });
        });
    });
}

// Initialize when document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeamGallery);
} else {
    initTeamGallery();
}

// Potensi Desa Script
document.addEventListener('DOMContentLoaded', function() {
    // Data potensi desa
    const potensiData = [
        {
            id: 1,
            nama: 'Kambing',
            kategori: 'Peternakan',
            luasArea: '7.00 ha',
            volume: '500.00 ekor',
            sdm: 100,
            nilai: 1500000000,
            icon: 'fas fa-paw',
            color: '#dc3545'
        },
        {
            id: 2,
            nama: 'Ubi Kayu',
            kategori: 'Pertanian',
            luasArea: '5.00 ha',
            volume: '250.00 ton',
            sdm: 600,
            nilai: 187500000,
            icon: 'fas fa-seedling',
            color: '#28a745'
        }
    ];

    // Format number dengan titik
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Format currency Rupiah
    function formatCurrency(amount) {
        return 'Rp ' + formatNumber(amount) + ',00';
    }

    // Animate progress bars
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }

    // Animate circular charts
    function animateCircularCharts() {
        const circles = document.querySelectorAll('.circle');
        circles.forEach(circle => {
            const dashArray = circle.getAttribute('stroke-dasharray');
            circle.style.strokeDasharray = '0 100';
            setTimeout(() => {
                circle.style.strokeDasharray = dashArray;
            }, 500);
        });
    }

    // Update total values
    function updateTotals() {
        const totalSDM = potensiData.reduce((sum, item) => sum + item.sdm, 0);
        const totalNilai = potensiData.reduce((sum, item) => sum + item.nilai, 0);
        
        // Update SDM total
        const sdmElement = document.querySelector('.sdm-count.total span');
        if (sdmElement) {
            sdmElement.textContent = `${formatNumber(totalSDM)} jiwa`;
        }
        
        // Update nilai total
        const nilaiElement = document.querySelector('.total-nilai .nilai-amount');
        if (nilaiElement) {
            nilaiElement.textContent = formatCurrency(totalNilai);
        }
    }

    // Interactive table row click
    document.querySelectorAll('.potensi-table tbody tr:not(.total-row)').forEach(row => {
        row.style.cursor = 'pointer';
        
        row.addEventListener('click', function() {
            const id = parseInt(this.querySelector('td[data-label="No"]').textContent);
            const data = potensiData.find(item => item.id === id);
            
            if (data) {
                showPotensiDetail(data);
            }
        });
    });

    // Show potensi detail modal
    function showPotensiDetail(data) {
        const modalHTML = `
            <div class="potensi-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Detail Potensi: ${data.nama}</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="detail-grid">
                            <div class="detail-item">
                                <span class="detail-label">Kategori</span>
                                <span class="detail-value">${data.kategori}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Luas Area</span>
                                <span class="detail-value">${data.luasArea}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Volume</span>
                                <span class="detail-value">${data.volume}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">SDM Terlibat</span>
                                <span class="detail-value">${formatNumber(data.sdm)} jiwa</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Nilai Potensi</span>
                                <span class="detail-value">${formatCurrency(data.nilai)}</span>
                            </div>
                        </div>
                        
                        <div class="detail-chart">
                            <h4>Distribusi Nilai</h4>
                            <div class="chart-container">
                                <canvas id="potensiChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);
        
        // Add modal styles
        const modalStyles = `
            .potensi-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 20px;
            }
            .modal-content {
                background: white;
                border-radius: 16px;
                width: 100%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            .modal-header {
                padding: 20px 30px;
                background: linear-gradient(135deg, #dc3545, #c82333);
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 16px 16px 0 0;
            }
            .modal-header h3 {
                margin: 0;
                font-size: 1.3rem;
            }
            .close-modal {
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                line-height: 1;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-body {
                padding: 30px;
            }
            .detail-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-bottom: 30px;
            }
            .detail-item {
                padding: 15px;
                background: #f8f9fa;
                border-radius: 10px;
                border-left: 4px solid ${data.color};
            }
            .detail-label {
                display: block;
                font-size: 0.9rem;
                color: #666;
                margin-bottom: 5px;
            }
            .detail-value {
                display: block;
                font-size: 1.1rem;
                font-weight: 600;
                color: #2c3e50;
            }
            .detail-chart {
                margin-top: 30px;
            }
            .detail-chart h4 {
                margin-bottom: 20px;
                color: #2c3e50;
            }
            .chart-container {
                height: 200px;
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = modalStyles;
        document.head.appendChild(styleElement);
        
        // Close modal functionality
        const closeBtn = modalContainer.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modalContainer);
            document.head.removeChild(styleElement);
        });
        
        modalContainer.querySelector('.potensi-modal').addEventListener('click', (e) => {
            if (e.target === modalContainer.querySelector('.potensi-modal')) {
                document.body.removeChild(modalContainer);
                document.head.removeChild(styleElement);
            }
        });
    }

    // Export button functionality
    const exportBtn = document.querySelector('.btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            const dataToExport = {
                judul: 'Potensi Desa Karoya',
                timestamp: new Date().toLocaleString('id-ID'),
                data: potensiData
            };
            
            const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
                type: 'application/json'
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'potensi-desa-karoya.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Show success message
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Berhasil Diexport';
            this.style.background = '#28a745';
            this.style.color = 'white';
            this.style.border = 'none';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
                this.style.color = '';
                this.style.border = '';
            }, 2000);
        });
    }

    // Detail button functionality
    const detailBtn = document.querySelector('.btn-detail');
    if (detailBtn) {
        detailBtn.addEventListener('click', function() {
            showSummaryModal();
        });
    }

    // Show summary modal
    function showSummaryModal() {
        const totalNilai = potensiData.reduce((sum, item) => sum + item.nilai, 0);
        const totalSDM = potensiData.reduce((sum, item) => sum + item.sdm, 0);
        
        const summaryHTML = `
            <div class="summary-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Ringkasan Potensi Desa</h3>
                        <button class="close-summary">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="summary-stats">
                            <div class="summary-stat">
                                <div class="stat-value">${formatCurrency(totalNilai)}</div>
                                <div class="stat-label">Total Nilai Potensi</div>
                            </div>
                            <div class="summary-stat">
                                <div class="stat-value">${formatNumber(totalSDM)}</div>
                                <div class="stat-label">Total SDM Terlibat</div>
                            </div>
                        </div>
                        
                        <div class="summary-table">
                            <h4>Detail Per Potensi</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Potensi</th>
                                        <th>Kontribusi</th>
                                        <th>SDM</th>
                                        <th>Nilai</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${potensiData.map(item => `
                                        <tr>
                                            <td>${item.nama}</td>
                                            <td>${((item.nilai / totalNilai) * 100).toFixed(1)}%</td>
                                            <td>${formatNumber(item.sdm)} jiwa</td>
                                            <td>${formatCurrency(item.nilai)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = summaryHTML;
        document.body.appendChild(modalContainer);
        
        // Add modal styles
        const modalStyles = `
           /* Reset dan Font */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Modal Container */
.summary-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
}

/* Modal Content */
.modal-content {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: modalAppear 0.3s ease-out;
    border-top: 4px solid #d32f2f;
}

@keyframes modalAppear {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Modal Header */
.modal-header {
    background: linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%);
    color: white;
    padding: 24px 32px;
    text-align: center;
    position: relative;
}

.modal-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #ff9800 0%, #ff5722 100%);
}

.modal-header h3 {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin: 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Modal Body */
.modal-body {
    padding: 32px;
    overflow-y: auto;
    flex-grow: 1;
}

/* Summary Stats */
.summary-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    margin-bottom: 40px;
}

.summary-stat {
    background: linear-gradient(to bottom right, #fff5f5, #ffeaea);
    border-radius: 10px;
    padding: 24px;
    text-align: center;
    border: 1px solid #ffcdd2;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.summary-stat::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: #d32f2f;
}

.summary-stat:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(211, 47, 47, 0.15);
    border-color: #d32f2f;
}

.stat-value {
    font-size: 32px;
    font-weight: 800;
    color: #b71c1c;
    margin-bottom: 8px;
    line-height: 1.2;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.stat-label {
    font-size: 16px;
    color: #d32f2f;
    font-weight: 600;
    letter-spacing: 0.3px;
}

/* Summary Table */
.summary-table h4 {
    font-size: 20px;
    color: #b71c1c;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid #ffcdd2;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
}

.summary-table h4::before {
    content: '';
    width: 6px;
    height: 24px;
    background: #d32f2f;
    border-radius: 3px;
}

.summary-table table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(211, 47, 47, 0.08);
    border: 1px solid #ffcdd2;
}

.summary-table thead {
    background: linear-gradient(to right, #d32f2f, #f44336);
    color: white;
}

.summary-table th {
    padding: 18px 16px;
    text-align: left;
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 0.3px;
    position: relative;
}

.summary-table th:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
    background: rgba(255, 255, 255, 0.3);
}

.summary-table tbody tr {
    border-bottom: 1px solid #ffebee;
    transition: all 0.2s ease;
}

.summary-table tbody tr:nth-child(even) {
    background-color: #fff5f5;
}

.summary-table tbody tr:hover {
    background-color: #ffebee;
    transform: scale(1.002);
}

.summary-table td {
    padding: 16px;
    color: #5d4037;
    font-size: 15px;
    font-weight: 500;
}

.summary-table td:first-child {
    font-weight: 700;
    color: #b71c1c;
    border-left: 3px solid transparent;
    transition: border-color 0.3s;
}

.summary-table tr:hover td:first-child {
    border-left-color: #d32f2f;
}

.summary-table td:nth-child(2) {
    color: #388e3c;
    font-weight: 700;
    background: rgba(76, 175, 80, 0.1);
    border-radius: 4px;
    margin: 2px;
}

.summary-table td:nth-child(3) {
    color: #d84315;
    font-weight: 500;
}

.summary-table td:last-child {
    font-weight: 700;
    color: #bf360c;
}

/* Responsive Design */
@media (max-width: 768px) {
    .modal-content {
        max-height: 95vh;
        border-radius: 8px;
    }
    
    .modal-body {
        padding: 24px 16px;
    }
    
    .summary-stats {
        grid-template-columns: 1fr;
        gap: 16px;
    }
    
    .stat-value {
        font-size: 28px;
    }
    
    .summary-table table {
        display: block;
        overflow-x: auto;
    }
    
    .summary-table th,
    .summary-table td {
        padding: 12px 10px;
        font-size: 14px;
    }
    
    .modal-header h3 {
        font-size: 20px;
    }
}

@media (max-width: 480px) {
    .modal-header {
        padding: 20px 16px;
    }
    
    .modal-header h3 {
        font-size: 18px;
    }
    
    .summary-table h4 {
        font-size: 18px;
    }
    
    .stat-value {
        font-size: 24px;
    }
    
    .stat-label {
        font-size: 14px;
    }
    
    .summary-stat::before {
        width: 3px;
    }
}

/* Scrollbar Styling */
.modal-body::-webkit-scrollbar {
    width: 8px;
}

.modal-body::-webkit-scrollbar-track {
    background: #ffebee;
}

.modal-body::-webkit-scrollbar-thumb {
    background: #d32f2f;
    border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
    background: #b71c1c;
}
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = modalStyles;
        document.head.appendChild(styleElement);
        
        // Close modal
        const closeBtn = modalContainer.querySelector('.close-summary');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modalContainer);
            document.head.removeChild(styleElement);
        });
        
        modalContainer.querySelector('.summary-modal').addEventListener('click', (e) => {
            if (e.target === modalContainer.querySelector('.summary-modal')) {
                document.body.removeChild(modalContainer);
                document.head.removeChild(styleElement);
            }
        });
    }

    // Initialize animations
    setTimeout(() => {
        animateProgressBars();
        animateCircularCharts();
        updateTotals();
    }, 500);

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                if (entry.target.classList.contains('chart-circle')) {
                    animateCircularCharts();
                }
                
                if (entry.target.classList.contains('progress-bar')) {
                    animateProgressBars();
                }
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe elements for animation
    document.querySelectorAll('.stat-card, .chart-circle, .progress-bar').forEach(el => {
        observer.observe(el);
    });
});





// Hover effect untuk marker
document.addEventListener('DOMContentLoaded', function() {
  const markers = document.querySelectorAll('.marker');
  markers.forEach(marker => {
    marker.addEventListener('mouseenter', function() {
      const tooltip = this.querySelector('.tooltip');
      if (tooltip) tooltip.style.opacity = '1';
    });
    
    marker.addEventListener('mouseleave', function() {
      const tooltip = this.querySelector('.tooltip');
      if (tooltip) tooltip.style.opacity = '0';
    });
  });
});


