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
            
            // Generate a random referral code (for demo purposes)
            const referralCode = generateReferralCode();
            
            // Show success message
            showSuccessMessage(name, referralCode);
            
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
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'KROM';
    
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return code;
}

// Show success message after form submission
function showSuccessMessage(name, code) {
    const formContainer = document.querySelector('.referral-form');
    const successMessage = document.createElement('div');
    
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Selamat, ${name}!</h3>
        <p>Kode referral Anda adalah:</p>
        <div class="referral-code">${code}</div>
        <p>Bagikan kode ini kepada teman Anda untuk mendapatkan reward.</p>
        <button class="btn-primary copy-btn" data-code="${code}">
            <i class="fas fa-copy"></i> Salin Kode
        </button>
    `;
    
    // Replace form with success message
    formContainer.style.display = 'none';
    formContainer.parentNode.appendChild(successMessage);
    
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
}

// Add animation on scroll
window.addEventListener('load', function() {
    const animatedElements = document.querySelectorAll('.reward-card, .step, .faq-item');
    
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