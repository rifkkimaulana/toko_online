let limit = 4; //jumlah data yang ditampilkan pertama
let start = 0;
let action = "inactive";
let search = "";
let result = 1; // Format Currency
let kategori = "";

// fetch kategori pada katalog

function kategori_view() {
  $.ajax({
    url: "http://localhost:8080/kategori",
    method: "GET",
    dataType: "JSON",
    cache: false,
    success: function (response) {
      result = response.result;
      if (response.status) {
        $.each(response.data, function (i, kt) {
          button = `<button onclick="katalogByKategori(${kt.id});" class="btn btn-sm btn-primary mr-1"> ${kt.nama}</button>`;
          $("#kategoriButton").append(button);
        });

        action = "inactive";
      }
    },
  });
}

// Produk by id
function katalogByKategori(kategori) {
  $.ajax({
    type: "GET",
    url: "katalog.html",
    data: "data",
    dataType: "html",
    success: function (response) {
      $("#content").html(response);
      $("#home").removeClass("active");
      $("#katalog").addClass("active");
      $("#profil").removeClass("active");
      $("#load_data").html("");
      start = 0;
      lazzy_loader(limit);

      fetch_data(limit, start, search, kategori);

      // Tampilkan kategori
      kategori_view();
    },
  });
}

function fetch_data(limit, start, search, kategori) {
  console.log("POST data:", { limit: limit, start: start, search: search, kategori: kategori });
  $.ajax({
    url: "http://localhost:8080/produk/limit_produk",
    method: "POST",
    data: {
      limit: limit,
      start: start,
      search: search,
      kategori: kategori,
    },
    dataType: "JSON",
    cache: false,
    success: function (response) {
      result = response.result;
      if (response.status) {
        let card_data = "";
        $.each(response.data, function (i, v) {
          card_data = ` <a class="product-items w-50 flex-column" href="javascript:void(0)" onclick="dialog('${v.id}');">
                          <div class="product-cover mb-2" style="background-image:
                          url('${v.img}');"></div>
                          <p class="bodytext1 semibold m-0 px-2 text-secondary">${v.nama}</p>
                          <p class="bodytext2 color-black300 m-0 px2">${v.deskripsi.substring(0, 40)}</p>
                          <p class="bodytext2 color-black300 m-0 px2">Kategori: ${v.kategori.substring(0, 40)}</p>
                          <p class="caption m-0 py-1 px-2 text-primary">Rp.
                          ${numFormat(v.harga)}</p>
                          </a>`;
          $("#load_data").append(card_data);
        });
        action = "inactive";
        $("#load_data_message").html("");
      } else {
        $("#load_data").html("");
        $("#load_data_message").html(
          '<div class="col-12 text-center"><h4 class="text-danger">Oops, barang yang anda cari tidak di temukan</h4></div>'
        );
        action = "active";
      }
    },
  });
}

function lazzy_loader(limit) {
  var output = "";
  for (var count = 0; count < limit; count++) {
    output += `
  <a class="product-items w-50 flex-column shimmer"
  href="javascript:void(0)">
  <div class="product-cover animate mb-2" ></div>
  <p class="bodytext1 semibold m-0 px-2 text-secondary animate
  mb-2"></p>
  <p class="bodytext2 color-black300 m-0 px-2 animate mb2"></p>
  <p class="caption m-0 py-1 px-2 text-primary animate"></p>
  </a>`;
  }
  $("#load_data_message").html(output);
}

$(window).scroll(function () {
  if ($(window).scrollTop() + $(window).height() > $("#load_data").height() && action == "inactive" && result == 1) {
    lazzy_loader(limit);
    action = "active";
    start = start + limit;
    setTimeout(function () {
      fetch_data(limit, start, search, kategori);
    }, 1000);
  }
});

function searchHandler() {
  $("#load_data").html("");
  search = $("#search").val();
  fetch_data(limit, start, search, kategori);
}

// Currency
function numFormat(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// Route Index Pages
$(document).ready(function () {
  home();
  $("#home").addClass("active");
  $("#katalog").removeClass("active");
  $("#profil").removeClass("active");
});

function home() {
  $.ajax({
    type: "GET",
    url: "home.html",
    data: "data",
    dataType: "html",
    success: function (response) {
      $("#content").html(response);
      $("#home").addClass("active");
      $("#katalog").removeClass("active");
      $("#profil").removeClass("active");
      $("#load_data").html("");
      start = 0;
      lazzy_loader(limit);
      if (action == "inactive") {
        action = "active";
        fetch_data(limit, start, search, kategori);
      }
    },
  });
}

function katalog() {
  $.ajax({
    type: "GET",
    url: "katalog.html",
    data: "data",
    dataType: "html",
    success: function (response) {
      $("#content").html(response);
      $("#home").removeClass("active");
      $("#katalog").addClass("active");
      $("#profil").removeClass("active");
      $("#load_data").html("");
      start = 0;
      lazzy_loader(limit);
      if (action == "inactive") {
        action = "active";
        fetch_data(limit, start, search, kategori);
      }
      // Tampilkan kategori
      kategori_view();
    },
  });
}

/*
// Route Home.html
function home() {
  $.ajax({
    type: "GET",
    url: "home.html",
    data: "data",
    dataType: "html",
    success: function (response) {
      $("#content").html(response);
      $("#home").addClass("active");
      $("#katalog").removeClass("active");
      $("#profil").removeClass("active");
      fetch_data();
    },
  });
}

// Route Katalog.html
function katalog() {
  $.ajax({
    type: "GET",
    url: "katalog.html",
    data: "data",
    dataType: "html",
    success: function (response) {
      $("#content").html(response);
      $("#home").removeClass("active");
      $("#katalog").addClass("active");
      $("#profil").removeClass("active");
      fetch_data();
    },
  });
}*/

// Route Profil.html
function profil() {
  $.ajax({
    type: "GET",
    url: "profil.html",
    data: "data",
    dataType: "html",
    success: function (response) {
      $("#content").html(response);
      $("#home").removeClass("active");
      $("#katalog").removeClass("active");
      $("#profil").addClass("active");
    },
  });
}

// Buka sweatalert
function info() {
  Swal.fire({
    title: "Info",
    text: "Apps Toko Online v.1.0",
    icon: "info",
    confirmButtonText: "Tutup",
    confirmButtonColor: "#3085d6",
  });
}

/*
// Muat produk menggunakan ajax dengan query search
function fetch_data() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get("search");

  // console.log(searchTerm);
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/produk?search=" + searchTerm,
    dataType: "JSON",
    success: function (response) {
      $("#load_data").html("");
      if (response.status) {
        let card_data = "";
        $.each(response.data, function (i, v) {
          card_data += ` <a class="product-items w-50 flex-column" 
          href="javascript:void(0)" onclick="dialog('${v.id}');">          
            <div class="product-cover mb-2" style="background-image: url('${v.img}');"></div>
            <p class="bodytext1 semibold m-0 px-2 text-secondary">${v.nama}</p>
            <p class="bodytext2 color-black300 m-0 px-2">${v.deskripsi.substring(0, 40)}</p>
            <p class="caption m-0 py-1 px-2 text-primary">Rp. ${numFormat(v.harga)}</p>
            </a>`;
          $("#load_data").html(card_data);
        });
      } else {
        $("#load_data").html(
          '<div class="col-12 text-center"><h4 class="text-danger">Oops, barang yang anda cari tidak di temukan</h4></div>'
        );
      }
    },
  });
} */

// Buka Modal Tambah produk
function mdOpen() {
  $("#md-barang").modal("show");
  $("#md-barang-title").html("Tambah Barang");
  $("#image").attr("required", true);
  $("#form-barang")[0].reset();
}

// Tambah & Edit Produk
$(function () {
  $("#form-barang").on("submit", function (e) {
    if (!e.isDefaultPrevented()) {
      Swal.fire("Sedang menyimpan data");
      Swal.showLoading();
      $("#btnSubmit").text("Menyimpan...");
      $("#btnSubmit").attr("disabled", true);
      var formData = new FormData($("#form-barang")[0]);

      $.ajax({
        url: "http://localhost:8080/produk",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        dataType: "JSON",
        success: function (data) {
          if (data.status) {
            $("#form-barang")[0].reset();
            $("#md-barang").modal("hide");
            fetch_data();
            Swal.fire({
              text: data.message,
              icon: "success",
              confirmButtonText: "Ok",
            });
          } else {
            Swal.fire({
              text: data.message,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
          $("#btnSubmit").text("Simpan");
          $("#btnSubmit").attr("disabled", false);
        },
      });
      return false;
    }
  });
});

// Buka form edit
function dialog(id) {
  $("#md-dialog").modal("show");
  $("#btnEdit").attr("data-id", id);
  $("#btnHapus").attr("data-id", id);
}

function edit(id) {
  $("#form-barang")[0].reset();
  $("#md-dialog").modal("hide");
  $("#md-barang").modal("show");
  $("#md-barang-title").html("Edit Barang");
  $("#image").attr("required", false);
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/produk/" + id,
    dataType: "JSON",
    success: function (response) {
      if (response.status) {
        $("#id").val(response.data.id);
        $("#kategori").val(response.data.kategori);
        $("#nama").val(response.data.nama);
        $("#harga").val(response.data.harga);
        $("#deskripsi").val(response.data.deskripsi);
      } else {
        Swal.fire({
          text: response.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
  });
}

// Hapus Produk berdasarkan id
function hapus(id) {
  Swal.fire({
    title: "Data Barang Akan Dihapus?",
    text: "Data yang dihapus tidak dapat dikembalikan",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Hapus",
    confirmButtonColor: "#3085d6",
    cancelButtonText: "Batal",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        text: "Sedang menghapus data",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/produk/" + id,
        dataType: "JSON",
        success: function (response) {
          Swal.close();

          if (response.status) {
            Swal.fire({
              text: response.message,
              icon: "success",
              confirmButtonText: "Ok",
            });
            fetch_data();
            $("#md-dialog").modal("hide");
          } else {
            Swal.fire({
              text: response.message,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        },

        error: function (xhr, status, error) {
          Swal.close();
          Swal.fire({
            text: "Terjadi kesalahan saat menghapus data.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        },
      });
    }
  });
}
