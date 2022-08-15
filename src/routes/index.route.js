const supplierRouter = require('./supplierRouter.route');
const categoryRouter = require('./categoryRouter.route');
const productRouter = require('./productRouter.route');
const siteRouter = require('./siteRouter.route');
const accountRouter = require('./accountRoute.route');
const formidable = require('express-formidable');



var route = (app) => {
    app.use('/products', productRouter);
    app.use(formidable());
    app.use('/', siteRouter);
    app.use('/account', accountRouter);
}

module.exports = route;