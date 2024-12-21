const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact } = require('./utils/contacts')

const app = express()
const port = 3000

// cara gunakan ejs~
app.set('view engine', 'ejs')


// third party middleware
app.use(expressLayouts)


// Build-in middleware
app.use(express.static('public'));




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
    layout: 'layouts/main-layout'
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
  const contacts = loadContact()

  res.render('contact', {
    layout: 'layouts/main-layout', 
    title : 'Halaman contact',
    contacts
    })
})

app.get('/contact/:nama', (req, res) => {  
  const contact = findContact(req.params.nama)

  res.render('detail', {
    layout: 'layouts/main-layout', 
    title : 'Halaman detail contact',
    contact
    })
})


app.use('/', (req, res) => {
  res.status(404)
  res.send('404')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})







