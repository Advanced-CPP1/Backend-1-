const fs = require('fs');

const path = require('path');

const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    const rootFilePath = path.join(__dirname, 'views', 'index.html');
    response.status(200).sendFile(rootFilePath);
});

app.get('/restaurants', (request, response) => {
    const restaurantsFilePath = path.join(__dirname, 'views', 'restaurants.html');
    response.status(200).sendFile(restaurantsFilePath);
});

app.get('/confirm', (request, response) => {
    const confirmFilePath = path.join(__dirname, 'views', 'confirm.html');
    response.status(200).sendFile(confirmFilePath);
});

app.get('/recommend', (request, response) => {
    const recommedFilePath = path.join(__dirname, 'views', 'recommend.html');
    response.status(200).sendFile(recommedFilePath);
});

app.post('/recommend', (request, response) => {
    const restaurant = request.body;

    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);

    const exisitingInformation = JSON.parse(fileData);
    exisitingInformation.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(exisitingInformation));

    response.redirect('/confirm');
});

app.get('/about', (request, response) => {
    const aboutFilePath = path.join(__dirname, 'views', 'about.html');
    response.status(200).sendFile(aboutFilePath);
});

app.listen(3000);