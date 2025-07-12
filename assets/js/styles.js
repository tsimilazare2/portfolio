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