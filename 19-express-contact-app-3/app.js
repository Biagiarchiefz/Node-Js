const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParse = require('cookie-parser')
const flash = require('connect-flash')


const app = express()
const port = 3000

// cara gunakan ejs~
app.set('view engine', 'ejs')


// third party middleware
app.use(expressLayouts)


// Build-in middleware
app.use(express.static('public'));


// untuk menangkap data yang di kirim
app.use(express.urlencoded({extended: true}))


// konfigurasi flash 
app.use(cookieParse('secret'));
app.use(session({
  cookie: { maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized:true,
}))

app.use(flash());

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
    contacts,
    msg: req.flash('msg')
    })
})


// halaman form tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Tambah Data Contact',
    layout: 'layouts/main-layout'
  })
})


// proses data contact
app.post('/contact',[
  body('nama').custom((value) => {
    const duplikat = cekDuplikat(value);
    if(duplikat) {
      throw new Error('Nama kontak sudah terdaftar ')
    }
    return true 
  }),
  check('email', 'email tidak valid').isEmail(),
   check('noHp', 'no hp tidak valid').isMobilePhone('id-ID')
  
  ], (req, res) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    // return res.status(404).json({ errors: errors.array()})
    res.render('add-contact', {
      title : 'Form Tambah Data Contact',
      layout : 'layouts/main-layout',
      errors : errors.array(),
    });
  } else {
    addContact(req.body);


    // kirimkan flash message
    req.flash('msg', 'Data contact berhasil ditambahkan')
     
    res.redirect('/contact')
  }
})

// Proses delete contact
app.get('/contact/delete/:nama', (req, res) => {
  const contact = findContact(req.params.nama)

  // jika contact tidak ada 
  if(!contact) {
    res.status(404)
    res.send('<h1>404</h1>')
  } else {
    deleteContact(req.params.nama)
    req.flash('msg', 'Data contact berhasil dihapus')
     
    res.redirect('/contact')
  }

})


// halaman form edit data contact
app.get('/contact/edit/:nama', (req, res) => {
  const contact = findContact(req.params.nama)

  res.render('edit-contact', {
    title: 'Form edit Data Contact',
    layout: 'layouts/main-layout',
    contact 
  })
})


// proses edit data contact
app.post('/contact/update',[
  body('nama').custom((value, {req}) => {
    const duplikat = cekDuplikat(value);

    if(value !== req.body.oldNama && duplikat) {
      throw new Error('Nama kontak sudah terdaftar ')
    }
    return true 
  }),
  check('email', 'email tidak valid').isEmail(),
   check('noHp', 'no hp tidak valid').isMobilePhone('id-ID')
  
  ], (req, res) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    // return res.status(404).json({ errors: errors.array()})
    res.render('edit-contact', {
      title : 'Form Edit Data Contact',
      layout : 'layouts/main-layout',
      errors : errors.array(),
      contact : req.body,
    });
  } else {

    updateContacts(req.body);

    // kirimkan flash message
    req.flash('msg', 'Data contact berhasil edit')
     
    res.redirect('/contact')
  }
})



// halaman detail contact
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




console.log('hai')
console.log('hallo')
console.log('hallo')



