
const app = require('./app.js');
const config = require('./app/config/index.config.js');
const db = require('./app/config/db/index.db.js');

async function startServer() {
    try {
        await db.connect(config.db.uri);

        const PORT = config.app.port;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
        process.exit();
    }
}

startServer();
