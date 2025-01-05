// const { MongoClient } = require('mongodb');

// // Connection URL
// const url = 'mongodb://127.0.0.1:27017';
// // const url = 'mongodb://localhost:27017';


// const dbName = 'biagidb';

// const client = new MongoClient(url);


// client.connect((error, client) => {
//   if(error) {
//     return console.log('koneksi gagal')
//   }

//   // Pilih database
//   const db = client.db(dbName)

//   // Menambah 1 data ke collection/tabel mahasiswa
//   db.collection('mahasiswa').insertOne(
//   {
//     nama: 'budin',
//     email: 'budin@gmail.com'  
//   },

//    // callback function (jika error) and (jika berhasil)
//    (error, result) => {
//     if(error) {
//       return console.log('gagal menambahkan data')
//     }
    
//     console.log(result)

//    }
// )

// })



const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'biagidb';

// Membuat koneksi ke MongoDB
async function main() {
  const client = new MongoClient(url);

  try {
    // Koneksi ke server
    await client.connect();
    console.log('Koneksi berhasil ke MongoDB');

    // Pilih database
    const db = client.db(dbName);

    // // Menambahkan data ke koleksi "mahasiswa"
    // const result = await db.collection('mahasiswa').insertOne({
    //   nama: 'budin',
    //   email: 'budin@gmail.com',
    // });



    // Menambahkan lebih dari satu data 
    const result = await db.collection('mahasiswa').insertMany(
      [{
      nama: 'desi hasfita',
      email: 'desi@gmail.com'
    },
    {
      nama: 'galih',
      email: 'galih@gmail.com'
    }]
  )

    console.log('Data berhasil ditambahkan:', result);
  } catch (error) {
    console.error('Koneksi gagal:', error);
  } finally {
    // Menutup koneksi
    await client.close();
  }
}

main().catch(console.error);

console.log('berhasil')








































// const { MongoClient } = require('mongodb');
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'biagidb';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('documents');

//   // the following code examples can be pasted here...

//   return 'done.';
// }



// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());