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