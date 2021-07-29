let btnsubmit = document.getElementById("show-modal1");
let modalBg = document.querySelector(".modal-bg");
let modalClose = document.querySelector(".modal-close");

btnsubmit.addEventListener("click", () => {
    document.getElementById("judul-aksi").innerHTML = "Tambahkan Buku Anda";
    modalBg.classList.add("bg-active");
});

modalClose.addEventListener("click", () => {
    modalBg.classList.remove("bg-active");
});

document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();

    let getYear = document.querySelector("input[name='year']").value.split("-");
    let getisComplete = document.querySelector("select[name='isComplete']").value === "1" ? false : true;

    let data = {
        id: +new Date,
        title: document.querySelector("input[name='title']").value,
        author: document.querySelector("input[name='author']").value,
        year: parseInt(getYear[0]),
        isComplete: getisComplete,
    };

    createlocalStore(data);
    document.getElementById("form1").reset();
    modalBg.classList.remove("bg-active");
    alert('Buku berhasil di tambahkan');
});