
const mongoose = require('mongoose');

connect = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log('Connect to mongodb successfully');
    }
    catch (e) {
        console.log('Connect to mongodb failure');
    }
};


module.exports = { connect };
