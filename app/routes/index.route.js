
const bookRouter = require('./book.route');
const siteRoute = require('./site.route');

function route (app) {

    app.use('/books', bookRouter);
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
