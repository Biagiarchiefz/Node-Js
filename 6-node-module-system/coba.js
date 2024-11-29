const coba = (nama) => {              
  console.log(`Hello ${nama}`);
}

const PI = 3.14;

const mahasiswa = {
  nama : "Budi",
  umur : 22,
  info () {         // function ES6 kalau cuma sebaris langsung aja
   return `nama saya ${this.nama} dan umur saya ${this.umur}`;
  }
}


class Hidup {
  constructor() {      // constructor adalah method yang otomatis di jalankan ketika class di instansiasi
    console.log(`selamat kamu masih hidup`)
  }
}

// module.exports.namabebas = coba         // untuk memanggil ke file lain kita bisa menggnakan module.exports dan di file lain menangkap dengan require(lokasi file)
// module.exports.PI = PI
// module.exports.mhs = mahasiswa
// module.exports.hidup =Hidup

module.exports = {        // kalau di dalam object pakai :
  namabebas : coba,
  PI,                     // kalau kta menggunaka notasi ES6 kita tidak perlu menulis semua, kalau namanya sama antara properti dngn value ditulis sekali saja
  mhs : mahasiswa,        
  Hidup
}




