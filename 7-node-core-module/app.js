
// fungsi di bawah ini untuk menulis data ke dalam file
// Core Module
// 1. File System


const fs = require('fs')


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

const readline = require('readline');
const { json } = require('stream/consumers');
const rl = readline.createInterface({
  input : process.stdin,
  output:process.stdout,
})


// 2 pertanyaaan, callback bisa di dalam callback
//  console.log('no hp ini '+ no + ' milik ' + nama)
rl.question('Masukkan nama anda : ', (nama) => {
  rl.question('Masukkan nomor telephone anda : ', (no) => {
    const contact = {nama, no }
    const file = fs.readFileSync ('data/contact.json', 'utf-8')
    const contacts = JSON.parse(file)    // untuk merubah string menjadi JSON menggunakan parse
    

    contacts.push(contact)       // contacts yang awalnya array kosong di masukan nilai contact yang isi nama, no

    fs.writeFileSync('data/contact.json', JSON.stringify(contacts) )     //JSON.stringify untuk merubah file JSON ke string

    console.log('Terimkakasih telah memasukan data')

    rl.close();
  })
});