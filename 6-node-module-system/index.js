// const fs = require("fs");               // import core module

// const coba = require("./coba");        // import local module
                                       // menangkap menggunakan require dan harus di bungkus menggunakan variabel
// const moment = require("moment");   // third party module       



const coba = require("./coba");    // isi dari coba diubah ke bentuk object
// console.log(coba)                  // jadi untuk mengaksesnya kita coba.namaexports

console.log(
  coba.namabebas("Biagi"),
  coba.PI,
  coba.mhs.info(),
  new coba.Hidup()
)
