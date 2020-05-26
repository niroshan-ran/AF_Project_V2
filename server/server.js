const express = require('express');
const app = express();
const cors = require('cors');
const connectToDatabase = require('./config/connectToDatabase');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(cookieParser())

app.use(bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:50000
}));

//app.use(express.json({limit: "50mb"}));
// app.use(bodyParser.json({ limit: "200mb" }));
// app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));

app.use('/api/users', require('./routes/users'));
app.use('/api/store_manager', require('./routes/storemanagers'));
app.use('/api/cart', require('./routes/cart'));

const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const feedbackRouter = require('./routes/feedback');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose')

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie:{maxAge:180*60*100}
}));

app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/feedback', feedbackRouter);




app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});
/*app.get(
    '/',
    (req,res) => {
        res.send('hello')
    }
)*/
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log('Server is running on PORT', PORT))