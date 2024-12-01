
// fungsi di bawah ini untuk menulis data ke dalam file
// Core Module
// 1. File System

const contacts = require('./contacts')


const main = async() => {
  const nama = await contacts.tulisPertanyaan('Masukkan nama anda : ')
  const email = await contacts.tulisPertanyaan('Masukkan email anda : ')
  const noHp = await contacts.tulisPertanyaan('Masukkan nomor handphone anda : ')

 contacts.simpanContact(nama, email, noHp)
}

main()













// // 2 pertanyaaan, callback bisa di dalam callback
// //  console.log('no hp ini '+ no + ' milik ' + nama)

// rl.question('Masukkan nama anda : ', (nama) => {
//   rl.question('Masukkan nomor telephone anda : ', (no) => {
//     const contact = {nama, no }
//     const file = fs.readFileSync ('data/contact.json', 'utf-8')
//     const contacts = JSON.parse(file)    // untuk merubah string menjadi JSON menggunakan parse
    

//     contacts.push(contact)       // contacts yang awalnya array kosong di masukan nilai contact yang isi nama, no

//     fs.writeFileSync('data/contact.json', JSON.stringify(contacts) )     //JSON.stringify untuk merubah file JSON ke string

//     console.log('Terimkakasih telah memasukan data')

//     rl.close();
//   })
// });