/* ===========================
   INICIALIZACIÓN DE LIBRERÍAS
   =========================== */

// Inicializar AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true
});

// Registrar ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

/* ===========================
   ANIMACIONES CON SCROLLTRIGGER
   =========================== */

// Animación del header
gsap.to('.header', {
    scrollTrigger: {
        trigger: '.header',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
    },
    opacity: 0.5,
    duration: 1
});

// Animación del logo (Refined: Only visible on scroll)
gsap.fromTo('.logo-circle',
    { opacity: 0, scale: 0.8 },
    {
        scrollTrigger: {
            trigger: '.header', /* Start showing when header comes into view */
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
            toggleActions: 'play reverse play reverse'
        },
        opacity: 1,
        scale: 1,
        ease: 'power2.out'
    }
);

// Secciones - Fade in on scroll
const sections = document.querySelectorAll('.section:not(.section-1)');
sections.forEach((section, index) => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 60,
        duration: 1
    });
});

// Selección de items para hover (Grid items + Oil paintings)
const hoverItems = document.querySelectorAll('.grid-item, .inline-gallery-item');

/* ===========================
   SMOOTH SCROLL EFFECT
   =========================== */

// Efecto de parallax más suave en scroll
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;

    // Si estamos en el header, aplicar efecto parallax
    if (scrolled < headerHeight) {
        const parallaxElements = document.querySelectorAll('.header::before');
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
});

/* ===========================
   INTERACTIVIDAD ADICIONAL
   =========================== */

// Hover effects en grid items y galería
hoverItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        // Detectar condiciones para desactivar sombra
        const isCarcasas = this.closest('#carcasas');
        const isSudadera1 = this.closest('#sudaderas') && this.parentElement.children[0] === this;
        const isVectorial2 = this.closest('#vectorial') && this.parentElement.children[1] === this;
        const isFantasmas = this.closest('#fantasmas');

        const animProps = {
            duration: 0.3,
            y: -10,
            ease: 'power2.out'
        };

        // Aplicar sombra solo si NO es uno de los casos excluidos
        if (!isCarcasas && !isSudadera1 && !isVectorial2 && !isFantasmas) {
            animProps.boxShadow = '0 20px 40px rgba(121, 70, 217, 0.3)';
        }

        gsap.to(this, animProps);
    });

    item.addEventListener('mouseleave', function () {
        gsap.to(this, {
            duration: 0.3,
            y: 0,
            boxShadow: '0 0px 0px rgba(121, 70, 217, 0)',
            ease: 'power2.out'
        });
    });
});

/* ===========================
   MODAL EXPOSICIÓN
   =========================== */

const modal = document.getElementById('exhibition-modal');
const btn = document.getElementById('open-exhibition-btn');
const span = document.getElementsByClassName('close-modal')[0];

if (btn && modal) {
    btn.onclick = function() {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling
        
        // Reset animation class to trigger it again
        const content = modal.querySelector('.modal-content');
        content.classList.remove('animate-modal');
        void content.offsetWidth; // Trigger reflow
        content.classList.add('animate-modal');
    }

    span.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
}

/* ===========================
   LIGHTBOX (VISOR DE IMÁGENES)
   =========================== */

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

// Select all content images that should be zoomable
const contentImagesSelector = '.hero-image img, .about-image img, .studies-image img, .skills-image img, .grid-item img, .inline-gallery-item img, .modal-grid img';
const allClickableImages = document.querySelectorAll(contentImagesSelector);

let currentGroupImages = [];
let currentImageIndex = 0;
let currentZoom = 1;
let isDragging = false;
let startX, startY;
let currentTranslateX = 0;
let currentTranslateY = 0;

