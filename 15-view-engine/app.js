const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

// cara gunakan ejs
app.set('view engine', 'ejs')
app.use(expressLayouts)



app.get('/', (req, res) => {   
  // res.sendFile('/', { root: __dirname })

  const mahasiswa = [
    {
      nama : 'Biagi archie fais',
      email : 'biagi@gmail.com'
    },
    {
      nama : 'reza',
      email : 'reza@gmail.com'
    },
    {
      nama : 'desi',
      email : 'desi@gmail.com'
    },
  ]

  // memanggil halaman dalam folder view
  res.render('index', {
     nama: 'Biagii arc',
    title : 'halaman home',
    mahasiswa,
  })

})

app.get('/about', (req, res) => {  
  // res.send('ini adlaah halaman abotu')
  // res.sendFile('/about.html', { root: __dirname })
  res.render('about', {
    layout: 'layouts/main-layout',
    title : 'Halaman about'
    })
})

app.get('/contact', (req, res) => {  
  // res.send('ini adlaah halaman abotu')
  // res.sendFile('/contact.html', { root: __dirname })
  res.render('contact', {
    layout: 'layouts/main-layout', 
    title : 'Halaman contact'
    })
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







