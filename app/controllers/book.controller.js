
const bookModel = require('../models/book');

class BookController {
    async findAll (req, res, next) {
        bookModel.find({})
            .then((books) => {
                res.send(books);
            })
            .catch(next);
    }

    async findOne (req, res, next) {
        const { slug } = req.params;
        bookModel.findOne({ slug: slug })
            .then((books) => {
                res.send(books);
            })
            .catch(next);
    }

    async create (req, res, next) {
        const data = req.body;
        bookModel.create({
            name: data.name,
            price: data.price,
            bookNumber: data.bookNumber,
            publicationDate: data.publicationDate,
            author: data.author,
        })
            .then(() => {
                res.json({ success: true, receivedData: data });
            })
            .catch(next);
    }
}

module.exports = new BookController;
