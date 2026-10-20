
document.addEventListener("DOMContentLoaded", function () {
    const motorPhoto = document.getElementById("motorPhoto");
    const slideNumber = document.getElementById("slideNumber");
    const colorOptions = document.querySelectorAll(".color-option");
    const galleryCards = document.querySelectorAll(".gallery-card");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const motorImages = {
        blue: {
            image: "nmax-light-blue.png",
            number: "01",
            name: "Yamaha NMAX biru gelap"
        },
        lightblue: {
            image: "nmax-blue.png",
            number: "02",
            name: "Yamaha NMAX biru muda"
        },
        red: {
            image: "nmax-red.png",
            number: "03",
            name: "Yamaha NMAX merah"
        }
    };

    function pilihMotor(warna) {
        const motor = motorImages[warna];

        if (!motor || !motorPhoto) return;

        // Ubah pilihan aktif terlebih dahulu
        colorOptions.forEach(function (button) {
            const aktif = button.dataset.color === warna;
            button.classList.toggle("selected", aktif);
            button.setAttribute("aria-pressed", String(aktif));
        });

        // Nomor dan foto diperbarui setelah gambar berhasil dimuat
        const gambarBaru = new Image();

        gambarBaru.onload = function () {
            motorPhoto.src = gambarBaru.src;
            motorPhoto.alt = motor.name;
            motorPhoto.style.opacity = "1";

            if (slideNumber) {
                slideNumber.textContent = motor.number;
            }
        };

        gambarBaru.onerror = function () {
            console.error("Foto tidak ditemukan:", motor.image);
            alert(
                "Foto " + motor.image +
                " tidak ditemukan. Periksa nama file di folder website."
            );
        };

        gambarBaru.src = motor.image;
    }

    // Tombol pilihan warna
    colorOptions.forEach(function (button) {
        button.addEventListener("click", function () {
            pilihMotor(button.dataset.color);
        });
    });

    // Klik kartu galeri
    galleryCards.forEach(function (card) {
        card.addEventListener("click", function () {
            pilihMotor(card.dataset.pick);

            const home = document.getElementById("home");
            if (home) {
                home.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Menu navigasi HP
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const terbuka = navLinks.classList.toggle("open");

            menuToggle.textContent = terbuka ? "×" : "☰";
            menuToggle.setAttribute("aria-expanded", String(terbuka));
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }
});
