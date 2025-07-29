$(document).ready(function() {
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function() {
                window.location.hash = hash;
            });
        }
    });
});

$(window).on("load", function() {
    var t = $(".portfolio-container");
    t.isotope({
        filter: ".new",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filters a").click(function() {
        $(".filters .active").removeClass("active"), $(this).addClass("active");
        var i = $(this).attr("data-filter");
        return t.isotope({
            filter: i,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), !1
    });
});


function initMap() {
    const maroua = { lat: 10.5956, lng: 14.3247 }; // Coordonnées de Maroua

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: maroua,
    });

    new google.maps.Marker({
        position: maroua,
        map: map,
        title: "Maroua, Cameroun"
    });
}

const text = "Tsimi Lazare";
const target = document.getElementById("typing-text");
let index = 0;

function typeWriter() {
    if (index < text.length) {
        target.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 250); // Vitesse de frappe
    }
}

typeWriter();

AOS.init({ duration: 1000, once: true });

// Progress bar animation on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const finalWidth = bar.getAttribute('data-width');
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = finalWidth;
            observer.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-bar').forEach(bar => observer.observe(bar));

// Filtres dynamiques
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        document.querySelectorAll('.skill-item').forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// === Mode nuit et bulles de neige ===
function toggleNightMode() {
    document.body.classList.toggle('night-mode');
    if (document.body.classList.contains('night-mode')) {
        startSnow();
    } else {
        stopSnow();
    }
}

// Ajout du bouton mode nuit
if (!document.getElementById('night-mode-toggle')) {
    const btn = document.createElement('button');
    btn.id = 'night-mode-toggle';
    btn.innerHTML = '🌙 Mode Nuit';
    btn.style.position = 'fixed';
    btn.style.bottom = '30px';
    btn.style.right = '30px';
    btn.style.zIndex = '10001';
    btn.style.background = '#232a36';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '50px';
    btn.style.padding = '12px 22px';
    btn.style.fontSize = '1.1em';
    btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    btn.style.cursor = 'pointer';
    document.body.appendChild(btn);
    btn.addEventListener('click', toggleNightMode);
}

// === Effet bulles de neige brillante ===
let snowInterval;

function startSnow() {
    if (document.getElementById('snow-canvas')) return;
    const snow = document.createElement('div');
    snow.className = 'snow';
    snow.id = 'snow-canvas';
    document.body.appendChild(snow);
    snowInterval = setInterval(() => {
        const flake = document.createElement('span');
        flake.className = 'snowflake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.fontSize = (Math.random() * 18 + 12) + 'px';
        flake.style.opacity = (Math.random() * 0.5 + 0.5).toFixed(2);
        flake.style.animationDuration = (Math.random() * 2 + 3) + 's';
        document.getElementById('snow-canvas').appendChild(flake);
        setTimeout(() => {
            if (flake.parentNode) flake.parentNode.removeChild(flake);
        }, 5000);
    }, 200);
}

function stopSnow() {
    clearInterval(snowInterval);
    const snow = document.getElementById('snow-canvas');
    if (snow) snow.remove();
}

// Bouton de retour en haut de page
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // Afficher/masquer le bouton selon la position de scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Fonction pour remonter en haut de page
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Bouton de mode nuit
document.addEventListener('DOMContentLoaded', function() {
    const nightModeBtn = document.getElementById('night-mode-toggle');

    // Vérifier si le mode nuit est déjà activé (localStorage)
    if (localStorage.getItem('nightMode') === 'true') {
        document.body.classList.add('night-mode');
        nightModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Fonction pour basculer le mode nuit
    nightModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('night-mode');

        // Sauvegarder la préférence
        if (document.body.classList.contains('night-mode')) {
            localStorage.setItem('nightMode', 'true');
            nightModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('nightMode', 'false');
            nightModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
});