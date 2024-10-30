
const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: { 
        type: String,
        require: true,
    },
    price: { 
        type: Number, 
        default: 0, 
    },
    bookNumber: { 
        type: Number, 
        default: 1,
    },
    publicationDate: { 
        type: Date, 
        default: Date.now(),
    },
    publisherID: { 
        type: Object,
        default: null,
    },
    author: { 
        type: String, 
        default: 'Unknown author', 
    },
    origin: { 
        type: String,
        default: 'Unknown origin',
    },
    slug: { 
        type: String, 
        unique: true, 
    },
}, {
    timestamps: true,
});

// Tạo slug tự động trước khi lưu
BookSchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Book', BookSchema);
