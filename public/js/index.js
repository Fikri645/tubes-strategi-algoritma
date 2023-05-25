

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('sudah-muncul');
        } else {
            entry.target.classList.remove('sudah-muncul');
        }
    });
});


const hiddenElements = document.querySelectorAll('.belum-muncul');
hiddenElements.forEach((element) => observer.observe(element));

