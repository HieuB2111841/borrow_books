
const bookModel = require('../models/book');
const ApiError = require('../api-error');

class BookController {
    async findAll (req, res, next) {
        try {
            const books = await bookModel.find({});
            return res.send(books);
        } catch (error) {
            return next(new ApiError(500, 'Error retrieving books'));
        }
    }

    async findOne (req, res, next) {
        try {
            const { slug } = req.params;
            const book = await bookModel.findOne({ slug: slug });

            if (!book) {
                return next(new ApiError(404, 'Book not found'));
            }

            return res.send(book);
        } catch (error) {
            return next(
                new ApiError(500, `Error retrieving Book with id = ${ slug }`)
            );
        }
    }

    async create (req, res, next) {
        try {
            const data = req.body;
            const newBook = await bookModel.create({
                name: data.name,
                price: data.price,
                bookNumber: data.bookNumber,
                publicationDate: data.publicationDate,
                author: data.author,
                origin: data.origin,
                publisherID: data.publisherID,
            });
            return res.json({ success: true, receivedData: newBook });
        } catch (error) {
            return next(new ApiError(500, 'Error creating book'));
        }
    }
}

module.exports = new BookController;
