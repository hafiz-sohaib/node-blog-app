require('dotenv').config();


// ========== Import Dependencies ==========
const express = require('express');
const createError = require('http-errors');
const path = require('path');


// ========== Define Port & App ==========
const port = process.env.port;
const app = express();


// ========== Configuration JSON Body Data ==========
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// ========== Configuration Templating Engine ==========
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));


// ========== Define Static Files Path ==========
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'storage')));
app.use(express.static(path.join(__dirname, 'app/views')));


// ========== Define Routes ==========
app.use('/', require('./app/routes/site'));
app.use('/admin', require('./app/routes/admin'));


// ========== Define API Routes ==========
app.use(process.env.api_prefix, [
	require('./app/apis/posts/post-endpoints')
]);


// ========== Define a Function to Catch Errors ==========
app.use((request, response, next) => next(createError(404)));
app.use((error, request, response, next) => {
	response.locals.message = error.message;
	response.locals.error = request.app.get('env') === 'development' ? error.status : {};

	response.status(error.status || 500);
	response.render('error');
});


// ========== Setup Port to Run The App ==========
app.listen(port, ()=> console.log(`Running app on port ${port}`));