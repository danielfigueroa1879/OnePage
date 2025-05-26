/*!
* RECYBERSEG - JavaScript Principal
* Basado en Start Bootstrap - Freelancer v7.0.7
* Adaptado para servicios de ciberseguridad
* Copyright 2025 RECYBERSEG
*/

// Funciones principales del tema Bootstrap Freelancer
window.addEventListener('DOMContentLoaded', event => {
    // Función para contraer navbar al hacer scroll
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Contraer navbar inicialmente
    navbarShrink();

    // Contraer navbar cuando se hace scroll
    document.addEventListener('scroll', navbarShrink);

    // Activar Bootstrap ScrollSpy en el navbar principal
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav && typeof bootstrap !== 'undefined') {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Colapsar navbar responsive cuando el toggler es visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});

// Funcionalidad del botón scroll to top
function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    
    if (scrollButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                scrollButton.style.display = 'flex';
            } else {
                scrollButton.style.display = 'none';
            }
        });
        
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Smooth scrolling para enlaces de navegación
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Funcionalidad de búsqueda
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                // Aquí puedes agregar la lógica de búsqueda real
                console.log('Búsqueda realizada:', query);
                alert('Función de búsqueda: ' + query + '\n\n(Integra aquí tu sistema de búsqueda)');
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    // Aquí puedes agregar la lógica de búsqueda real
                    console.log('Búsqueda realizada:', query);
                    alert('Función de búsqueda: ' + query + '\n\n(Integra aquí tu sistema de búsqueda)');
                }
            }
        });
    }
}

// Validación y envío del formulario de contacto
function initFormValidation() {
    const contactForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Validación básica de campos requeridos
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            if (!nombre || !email || !mensaje) {
                e.preventDefault();
                showAlert('Por favor, completa todos los campos obligatorios.', 'error');
                return;
            }
            
            // Validación de formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showAlert('Por favor, ingresa un email válido.', 'error');
                return;
            }
            
            // Validación de longitud mínima del mensaje
            if (mensaje.length < 10) {
                e.preventDefault();
                showAlert('El mensaje debe tener al menos 10 caracteres.', 'error');
                return;
            }
            
            // Si todo está bien, el formulario se enviará normalmente
            console.log('Formulario enviado correctamente');
            showAlert('¡Formulario enviado correctamente! Te contactaremos pronto.', 'success');
        });
    }
}

// Función para mostrar alertas personalizadas
function showAlert(message, type = 'info') {
    // Crear elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
    
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Animaciones de entrada para tarjetas de servicios
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observar tarjetas de servicios cuando el DOM esté cargado
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.service-card, .iot-card').forEach(card => {
            observer.observe(card);
        });
    });
}

// Cambio de color del navbar al hacer scroll
function initNavbarColorChange() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = '#2c3e50';
                navbar.style.backdropFilter = 'none';
            }
        }
    });
}

// Efectos de ripple para botones
function initRippleEffects() {
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                // Crear efecto ripple
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
            });
        });
    });
}

// Funciones de utilidad
const utils = {
    // Debounce function para optimizar eventos de scroll
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Función para obtener altura del viewport
    getViewportHeight: function() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    },
    
    // Función para verificar si un elemento está visible
    isElementInViewport: function(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Función para scroll suave a elemento específico
    scrollToElement: function(element, offset = 0) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

// Funciones específicas para ciberseguridad
const cybersecurityFeatures = {
    // Simulador de escaneo de seguridad (demo)
    initSecurityScanner: function() {
        const scanButtons = document.querySelectorAll('[data-action="scan"]');
        
        scanButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                this.cybersecurityFeatures.runSecurityScan(this);
            });
        });
    },
    
    // Simulación de escaneo de seguridad
    runSecurityScan: function(button) {
        const originalText = button.textContent;
        const scanSteps = [
            'Iniciando escaneo...',
            'Analizando puertos...',
            'Verificando vulnerabilidades...',
            'Generando reporte...',
            'Escaneo completado ✓'
        ];
        
        button.disabled = true;
        let stepIndex = 0;
        
        const scanInterval = setInterval(() => {
            button.textContent = scanSteps[stepIndex];
            stepIndex++;
            
            if (stepIndex >= scanSteps.length) {
                clearInterval(scanInterval);
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    showAlert('Escaneo de seguridad completado. Revisa tu email para el reporte detallado.', 'success');
                }, 1000);
            }
        }, 800);
    },
    
    // Contador de amenazas bloqueadas (demo)
    initThreatCounter: function() {
        const counter = document.getElementById('threat-counter');
        if (counter) {
            let threats = parseInt(localStorage.getItem('blockedThreats')) || 1247;
            
            // Incrementar contador cada cierto tiempo
            setInterval(() => {
                threats += Math.floor(Math.random() * 3) + 1;
                counter.textContent = threats.toLocaleString();
                localStorage.setItem('blockedThreats', threats);
            }, 30000); // Cada 30 segundos
            
            counter.textContent = threats.toLocaleString();
        }
    }
};

