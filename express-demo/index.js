const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi'); //return a class
const logger = require('./logger');
const auth = require('./auth');
const express = require('express');
const app = express();

//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

app.use(express.json()); //add a piece of middleware
app.use(express.urlencoded({ extended: true })); //key=value&key=value > req.body
app.use(express.static('public')); //to serve static files
app.use(helmet);

if(app.get('env') === 'development') {
	app.use(morgan('tiny'));
}

//custom middlewere functions
app.use(logger); 
app.use(auth);
	
const courses = [
	{ id: 1, name: 'course 1' },
	{ id: 2, name: 'course 2' },
	{ id: 3, name: 'course 3' },
];

app.get('/api/courses', (req, res) => {
	res.send(courses);
});

app.post('/api/courses/', (req, res) => {

	/*
	if(!req.body.name || req.body.name.length < 3){
		res.status(400).send('Name is required and should be minimum 3 chars');
		return;
	}
	*/

	//Validation using Joi@13.1.0	
	const { error } = validateCourse(req.body); //result.error
	if (error) return res.status(400).send(error.details[0].message);

	/*
	if(result.error){
		res.status(400).send(result.error.details[0].message);
		return;
	}
	*/

	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
	//Look up the course
	//If not exisiting , return 404
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('The course with the given ID was not found'); //404 Status

	//Validate
	//If invalid, return 400 - Bad request
	//const result = validateCourse(req.body);
	const { error } = validateCourse(req.body); //result.error
	if (error) return res.status(400).send(error.details[0].message);

	//Update course
	//Return the updated course
	course.name = req.body.name;
	res.send(course);

});

app.delete('/api/courses/:id', (req, res) => {
	//Look up the course
	//Not existing, return 404
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('The course with the given ID was not found'); //404 Status

	//Delete 
	const index = courses.indexOf(course);
	courses.splice(index, 1);

	//Return the same course
	res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('The course with the given ID was not found'); //404 Status	
	res.send(course);
});

function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required()
	};
	return Joi.validate(course, schema);
}

/*
app.get('/' , (req, res) => {
	res.send('Hello World');	
});

app.get('/api/courses' , (req, res) => {
	res.send([1, 2, 3]);	
});

app.get('/api/courses/:id', (req, res) => {
	res.send(req.params.id);
});

app.get('/api/posts/:year/:month', (req, res) => {
	//res.send(req.query);
	//res.send(req.params);
});
*/

//PORT >> Environment Variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.. `));
