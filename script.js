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
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
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
            const message = document.getElementById('message') ? document.getElementById('message').value : '';
            
            // Validate form
            if (!name || !email || !phone || !option) {
                showMessage('error', 'Mohon lengkapi semua field');
                return;
            }
            
            // Build WhatsApp message
            let optionText = '';
            if (option === '300rb') {
                optionText = 'Nabung 300rb (Hold 1 bulan)';
            } else if (option === '2jt') {
                optionText = 'Nabung 2 Juta (Hold 38 hari)';
            } else {
                optionText = 'Belum memutuskan paket';
            }
            
            // Format WhatsApp message
            let whatsappMessage = `Halo Ferdi, saya ${name} ingin daftar KromBank menggunakan kode referral FERD5294.%0A%0AInformasi saya:%0A- Email: ${email}%0A- No. HP: ${phone}%0A- Pilihan: ${optionText}`;
            
            // Add message if provided
            if (message) {
                whatsappMessage += `%0A%0APesan tambahan: ${message}`;
            }
            
            // Show loading message for a moment
            showLoadingMessage();
            
            // Redirect to WhatsApp after a short delay
            setTimeout(() => {
                window.location.href = `https://wa.me/6285752083533?text=${whatsappMessage}`;
            }, 1500);
        });
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('error');
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        const re = /^(\+62|62|0)[0-9]{9,12}$/;
        return re.test(phone);
    }
    
    // Sticky header
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    let isSticky = false;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100 && !isSticky) {
            header.classList.add('sticky');
            document.body.style.paddingTop = headerHeight + 'px';
            isSticky = true;
        } else if (window.scrollY <= 100 && isSticky) {
            header.classList.remove('sticky');
            document.body.style.paddingTop = '0';
            isSticky = false;
        }
    });
    
    // Mobile menu toggle
    const menuButton = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    const overlay = document.querySelector('.overlay');
    
    if (menuButton && mobileNav) {
        menuButton.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            menuButton.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            if (overlay) {
                overlay.classList.toggle('active');
            }
        });
        
        // Close mobile menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                menuButton.classList.remove('active');
                document.body.classList.remove('no-scroll');
                if (overlay) {
                    overlay.classList.remove('active');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        if (overlay) {
            overlay.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                menuButton.classList.remove('active');
                document.body.classList.remove('no-scroll');
                overlay.classList.remove('active');
            });
        }
    }
    
    // Animation delays for cards
    const reviewCards = document.querySelectorAll('.review-card');
    const benefitCards = document.querySelectorAll('.benefit-card');
    const heroStats = document.querySelector('.hero-stats');
    
    reviewCards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 + index * 0.2}s`;
    });
    
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 + index * 0.2}s`;
    });
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.benefit-card, .review-card, .reward-card, .step, .faq-item, .promo-feature, .hero-stats');
    
    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animate');
            }
        });
    }
    
    // Check on load
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
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
    const animatedElements = document.querySelectorAll('.reward-card, .step, .faq-item, .promo-feature, .benefit-card, .review-card, .hero-stats');
    
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