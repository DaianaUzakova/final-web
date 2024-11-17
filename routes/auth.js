const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');

router.get('/register', (req, res) => {
    console.log('Загрузка страницы регистрации');
    res.render('register', { error: null }); 
});

router.post('/register', async (req, res) => {
    try {
        console.log('Попытка регистрации:', req.body);
        const { username, password, firstName, lastName, age, gender } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.error(`Пользователь с email "${username}" уже существует`);
            return res.status(400).render('register', { error: 'Пользователь с таким email уже существует' });
        }

        const role = username === 'uzakovadaiana5957@gmail.com' ? 'admin' : 'editor';
        console.log(`Назначена роль "${role}" для пользователя "${username}"`);

      
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Пароль успешно хэширован');

        const newUser = new User({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            age,
            gender,
            role, 
        });

        await newUser.save();
        console.log(`Пользователь "${username}" успешно зарегистрирован`);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        transporter.verify((error, success) => {
            if (error) {
                console.error('Ошибка при проверке транспорта Nodemailer:', error.message);
            } else {
                console.log('Nodemailer готов к отправке писем');
            }
        });

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: username,
                subject: 'Добро пожаловать на платформу!',
                text: `Здравствуйте, ${firstName}! Спасибо за регистрацию!`,
            });
            console.log(`Приветственное письмо отправлено на "${username}"`);
        } catch (emailError) {
            console.error('Ошибка при отправке письма:', emailError.message);
            return res.status(500).render('register', { error: 'Ошибка при отправке письма. Попробуйте снова.' });
        }

        res.redirect('/auth/login'); 
    } catch (error) {
        console.error('Ошибка при регистрации:', error.message);
        res.status(500).render('register', { error: 'Ошибка сервера. Попробуйте снова.' });
    }
});

router.get('/login', (req, res) => {
    console.log('Загрузка страницы входа');
    res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
    try {
        console.log('Попытка входа с:', req.body);
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            console.error(`Пользователь "${username}" не найден`);
            return res.status(400).render('login', { error: 'Неверный email или пароль' });
        }
        console.log('Пользователь найден:', user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error(`Неверный пароль для пользователя "${username}"`);
            return res.status(400).render('login', { error: 'Неверный email или пароль' });
        }
        console.log('Пароль успешно проверен для пользователя:', username);

        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role,
        };
        console.log('Сессия пользователя:', req.session.user);

        console.log(`Пользователь "${username}" успешно вошел`);
        res.redirect('/'); 
    } catch (error) {
        console.error('Ошибка при входе:', error.message);
        res.status(500).render('login', { error: 'Ошибка сервера. Попробуйте снова.' });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Ошибка при выходе:', err.message);
            return res.status(500).send('Ошибка сервера');
        }
        console.log('Пользователь успешно вышел из системы');
        res.redirect('/auth/login'); 
    });
});

module.exports = router;
