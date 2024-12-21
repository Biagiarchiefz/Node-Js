const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {   // setelah kita menjalankan appnya, lalu ketika request method get ke halaman root makan jalankan functinya
  // res.send('Hello World!')
  res.sendFile('/', { root: __dirname })
})

app.get('/about', (req, res) => {  
  // res.send('ini adlaah halaman abotu')
  res.sendFile('/about.html', { root: __dirname })
})

app.get('/contact', (req, res) => {  
  // res.send('ini adlaah halaman abotu')
  res.sendFile('/contact.html', { root: __dirname })
})

app.get('/product/:id/category/:idCat', (req, res) => {
  res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`)
})



app.use('/', (req, res) => {
  res.status(404)
  res.send('404')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
























// const http = require('http')
// const fs = require('fs')


// const renderHTML = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.writeHead('Error: file tidak ditemukan')
//     } else {
//       res.write(data)
//     }
//     res.end()
//   })
// }

// const server = http.createServer( (req, res ) => {
// res.writeHead(200, {
//     'Content-Type' : 'text/html',
//    });

//    const url = req.url;

//   //  if ( url === '/about'){
//   //   renderHTML('./about.html', res)

//   //  } else if ( url === '/contact') {
//   //   res.write('ini halaman contact')
//   //   res.end()

//   //  } else {
//   //   //  res.write('Halaman ini tidak ditemukan ');
//   //   renderHTML('./index.html', res)
//   // }

//   switch (url) {
//     case '/about':
//       renderHTML('./about.html', res)
//       break;
//     case '/contact':
//       renderHTML('./contact.html', res)
//       break;
//     default :
//       renderHTML('./index.html', res)
//       break;
//   }

// })


// server.listen(3000, () => {
//   console.log('server is listening on port 3000')    // pesan pada saat program berjalan 
// })