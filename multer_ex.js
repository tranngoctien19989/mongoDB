const express = require('express')
const app = express()
const port = 3030
const bodyParser = require('body-parser')
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require('mongoose');

const uri = 'mongodb+srv://tientnph19989:tien03@cluster0.jicczym.mongodb.net/CP17302?retryWrites=true&w=majority';

const svModel = require('./svModel');

app.get("/sinhvien", async (request, response) => {

    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong.'));

    const sinhviens = await svModel.find({tuoi: 20});

    try {
        console.log(sinhviens);
        response.send(sinhviens);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/update_sv", async (request, response) => {

    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong.'));

    try {
        var kq = await svModel.updateOne({ten: 'Tran Van Anh'}, {ten: 'Nguyen Van Anh', tuoi: 25});

        console.log(kq);

        //await sv.save();
        response.send(kq);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/xoa_sv", async (request, response) => {

    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong.'));

    try {
        var kq = await svModel.findOneAndRemove({ten: 'Nguyen Van Anh'});

        console.log(kq);

        //await sv.save();
        response.send(kq);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/add_sv", async (request, response) => {

    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong.'));

    let sv = new svModel({
        ten: 'Tran Van Anh',
        tuoi: 22
    });

    sv.diachi = 'HP';

    try {
        console.log(sv);
        await sv.save();
        response.send(sv);
    } catch (error) {
        response.status(500).send(error);
    }
});



// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})



//Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
})




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

