
const authRouter = require('./auth.route');
const readerRouter = require('./reader.route');
const bookRouter = require('./book.route');
const borrowingBookRouter = require('./borrowing_books.routes');
const imageRouter = require('./image.route');
const siteRoute = require('./site.route');

function route (app) {

    app.use('/auth', authRouter);
    app.use('/readers', readerRouter);
    app.use('/books', bookRouter);
    app.use('/borrow', borrowingBookRouter);
    app.use('/images', imageRouter);
    app.use('/', siteRoute);

    // Handle 404 response
    app.use((req, res, next) => {
        return next(new APIError(404, 'Resource not found'));
    });

    // Middleware handle errors
    app.use((err, req, res, next) => {
        return res.status(err.statusCode || 500).json({
            message: err.message || 'Internal Server Error',
        });
    });
}

module.exports = { route };
