module.exports = {
    //MongoDB configuration
    development: {
        db: 'mongodb://heroku_d82tz725:gm05ehm7j8pipbl1due9qkf2f2@ds239911.mlab.com:39911/heroku_d82tz725',
        app: {
            name: 'graphql'
        }
    },
    production: {
        // mongodb://heroku_d82tz725:gm05ehm7j8pipbl1due9qkf2f2@ds239911.mlab.com:39911/heroku_d82tz725
        db: 'mongodb://heroku_d82tz725:gm05ehm7j8pipbl1due9qkf2f2@ds239911.mlab.com:39911/heroku_d82tz725',
        app: {
            name: 'graphql'
        }
    }
};
