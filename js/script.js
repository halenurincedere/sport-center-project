// Changes navbar background color after scrolling down
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled'); // Add background when scrolled
    } else {
        header.classList.remove('scrolled'); // Remove background when at top
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Automatically sets the current year in the footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Class filter buttons logic (Yoga, Solo, Group, Stretching)
    const filterButtons = document.querySelectorAll('.class-filters .filter-btn');
    const classContentItems = document.querySelectorAll('.class-content-area .class-item');

    if (filterButtons.length > 0 && classContentItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active state from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter content based on button data-filter attribute
                const filterValue = this.getAttribute('data-filter');
                classContentItems.forEach(item => {
                    item.classList.remove('active-content');
                    item.style.display = 'none';
                    if (item.id === filterValue + '-content') {
                        item.style.display = 'flex';
                        item.classList.add('active-content');
                    }
                });
            });
        });

        // Click default active filter or first one
        const defaultActiveButton = document.querySelector('.class-filters .filter-btn.active');
        if (defaultActiveButton) {
            defaultActiveButton.click();
        } else {
            filterButtons[0].click();
        }
    }

    // BMI Calculator
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiValueSpan = document.getElementById('bmiValue');
    const bmiStatusSpan = document.getElementById('bmiStatus');
    const bmiArrow = document.getElementById('bmiArrow');

    function calculateAndDisplayBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (height > 0 && weight > 0) {
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            bmiValueSpan.textContent = bmi.toFixed(2);

            let status = '';
            let arrowColor = '#f7a623'; // Default color

            const visualStartPercent = 10;
            const visualEndPercent = 90;
            const visualScale = visualEndPercent - visualStartPercent;
            let percentWithinScale = 0;

            // Determine BMI category and arrow position
            if (bmi < 18.5) {
                status = 'Underweight';
                arrowColor = '#6fb4dc'; // Light Blue
                percentWithinScale = (bmi / 18.5) * (visualScale * 0.2);
            } else if (bmi < 24.9) {
                status = 'Normal';
                arrowColor = '#4caf50'; // Green
                percentWithinScale = (visualScale * 0.2) + ((bmi - 18.5) / (24.9 - 18.5)) * (visualScale * 0.2);
            } else if (bmi < 29.9) {
                status = 'Overweight';
                arrowColor = '#ffd54f'; // Yellow
                percentWithinScale = (visualScale * 0.4) + ((bmi - 25) / (29.9 - 25)) * (visualScale * 0.2);
            } else if (bmi < 34.9) {
                status = 'Obese (Class 1)';
                arrowColor = '#ff9800'; // Orange
                percentWithinScale = (visualScale * 0.6) + ((bmi - 30) / (34.9 - 30)) * (visualScale * 0.2);
            } else {
                status = 'Severely Obese (Class 2+)';
                arrowColor = '#f44336'; // Red
                percentWithinScale = (visualScale * 0.8) + ((bmi - 35) / 10) * (visualScale * 0.2);
                percentWithinScale = Math.min(percentWithinScale, visualScale);
            }

            const arrowPositionPercent = visualStartPercent + percentWithinScale - 1.5;
            bmiStatusSpan.textContent = status;

            // Position the arrow and set color
            if (bmiArrow) {
                bmiArrow.style.left = `${arrowPositionPercent}%`;
                bmiArrow.style.borderBottomColor = arrowColor;
            }
        } else {
            // Reset if inputs are invalid
            bmiValueSpan.textContent = '--';
            bmiStatusSpan.textContent = '--';
            if (bmiArrow) {
                bmiArrow.style.left = '10%';
                bmiArrow.style.borderBottomColor = '#ccc';
            }
        }
    }

    // Trigger calculation on input change
    if (heightInput && weightInput) {
        heightInput.addEventListener('input', calculateAndDisplayBMI);
        weightInput.addEventListener('input', calculateAndDisplayBMI);
    }

    // Smooth scroll for navbar and footer links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-logo, .footer-links ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerOffset = document.querySelector('.header').offsetHeight || 70;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } else if (href === "#" || !href) {
                event.preventDefault();
            }
        });
    });
});

// Hamburger menu toggle for responsive navigation
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger"); // Hamburger icon
    const navbarNav = document.querySelector(".navbar-nav"); // Navigation menu

    if (hamburger && navbarNav) {
        hamburger.addEventListener("click", () => {
            navbarNav.classList.toggle("nav-open"); // Toggle the navigation menu
            document.body.classList.toggle("menu-open"); // Prevent body scroll when menu is open
        });
    }
});