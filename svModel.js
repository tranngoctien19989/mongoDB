const mongoose = require("mongoose");

const SinhVienSchema = new mongoose.Schema({
    ten: {
        type: String,
        required: true
    },
    tuoi: {
        type: Number,
        default: 18
    },
    diachi: {
        type: String
    }
});

const SinhVienModel = mongoose.model('sinhvien', SinhVienSchema);
module.exports = SinhVienModel;
