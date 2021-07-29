let books = [];
const localBooks = "local_books";

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem(localBooks) !== null) {
        books = JSON.parse(localStorage.getItem(localBooks));
        loadBooks(books);
    }
});

function updatedLocalstore(data) {
    localStorage.setItem(localBooks, JSON.stringify(data));
}

function createlocalStore(data) {
    books.push(data);
    updatedLocalstore(books)
    loadBooks(books);
}

function pindahSudahbaca(index) {
    books[index].isComplete = true;
    updatedLocalstore(books)
    loadBooks(books);
}

function pindahBelumbaca(index) {
    books[index].isComplete = false;
    updatedLocalstore(books)
    loadBooks(books);
}

function hapusBooks(index) {
    books.splice(index, 1);
    updatedLocalstore(books)
    loadBooks(books);
    alert('Buku berhasil di Hapus');
}

document.getElementById("form-searchbook").addEventListener("submit", (e) => {
    e.preventDefault();

    let result = books.filter(val => val.title === document.querySelector("input[name='judulbuku']").value);
    console.log(result.length);
    if (result.length == 0) {
        loadBooks(JSON.parse(localStorage.getItem(localBooks)));
    } else {
        loadBooks(result);
    }
});

function editBooks(indexBooks) {
    let result = books.filter((val, index) => index === indexBooks);

    let statbaca = result[0].isComplete === false ? "" : "selected";
    document.getElementById("edit-" + indexBooks).innerHTML = `
        <form class="edit-books" id="form-${indexBooks}">
            <div>
                <label>Judul Buku</label>
                <input value="${result[0].title}" id="title${indexBooks}" type="text" placeholder="Masukan judul buku anda" required>
            </div>
            <div>
                <label>Judul Buku</label>
                <input value="${result[0].author}" id="author${indexBooks}" type="text" placeholder="Masukan judul buku anda" required>
            </div>
            <div>
                <label>Judul Buku</label>
                <input id="year${indexBooks}" type="month" placeholder="Tahun Penerbitan" required>
            </div>
            <div>
                <label>Status Membaca</label>
                <select required id="isComplete${indexBooks}">
                    <option value="1" ${statbaca}>Belum di baca</option>
                    <option value="0" ${statbaca}>Sudah di baca</option>
                </select>
            </div>
            <div>
            <input type="submit" value="Submit">
            <input onclick="closeEdit(${indexBooks})" type="button" value="Close">
            </div>
        </form>
    `;

    document.getElementById("form-" + indexBooks).addEventListener("submit", (e) => {
        e.preventDefault();

        let getYear = document.getElementById(`year${indexBooks}`).value.split("-");
        let getisComplete = document.getElementById(`isComplete${indexBooks}`).value === "1" ? false : true;

        books[indexBooks].title = document.getElementById(`title${indexBooks}`).value;
        books[indexBooks].author = document.getElementById(`author${indexBooks}`).value;
        books[indexBooks].year = parseInt(getYear[0]);
        books[indexBooks].isComplete = getisComplete;

        updatedLocalstore(books)
        loadBooks(books);
    });
}

function closeEdit(index) {
    document.getElementById("edit-" + index).innerHTML = ``;
}

function loadBooks(data) {
    let data1 = data;
    let sudah = `<h1 style="text-align: center; margin: 10px 0;"><i class="fa fa-bookmark" aria-hidden="true"></i> SUDAH DI BACA</h1>`;
    let belum = `<h1 style="text-align: center; margin: 10px 0;"><i class="fa fa-bookmark-o" aria-hidden="true"></i> BELUM DI BACA</h1>`;

    data1.forEach((val, index) => {
        let status = val.isComplete === true ? "Sudah Di Baca" : "Belum Di Baca";
        if (val.isComplete === true) {
            sudah += `
            <div class="books">
                <p>${val.title}</p>
                <p>Penulis : ${val.author}</p>
                <p>Tahun Penerbitan : <br>${val.year}</p>
                <p>Status Baca : <br>${status}  <br>
                <button onclick="pindahBelumbaca(${index})" class="btn-books"><i class="fa fa-times" aria-hidden="true"></i></button>
                <button onclick="hapusBooks(${index})" class="btn-books"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button onclick="editBooks(${index})" class="btn-books"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                </p>
            </div>
            <div id="edit-${index}">

            </div>
            `;
        } else {
            belum += `
            <div class="books">
                <p>${val.title}</p>
                <p>Penulis : ${val.author}</p>
                <p>Tahun Terbit : <br>${val.year}</p>
                <p>Status Baca : <br>${status} <br>
                <button onclick="pindahSudahbaca(${index})" class="btn-books"><i class="fa fa-check" aria-hidden="true"></i></button>
                <button onclick="hapusBooks(${index})" class="btn-books"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button onclick="editBooks(${index})" class="btn-books"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                </p>
            </div>
            <div id="edit-${index}">
            
            </div>
            `;
        }
    });

    document.querySelector(".belum-dibaca").innerHTML = belum;
    document.querySelector(".sudah-dibaca").innerHTML = sudah;
}


