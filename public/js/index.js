

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('sudah-muncul');
        }
    });
});


const hiddenElements = document.querySelectorAll('.belum-muncul');
hiddenElements.forEach((element) => observer.observe(element));

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.scrollYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})

function hideButton(button) {
    button.classList.add("hidden");
  }
  
  function resetButton() {
    var buttond = document.getElementById("buttond");
    var buttonbf = document.getElementById("buttonbf");
    buttond.classList.remove("hidden");
    buttonbf.classList.remove("hidden");
  }
  
  function resetSemua() {
    var buttond = document.getElementById("buttond");
    var buttonbf = document.getElementById("buttonbf");
    var petaMisi = document.querySelector(".peta-misi img");
    petaMisi.src = "/assets/svg/peta-misi.svg";
    buttond.classList.remove("hidden");
    buttonbf.classList.remove("hidden");
    document.getElementById("output-default").innerHTML = "";
    document.getElementById("notif-misi").innerHTML = "";
    document.getElementById("run-time-default").innerHTML = "";
    document.getElementById("source-node-default").value = "";
    document.getElementById("destination-default").value = "";
    document
      .getElementById("destination-default")
      .setAttribute("prev-destination", "");
  }