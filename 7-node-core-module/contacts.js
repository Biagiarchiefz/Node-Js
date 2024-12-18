const { rejects } = require('assert');
const fs = require('fs');
// const chalk = require (' chalk ')
// import chalk from 'chalk';
const validator = require('validator')
const { resolve } = require('path');


// menuliskan string ke file ( synchronous )
// try {
//   fs.writeFileSync('data/text.txt', 'Hello World secara synchronous') 
// } catch (e) {
//   console.log(e);
// }



// menuliskan string ke file ( asynchronous )
// fs.writeFile( 'data/text.txt', 'Hello World secara Asyncronous', ( err ) => {
// console.log(err + 'biagi')
// })


// membaca isi file ( syncronous )
// const data = fs.readFileSync('data/text.txt', 'utf-8')
// console.log(data)


// membaca isi file ( asyncronous )
// fs.readfile('data/text.txt', 'utf-8', ( err, data ) =>{
//   if ( err ) throw err;   // throw sama kaya return langsung keluar dari function
//   console.log(data)
// } 
// )

// kalau menggunakan function callback dia syncronous ( menunggu selesai kode pertama baru lanjut ke yang kedua kalau sudah selesai )


// Readline ( membaca input dri user melalui terminal dan memberikan respon )

// const readline = require('readline');
// // const { json } = require('stream/consumers');
// const rl = readline.createInterface({
//   input : process.stdin,
//   output:process.stdout,
// })


// membuat foldert data jika belum ada
const dirPath = './data'
if (!fs.existsSync(dirPath)) {    // Kode ini digunakan untuk memeriksa apakah suatu file atau direktori ada di sistem file
  fs.mkdirSync('./data')          // jika dirPath tidak buat direktory ('./data')
} 
  

// membuat file contacts.json jika belum ada
const filePath = './data/contact.json'
if (!fs.existsSync(filePath) ) {          // jika filePath tidak ada kalau true buat file tersebut ( lokasi file, isi file, enkoding )
  fs.writeFileSync(filePath, '[]' , 'utf-8')       
}


// arrow function ini mengembalikan promise
// const tulisPertanyaan = ( pertanyaaan ) => {
//   return new Promise( (resolve, reject) => {           // resolve: Fungsi untuk mengembalikan hasil jika operasi berhasil.
//     rl.question(pertanyaaan, (nama) => {      // reject: Fungsi untuk mengembalikan error jika operasi gagal.
//       resolve(nama);
//     })
//   })
// }

const loadContact = () => {
  const file = fs.readFileSync ('data/contact.json', 'utf-8')
  const contacts = JSON.parse(file)    // untuk merubah string menjadi JSON menggunakan parse
  return contacts 
}

const simpanContact = ( nama, email, noHp) => {

const contact = { nama, email, noHp }
const contacts = loadContact();

  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama );

  if(duplikat) {
    console.log('contact sudah terdaftar, masukkan nama lain')
    return false
  }

  // cek email 
  if (email) {       // jika email ada isinya
    if (!validator.isEmail(email)) {
      console.log('email tidak valid')
      return false
    }
  }

  // cek nomor hp
  if (!validator.isMobilePhone(noHp, 'id-ID')) {
    console.log('nomor hp tidak valid')
    return false
  }  
    contacts.push(contact)       // contacts yang awalnya array kosong di masukan nilai contact yang isi nama, no

    fs.writeFileSync('data/contact.json', JSON.stringify(contacts) )     //JSON.stringify untuk merubah file JSON ke string
    console.log('Terimkakasih telah memasukan data')
}


    // menampilkan daftar kontak
    const listContact= () => {
      const contacts = loadContact();
      console.log('Daftar kontak : ')
      contacts.forEach((contact, i) => {           // untuk setiap contak yg ada dlm kontax
        console.log(`${ i + 1 }. ${contact.nama} - ${contact.noHp}`)
      })
    }

    // menampilkan detail kontak
    const detailContact = (nama) => {
      const contacts = loadContact();

      const contact = contacts.find( (contact) => contact.nama.toLowerCase() === nama.toLowerCase() )

      if(!contact) {    // jika data contact tidak ada
        console.log(`${nama} tidak ditemukan`)
        return false    // kenapa di return false??, agar functionya tidak lanjut ke yang bawah pada saat smpe baris ini
      }

      console.log(`${contact.nama}`)
      console.log(`${contact.noHp}`)

      if(contact.email) {
        console.log(`${contact.email}`)
      }
    }



    const deleteContact = (nama) => {
      const contacts = loadContact();
      const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
      )

      if (contacts.length == newContacts.length) {
        console.log(`${nama} tidak ditemukan`)
        return false
      }

      fs.writeFileSync('data/contact.json', JSON.stringify(newContacts) )     //JSON.stringify untuk merubah file JSON ke string

      console.log(`data contact ${nama} berhasil di hapus`)
    }



module.exports = {
  simpanContact,
  listContact,
  detailContact,
  deleteContact
}
