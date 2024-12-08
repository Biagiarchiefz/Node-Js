const http = require('http')
const fs = require('fs')


const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.writeHead('Error: file tidak ditemukan')
    } else {
      res.write(data)
    }
    res.end()
  })
}

const server = http.createServer( (req, res ) => {
res.writeHead(200, {
    'Content-Type' : 'text/html',
   });

   const url = req.url;

  //  if ( url === '/about'){
  //   renderHTML('./about.html', res)

  //  } else if ( url === '/contact') {
  //   res.write('ini halaman contact')
  //   res.end()

  //  } else {
  //   //  res.write('Halaman ini tidak ditemukan ');
  //   renderHTML('./index.html', res)
  // }

  switch (url) {
    case '/about':
      renderHTML('./about.html', res)
      break;
    case '/contact':
      renderHTML('./contact.html', res)
      break;
    default :
      renderHTML('./index.html', res)
      break;
  }

})


server.listen(3000, () => {
  console.log('server is listening on port 3000')    // pesan pada saat program berjalan 
})