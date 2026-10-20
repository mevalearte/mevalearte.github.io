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
sections.forEach((section) => {
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
    btn.onclick = function () {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling

        // Reset animation class to trigger it again
        const content = modal.querySelector('.modal-content');
        content.classList.remove('animate-modal');
        void content.offsetWidth; // Trigger reflow
        content.classList.add('animate-modal');
    };

    span.onclick = function () {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
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

                // Mostrar imagen actual de inmediato
                const originalSrc = img.dataset.original || img.currentSrc || img.src;
                lightboxImg.src = img.currentSrc || img.src;

                // Si la versión original de máxima calidad no se ha cargado todavía, cargarla para el visor
                if (originalSrc && originalSrc !== lightboxImg.src) {
                    const hiRes = new Image();
                    hiRes.src = originalSrc;
                    hiRes.onload = () => {
                        if (lightbox.style.display === 'flex' && currentGroupImages[currentImageIndex] === img) {
                            lightboxImg.src = originalSrc;
                        }
                    };
                }

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

        const targetImg = currentGroupImages[currentImageIndex];
        const originalSrc = targetImg.dataset.original || targetImg.currentSrc || targetImg.src;
        lightboxImg.src = targetImg.currentSrc || targetImg.src;

        if (originalSrc && originalSrc !== lightboxImg.src) {
            const hiRes = new Image();
            hiRes.src = originalSrc;
            hiRes.onload = () => {
                if (lightbox.style.display === 'flex' && currentGroupImages[currentImageIndex] === targetImg) {
                    lightboxImg.src = originalSrc;
                }
            };
        }

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
    }, { passive: false });

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
   CARGA PROGRESIVA DE IMÁGENES ORIGINALES (HD)
   =========================== */
function initProgressiveImageUpgrade() {
    // Si el usuario tiene activo "Ahorro de datos" o conexión muy lenta (2G), no descargar originales automáticamente
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSaveData = conn && (conn.saveData === true || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g');
    if (isSaveData) return;

    if (!('IntersectionObserver' in window)) return;

    const upscaledImages = document.querySelectorAll('img[data-original]');
    const timers = new WeakMap();

    const upgradeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const img = entry.target;

            if (entry.isIntersecting) {
                // Cuando el usuario se queda observando la imagen (~1.5s), iniciar descarga del original
                const timer = setTimeout(() => {
                    const originalSrc = img.dataset.original;
                    if (!originalSrc || img.dataset.loadedOriginal === 'true') return;

                    // Precarga silenciosa en segundo plano sin parpadeos
                    const preloadImg = new Image();
                    preloadImg.src = originalSrc;
                    preloadImg.onload = () => {
                        const picture = img.closest('picture');
                        if (picture) {
                            picture.querySelectorAll('source').forEach(s => s.remove());
                        }
                        img.src = originalSrc;
                        img.dataset.loadedOriginal = 'true';
                        upgradeObserver.unobserve(img);
                    };
                }, 1500);

                timers.set(img, timer);
            } else {
                // Si el usuario pasa de largo antes de 1.5s, cancelar el temporizador
                const timer = timers.get(img);
                if (timer) {
                    clearTimeout(timer);
                    timers.delete(img);
                }
            }
        });
    }, {
        threshold: 0.35 // Al menos 35% visible para considerarla en foco de lectura
    });

    upscaledImages.forEach(img => upgradeObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', initProgressiveImageUpgrade);

/* ===========================
   EVENTOS Y CALLBACKS
   =========================== */

// Reinicializar ScrollTrigger cuando resize (con debounce ligero)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.getAll().forEach(trigger => trigger.refresh());
    }, 150);
}, { passive: true });

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