if (lightbox && allClickableImages.length > 0) {
    allClickableImages.forEach(img => {
        img.style.cursor = "url('images/cursor/pointer.png'), pointer";

        img.addEventListener('click', () => {
            // Determine the group (section or modal)
            const section = img.closest('section') || img.closest('.modal');
            
            if (section) {
                const imagesInSection = section.querySelectorAll('img');
                currentGroupImages = Array.from(imagesInSection).filter(i => i.matches(contentImagesSelector));
            } else {
                currentGroupImages = [img];
            }
            currentImageIndex = currentGroupImages.indexOf(img);
            if (currentImageIndex !== -1) {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
                document.body.style.overflow = 'hidden'; // Bloquear scroll
                updateLightboxUI();
                resetZoom();
            }
        });
    });

    // Cerrar lightbox
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = ''; // Restaurar scroll
    };

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Cerrar al hacer click fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Actualizar interfaz (botones)
    const updateLightboxUI = () => {
        if (currentGroupImages.length <= 1) {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        } else {
            lightboxPrev.style.display = 'block';
            lightboxNext.style.display = 'block';
        }
    };

    // Navegación
    const showImage = (index) => {
        if (currentGroupImages.length === 0) return;

        if (index < 0) index = currentGroupImages.length - 1;
        if (index >= currentGroupImages.length) index = 0;
        currentImageIndex = index;
        lightboxImg.src = currentGroupImages[currentImageIndex].src;
        resetZoom();
    };

    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentImageIndex - 1);
    });

    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentImageIndex + 1);
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
            if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
        }
    });

    // Lógica de Zoom
    const resetZoom = () => {
        currentZoom = 1;
        currentTranslateX = 0;
        currentTranslateY = 0;
        updateTransform();
        lightboxImg.style.cursor = 'zoom-in';
    };

    const updateTransform = () => {
        lightboxImg.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${currentZoom})`;
    };

    lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentZoom === 1) {
            currentZoom = 2;
            lightboxImg.style.cursor = 'zoom-out';
        } else {
            resetZoom();
            return;
        }
        updateTransform();
    });

    lightboxImg.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            currentZoom += 0.1;
        } else {
            currentZoom -= 0.1;
        }
        currentZoom = Math.min(Math.max(1, currentZoom), 5); // Limitar zoom entre 1x y 5x
        updateTransform();
        lightboxImg.style.cursor = currentZoom > 1 ? 'zoom-out' : 'zoom-in';
    });

    // Lógica de Panning (Deslizar)
    lightboxImg.addEventListener('mousedown', (e) => {
        if (currentZoom > 1) {
            isDragging = true;
            startX = e.clientX - currentTranslateX;
            startY = e.clientY - currentTranslateY;
            lightboxImg.style.cursor = 'grabbing';
            e.preventDefault(); // Evitar comportamiento de arrastre nativo
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging && currentZoom > 1) {
            e.preventDefault();
            currentTranslateX = e.clientX - startX;
            currentTranslateY = e.clientY - startY;
            updateTransform();
        }
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            lightboxImg.style.cursor = currentZoom > 1 ? 'zoom-out' : 'zoom-in';
        }
    });
}

/* ===========================
   OPTIMIZACIÓN DE PERFORMANCE
   =========================== */

// Lazy loading images (si es necesario)
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/* ===========================
   EVENTOS Y CALLBACKS
   =========================== */

// Reinicializar ScrollTrigger cuando resize
window.addEventListener('resize', () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.refresh());
});

// Log cuando las secciones son visibles
const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(`Sección visible: ${entry.target.className}`);
        }
    });
};

const observerOptions = {
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

/* ===========================
   PARTÍCULAS HEADER
   =========================== */
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particleCount = 25; // Número de partículas

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Propiedades aleatorias
        const size = Math.random() * 15 + 5; // Entre 5px y 20px
        const left = Math.random() * 100; // Posición horizontal %
        const duration = Math.random() * 10 + 10; // Entre 10s y 20s
        const delay = Math.random() * 10; // Retraso inicial

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`; // Negativo para que empiecen ya distribuidas

        container.appendChild(particle);
    }
}

// Iniciar partículas
document.addEventListener('DOMContentLoaded', createParticles);

/* ===========================
   CRÉDITOS FOOTER
   =========================== */
const creditsToggle = document.getElementById('credits-toggle');
const creditsInfo = document.getElementById('credits-info');

if (creditsToggle && creditsInfo) {
    creditsToggle.addEventListener('click', () => {
        creditsInfo.classList.toggle('show');
    });
}

/* ===========================
   EFECTO MÁQUINA DE ESCRIBIR (HERO)
   =========================== */
const heroTitle = document.querySelector('.hero-text h2');
const heroSubtitle = document.querySelector('.hero-text p');

if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.classList.add('typing-cursor');
    
    // Iniciar cuando sea visible al hacer scroll
    ScrollTrigger.create({
        trigger: '.hero-text',
        start: 'top 80%',
        once: true,
        onEnter: () => {
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    const char = originalText.charAt(i);
                    heroTitle.textContent += char;
                    i++;
                    // Pausa más larga si es una coma (500ms vs 50ms)
                    setTimeout(typeWriter, char === ',' ? 750 : 50);
                } else {
                    // Quitar el cursor al terminar
                    setTimeout(() => {
                        heroTitle.classList.remove('typing-cursor');
                        if (heroSubtitle) heroSubtitle.classList.add('visible');
                    }, 500);
                }
            };
            setTimeout(typeWriter, 1250);
        }
    });
}
