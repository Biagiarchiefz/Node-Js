const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');


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

// ambil semua data di contact.json 
const loadContact = () => {
  const file = fs.readFileSync ('data/contact.json', 'utf-8')
  const contacts = JSON.parse(file)    // untuk merubah string menjadi JSON menggunakan parse
  return contacts 
}

// cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();    // loadContact() ambil semua data contact

  const contact = contacts.find( (contact) => contact.nama.toLowerCase() === nama.toLowerCase() )
  return contact
}

module.exports = {loadContact, findContact}