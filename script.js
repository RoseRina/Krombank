// Toggle FAQ Items
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const referralForm = document.getElementById('referral-form');
    
    if (referralForm) {
        referralForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const option = document.getElementById('option').value;
            
            // Validate form
            if (!name || !email || !phone || !option) {
                showMessage('error', 'Mohon lengkapi semua field');
                return;
            }
            
            // For demo, show loading message
            showLoadingMessage();
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Generate a random referral code (for demo purposes)
                const referralCode = generateReferralCode();
                
                // Show success message
                showSuccessMessage(name, referralCode, option);
            }, 1500);
            
            // Reset form
            this.reset();
        });
    }
    
    // Sticky Header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        lastScrollTop = scrollTop;
    });
});

// Generate a random referral code
function generateReferralCode() {
    // Menggunakan kode referral yang telah ditentukan
    return 'FERD5294';
}

// Show loading message
function showLoadingMessage() {
    const formContainer = document.querySelector('.referral-form');
    const loadingMessage = document.createElement('div');
    
    loadingMessage.className = 'loading-message';
    loadingMessage.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
        <p>Memproses permintaan Anda...</p>
    `;
    
    // Add loading message below form
    formContainer.style.display = 'none';
    formContainer.parentNode.appendChild(loadingMessage);
}

// Show error message
function showMessage(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const form = document.getElementById('referral-form');
    form.parentNode.insertBefore(alertDiv, form);
    
    // Remove the alert after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Show success message after form submission
function showSuccessMessage(name, code, option) {
    const formContainer = document.querySelector('.loading-message') || document.querySelector('.referral-form');
    const registerContent = formContainer.parentNode;
    const successMessage = document.createElement('div');
    
    let rewardText = '';
    if (option === '300rb') {
        rewardText = 'Rp75.000 (Rp50.000 dari KromBank + Rp25.000 bonus dari saya)';
    } else if (option === '2jt') {
        rewardText = 'Rp250.000 (Rp150.000 dari KromBank + Rp100.000 bonus dari saya)';
    } else {
        rewardText = 'rewards menarik sesuai pilihan paket Anda';
    }
    
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Terima kasih, ${name}!</h3>
        <p>Kode referral saya adalah:</p>
        <div class="referral-code">${code}</div>
        <p>Silakan <a href="https://krom.id/referral/?code=${code}" target="_blank">daftar KromBank dengan kode di atas</a>.</p>
        <p>Setelah mendaftar dan menabung, silakan <a href="https://wa.me/6285752083533?text=Halo%20Ferdi,%20saya%20${name}%20sudah%20membuka%20KromBank%20menggunakan%20kode%20referral%20kamu%20${code}" target="_blank">konfirmasi ke WhatsApp Ferdi</a> untuk lebih lanjut.</p>
        <p>Anda akan mendapatkan ${rewardText}.</p>
        <button class="btn-primary copy-btn" data-code="${code}">
            <i class="fas fa-copy"></i> Salin Kode
        </button>
        <div class="reset-container">
            <a href="https://wa.me/6285752083533?text=Halo%20Ferdi,%20saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20referral%20KromBank" target="_blank" class="btn-primary whatsapp-btn">
                <i class="fab fa-whatsapp"></i> Chat di WhatsApp
            </a>
            <button class="btn-secondary reset-btn">
                <i class="fas fa-redo"></i> Isi Form Lagi
            </button>
        </div>
    `;
    
    // Replace loading message with success message
    if (formContainer) {
        formContainer.remove();
    }
    registerContent.appendChild(successMessage);
    
    // Add copy to clipboard functionality
    const copyBtn = document.querySelector('.copy-btn');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const code = this.getAttribute('data-code');
            navigator.clipboard.writeText(code)
                .then(() => {
                    this.innerHTML = '<i class="fas fa-check"></i> Disalin!';
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-copy"></i> Salin Kode';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    }
    
    // Add reset form functionality
    const resetBtn = document.querySelector('.reset-btn');
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            const successMsg = document.querySelector('.success-message');
            if (successMsg) {
                successMsg.remove();
            }
            
            const referralForm = document.querySelector('.referral-form');
            if (referralForm) {
                referralForm.style.display = 'block';
            }
        });
    }
}

// Add animation on scroll
window.addEventListener('load', function() {
    const animatedElements = document.querySelectorAll('.reward-card, .step, .faq-item, .promo-feature');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (elementPosition.top < windowHeight * 0.9) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
}); 