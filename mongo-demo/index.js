const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to MongoDB...'))
.catch((err => console.error('Could not connect...', err)));

/*const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPulished: Boolean,
    price: Number
});

const Coures = mongoose.model('Course', courseSchema);*/

const Coures = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: String
    /*author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }*/
}));
 
const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

/*async function createCourse() {
    const course = new Coures({
        name: 'Node.js Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPulished: true,
        price: 15
    });

    try {
        await course.validate();
        //const result = await course.save();
        //console.log(result);
    } catch (ex) {
        console.log(ex.message);
    }

    const result = await course.save();
    console.log(result);
}*/

//createCourse();

async function createCourse(name, author) {
    const course = new Coures({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourse() {
    const courses = await Coures
     .find()
     .select('name');
    console.log(courses);
}

async function getCourse() {
    //const pageNumber = 2;
    //const pageSize = 10;
    
    const courses = await Coures
     .find({ author: 'Mosh', isPulished: true })
     //.find({ price: { $gte: 10, $lte: 20 } })
     //.or([ { author: 'Mosh', isPublished: true } ])
     //.find({ author: /^Mosh/ })
     //.find({ author: /Hamedani$/i })
     //.find({ author: /.*Mosh.*/i })
     //.skip((pageNumber - 1) * pageSize)
     .limit(10)
     .sort({ name: 1 })
     .select({ name: 1, tags: 1 })
     .count();
    console.log(courses);
}

getCourse();

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}

createAuthor('Mosh', 'My bio', 'My Website' );

createCourse('Node Course', ' 5e7e54eee6b4f50c1054d629');

//listCourse();
