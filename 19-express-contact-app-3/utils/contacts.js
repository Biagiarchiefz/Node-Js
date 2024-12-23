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


// menuliskan data / menimpa file contact.json dengan data yang baru 
const saveContacts = (contacts) => {
  fs.writeFileSync('data/contact.json', JSON.stringify(contacts));

}


// menambahkan data contact baru 
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact)
  saveContacts(contacts);
}


// cek nama yang duplikat 
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
}


// hapus contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
  saveContacts(filteredContacts)
}


// mengubah contact
const updateContacts = (contactBaru) => {
  const contacts = loadContact();

  // hilangkan contact lama yang namanya sama dengan oldNama
  const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
  delete contactBaru.oldNama;
  filteredContacts.push(contactBaru);
  saveContacts(filteredContacts);
  

} 

module.exports = {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts}