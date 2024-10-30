// Function for smooth scrolling
function smoothScrolling() {
    const lenis = new Lenis();

    lenis.on('scroll', (e) => {
        console.log(e);
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

// Form validation function
function validateForm(formType) {
    const form = document.getElementById(formType === 'signup' ? 'form1' : 'form2');
    const errorMessage = document.getElementById('error-message');
    const fields = Array.from(form.querySelectorAll('input'));

    errorMessage.innerText = '';

    if (fields.some(field => !field.value)) {
        errorMessage.innerText = 'Please fill all the details.';
        return false;
    }

    if (formType === 'signup') {
        const [password1, password2] = fields.slice(-2).map(field => field.value);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

        if (!passwordRegex.test(password1)) {
            errorMessage.innerText = 'Password must be at least 8 characters long, including uppercase, lowercase, and special characters.';
            return false;
        }

        if (password1 !== password2) {
            errorMessage.innerText = 'Passwords do not match.';
            return false;
        }
    }

    return true;
}

// Initialize DOM content
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const progressBar = document.getElementById('progress-bar');
    const imageInput = document.getElementById('image-input');
    const uploadButton = document.getElementById('upload-button');
    const classificationResult = document.getElementById('classification-result');
    const disposalInformation = document.getElementById('disposal-information');
    const feedbackForm = document.getElementById('feedback-form');
    const newsletterForm = document.getElementById('newsletter-form');
    const signupForm = document.getElementById('form1');
    const loginForm = document.getElementById('form2');
    const scrollToTopBtn = document.getElementById('BacktoTop');

    // Menu toggle functionality
    menuToggle?.addEventListener('click', () => navMenu?.classList.toggle('show'));

    // Theme toggle functionality
    themeToggle?.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌓';
    });

    // FAQ toggle functionality
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        if (question && answer) {
            answer.style.display = 'none';
            question.addEventListener('click', () => {
                answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            });
        }
    });

    // Progress bar functionality
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrollPercentage}%`;
        });
    }

    // Image upload functionality
    uploadButton?.addEventListener('click', () => {
        const image = imageInput?.files[0];
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);

        fetch('/classify', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            classificationResult.textContent = data.classification;
            disposalInformation.textContent = data.disposalInformation;
        })
        .catch(console.error);
    });

    // Feedback form validation
    feedbackForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const [name, email, message] = ['input[type="text"]', 'input[type="email"]', 'textarea']
            .map(selector => feedbackForm.querySelector(selector)?.value.trim());

        const nameValid = name?.length >= 2;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const messageValid = message?.length >= 10;

        if (nameValid && emailValid && messageValid) {
            alert('Feedback submitted successfully!');
            feedbackForm.reset();
        } else {
            if (!nameValid) feedbackForm.querySelector('input[type="text"]').setCustomValidity('Name must be at least 2 characters long.');
            if (!emailValid) feedbackForm.querySelector('input[type="email"]').setCustomValidity('Please enter a valid email address.');
            if (!messageValid) alert('Message must be at least 10 characters long.');
            feedbackForm.reportValidity();
        }
    });

    // Newsletter form validation
    newsletterForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]')?.value.trim();
        const newsletterErrorMessage = document.getElementById('newsletter-error-message');

        if (newsletterErrorMessage) newsletterErrorMessage.textContent = '';

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Subscribed successfully!');
            newsletterForm.reset();
        } else if (newsletterErrorMessage) {
            newsletterErrorMessage.textContent = 'Please enter a valid email address.';
        }
    });

    // Attach form validation to respective forms
    signupForm?.addEventListener('submit', (event) => {
        if (!validateForm('signup')) event.preventDefault();
    });

    loginForm?.addEventListener('submit', (event) => {
        if (!validateForm('login')) event.preventDefault();
    });

    // Scroll to Top Functionality
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            scrollToTopBtn.style.visibility = 'visible';
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.visibility = 'hidden';
            scrollToTopBtn.style.opacity = '0';
        }
    }

    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize smooth scrolling
    smoothScrolling();
});

// Features Card Slider
let currentSlide = 0;

function moveSlider(direction) {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const totalSlides = document.querySelectorAll('.feature-card').length;
    currentSlide += direction;

    // Loop the slider
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    // Move the slider
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
}

const tipsSlider = document.querySelector(".slider-wrapper");
const slides = document.querySelectorAll(".feature-card");
const prevSlide = document.getElementById("prev");
const nextSlide = document.getElementById("next");

let currentIndex = 0;

const updateSlider = () => {
    const slideWidth = slides[0].clientWidth;
    tipsSlider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
};

tipsSlider.style.transition = "transform 0.3s ease-in-out";

nextSlide.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
});

prevSlide.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
});

window.addEventListener("resize", updateSlider);
window.addEventListener("load", updateSlider);

// Eco Tips Slider
const ecoTipsSlider = document.querySelector('.eco-tips-content');
const ecoSlides = document.querySelectorAll('.eco-tip');
const prevEcoSlide = document.getElementById('prev-slide');
const nextEcoSlide = document.getElementById('next-slide');
let ecoCurrentIndex = 0;

const updateEcoSlider = () => {
    const slideWidth = ecoSlides[0].clientWidth;
    ecoTipsSlider.style.transform = `translateX(-${ecoCurrentIndex * slideWidth}px)`;
};

ecoTipsSlider.style.transition = 'transform 0.3s ease-in-out';

nextEcoSlide?.addEventListener('click', () => {
    ecoCurrentIndex = (ecoCurrentIndex + 1) % ecoSlides.length;
    updateEcoSlider();
});

prevEcoSlide?.addEventListener('click', () => {
    ecoCurrentIndex = (ecoCurrentIndex - 1 + ecoSlides.length) % ecoSlides.length;
    updateEcoSlider();
});

window.addEventListener('resize', updateEcoSlider);
window.addEventListener('load', updateEcoSlider);
