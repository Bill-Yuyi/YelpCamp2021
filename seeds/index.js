const express = require('express');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');
const { $where } = require('../models/campground');
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const url = process.env.DB_URL

mongoose.connect(url, {
    useNewUrlParser: true,

    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("connected");
});
const sample = (array) => array[Math.floor(Math.random() * array.length)];
const price = Math.floor(Math.random() * 20 + 10);

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '61b96162528bcf83683241d2',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            geometry: {
                type: "Point",
                coordinates: [cities[rand1000].longitude,
                cities[rand1000].latitude]
            },
            image: [
                {
                    url: 'https://res.cloudinary.com/dvvk08c5g/image/upload/v1639466790/YelpCamp/zksxt74r7bwpg7yi617t.jpg',
                    filename: 'YelpCamp/gutj63egumcacplhzrm9'

                },
                {
                    url: 'https://res.cloudinary.com/dvvk08c5g/image/upload/v1639466790/YelpCamp/pspmp5shq9mnetcxf6r6.jpg',
                    filename: 'YelpCamp/cpf6aogh4x2xq0hrfqfw'

                }
            ],
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum consequatur, quia dolor itaque quasi quae numquam maxime, molestiae eum facilis asperiores nobis suscipit ea aspernatur veniam iste quisquam debitis? Culpa.',
            price
        });
        await camp.save();
    }
}

seedDB().then(() => { mongoose.connection.close })