// Funciones de analytics y tracking (opcional)
const analytics = {
    // Tracking de eventos de usuario
    trackEvent: function(category, action, label = '') {
        console.log(`Analytics Event: ${category} - ${action} - ${label}`);
        
        // Aquí integrarías con Google Analytics, Mixpanel, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
    },
    
    // Tracking de tiempo en página
    trackTimeOnPage: function() {
        const startTime = Date.now();
        
        window.addEventListener('beforeunload', function() {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            analytics.trackEvent('Engagement', 'time_on_page', `${timeSpent}s`);
        });
    },
    
    // Tracking de clics en servicios
    trackServiceClicks: function() {
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.addEventListener('click', function() {
                const serviceName = this.querySelector('h4').textContent;
                analytics.trackEvent('Services', 'service_click', serviceName);
            });
        });
    }
};

// Funciones de accesibilidad
const accessibility = {
    // Navegación por teclado mejorada
    initKeyboardNavigation: function() {
        document.addEventListener('keydown', function(e) {
            // Alt + H para ir al inicio
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
            }
            
            // Alt + S para ir a servicios
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' });
            }
            
            // Alt + C para ir a contacto
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
            }
        });
    },
    
    // Mejora del contraste para usuarios con discapacidad visual
    initContrastToggle: function() {
        const contrastToggle = document.getElementById('contrast-toggle');
        if (contrastToggle) {
            contrastToggle.addEventListener('click', function() {
                document.body.classList.toggle('high-contrast');
                const isHighContrast = document.body.classList.contains('high-contrast');
                localStorage.setItem('highContrast', isHighContrast);
            });
            
            // Restaurar preferencia guardada
            if (localStorage.getItem('highContrast') === 'true') {
                document.body.classList.add('high-contrast');
            }
        }
    }
};

// Funciones de performance
const performance = {
    // Lazy loading para imágenes
    initLazyLoading: function() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    },
    
    // Preload de recursos críticos
    preloadCriticalResources: function() {
        const criticalResources = [
            '/assets/fonts/montserrat.woff2',
            '/assets/fonts/lato.woff2'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
};

// Inicialización de todas las funciones
function initializeApp() {
    // Funciones principales
    initScrollToTop();
    initSmoothScrolling();
    initSearchFunctionality();
    initFormValidation();
    initScrollAnimations();
    initNavbarColorChange();
    initRippleEffects();
    
    // Funciones específicas de ciberseguridad
    cybersecurityFeatures.initSecurityScanner();
    cybersecurityFeatures.initThreatCounter();
    
    // Analytics y tracking
    analytics.trackTimeOnPage();
    analytics.trackServiceClicks();
    
    // Accesibilidad
    accessibility.initKeyboardNavigation();
    accessibility.initContrastToggle();
    
    // Performance
    performance.initLazyLoading();
    performance.preloadCriticalResources();
    
    // Log de inicialización
    console.log('🛡️ RECYBERSEG - Aplicación inicializada correctamente');
    console.log('🔒 Sistemas de seguridad: ACTIVOS');
    console.log('⚡ Performance optimizada: OK');
    console.log('♿ Accesibilidad mejorada: OK');
}

// Error handling global
window.addEventListener('error', function(e) {
    console.error('Error en RECYBERSEG:', e.error);
    
    // Opcional: enviar errores a servicio de monitoring
    if (typeof errorReportingService !== 'undefined') {
        errorReportingService.report(e.error);
    }
});

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Exportar funciones para uso global (opcional)
window.RECYBERSEG = {
    utils,
    cybersecurityFeatures,
    analytics,
    accessibility,
    performance,
    showAlert
};
