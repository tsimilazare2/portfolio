/**
 * FICHIER DE SÉCURITÉ - Portfolio Tsimi Ndah Lazare
 * Protection contre les attaques XSS, CSRF, et autres vulnérabilités
 */

// Protection contre les attaques XSS
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Protection contre les injections de code
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Protection contre les clics sur les liens externes
function secureExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');

        // Ajouter un avertissement pour les liens externes
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.includes(window.location.hostname)) {
                if (!confirm('Vous allez quitter ce site. Continuer ?')) {
                    e.preventDefault();
                }
            }
        });
    });
}

// Protection contre les formulaires malveillants
function secureForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Ajouter un token CSRF
        const csrfToken = generateCSRFToken();
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_csrf';
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);

        // Validation des champs
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else if (input.type === 'email' && input.value) {
                    if (!validateEmail(input.value)) {
                        isValid = false;
                        input.classList.add('error');
                    }
                } else {
                    input.classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Veuillez corriger les erreurs dans le formulaire.');
            }
        });
    });
}

// Génération d'un token CSRF
function generateCSRFToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Protection contre les attaques par force brute
let loginAttempts = 0;
const maxAttempts = 5;
const lockoutTime = 15 * 60 * 1000; // 15 minutes

function checkLoginAttempts() {
    const attempts = localStorage.getItem('loginAttempts');
    const lastAttempt = localStorage.getItem('lastAttemptTime');

    if (attempts && lastAttempt) {
        const timeSinceLastAttempt = Date.now() - parseInt(lastAttempt);
        if (timeSinceLastAttempt < lockoutTime && parseInt(attempts) >= maxAttempts) {
            return false;
        } else if (timeSinceLastAttempt >= lockoutTime) {
            localStorage.removeItem('loginAttempts');
            localStorage.removeItem('lastAttemptTime');
        }
    }
    return true;
}

function recordLoginAttempt() {
    loginAttempts++;
    localStorage.setItem('loginAttempts', loginAttempts.toString());
    localStorage.setItem('lastAttemptTime', Date.now().toString());

    if (loginAttempts >= maxAttempts) {
        alert('Trop de tentatives. Réessayez dans 15 minutes.');
    }
}

// Protection contre les attaques par injection de code
function sanitizeFormData(formData) {
    const sanitized = {};
    for (let [key, value] of formData.entries()) {
        sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
}

// Protection contre les attaques par clic droit
function disableRightClick() {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
}

// Protection contre les raccourcis clavier malveillants
function disableMaliciousShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Désactiver F12, Ctrl+Shift+I, Ctrl+U
        if (e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.key === 'u')) {
            e.preventDefault();
            return false;
        }
    });
}

// Protection contre les attaques par iframe
function preventIframeEmbedding() {
    if (window.self !== window.top) {
        window.top.location = window.self.location;
    }
}

// Validation des URLs
function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Protection contre les attaques par injection de scripts
function removeScriptTags(content) {
    return content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

// Initialisation de toutes les protections
function initializeSecurity() {
    console.log('🔒 Initialisation des protections de sécurité...');

    // Appliquer les protections
    secureExternalLinks();
    secureForms();
    disableRightClick();
    disableMaliciousShortcuts();
    preventIframeEmbedding();

    // Protection du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!checkLoginAttempts()) {
                return;
            }

            const formData = new FormData(this);
            const sanitizedData = sanitizeFormData(formData);

            // Validation des données
            if (!validateEmail(sanitizedData.email)) {
                alert('Adresse email invalide.');
                recordLoginAttempt();
                return;
            }

            // Envoi sécurisé
            fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        this.reset();
                        alert('Message envoyé avec succès !');
                        localStorage.removeItem('loginAttempts');
                        localStorage.removeItem('lastAttemptTime');
                    } else {
                        throw new Error('Erreur lors de l\'envoi');
                    }
                })
                .catch(error => {
                    console.error('Erreur:', error);
                    alert('Erreur lors de l\'envoi du message. Réessayez plus tard.');
                    recordLoginAttempt();
                });
        });
    }

    console.log('✅ Protections de sécurité activées');
}

// Démarrer les protections quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initializeSecurity);

// Protection supplémentaire contre les attaques
window.addEventListener('load', function() {
    // Vérifier l'intégrité des scripts
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        if (!script.integrity) {
            console.warn('Script sans intégrité détecté:', script.src);
        }
    });
});

// Export des fonctions pour utilisation externe
window.SecurityUtils = {
    sanitizeInput,
    validateEmail,
    validateURL,
    removeScriptTags,
    generateCSRFToken
};