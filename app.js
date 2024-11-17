const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const Image = require('./models/Image');
const path = require('path');

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'defaultsecret', 
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
        },
    })
);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('Ошибка подключения к MongoDB:', err.message);
        process.exit(1); 
    });

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.get('/', async (req, res) => {
    try {
        const images = await Image.find(); 
        const admin = req.session.user && req.session.user.role === 'admin'; 
        res.render('index', { images, admin }); 
    } catch (error) {
        console.error('Ошибка при загрузке главной страницы:', error);
        res.status(500).send('Ошибка сервера');
    }
});

app.use((req, res) => {
    res.status(404).render('404', { message: 'Страница не найдена' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();

const yahooRoutes = require('./routes/yahoo');

app.use('/yahoo', yahooRoutes);
app.use((req, res) => {
    res.status(404).render('404');
});
