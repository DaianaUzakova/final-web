const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Image = require('../models/Image');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Неподдерживаемый тип файла. Разрешены только JPEG, PNG и GIF.'));
    }
};

const upload = multer({ storage, fileFilter });

function checkRole(role) {
    return (req, res, next) => {
        if (!req.session.user || req.session.user.role !== role) {
            return res.status(403).send('Доступ запрещен');
        }
        next();
    };
}

router.get('/images', async (req, res) => {
    try {
        const images = await Image.find();
        const admin = req.session.user && req.session.user.role === 'admin'; // Проверяем роль
        res.render('admin/images', { images, admin });
    } catch (error) {
        console.error('Ошибка при загрузке изображений:', error);
        res.status(500).send('Ошибка сервера');
    }
});

router.post('/images', upload.single('image'), async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(403).send('Доступ запрещен');
        }

        const { title, description } = req.body;
        if (!req.file) {
            return res.status(400).send('Файл не загружен.');
        }

        const imagePath = `/uploads/${req.file.filename}`;
        const newImage = new Image({ title, description, imagePath });
        await newImage.save();

        res.redirect('/admin/images');
    } catch (error) {
        console.error('Ошибка при добавлении изображения:', error);
        res.status(500).send('Ошибка сервера');
    }
});

router.post('/images/delete/:id', checkRole('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findById(id);

        if (!image) {
            return res.status(404).send('Изображение не найдено');
        }

        const filePath = path.join(__dirname, '../public', image.imagePath);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await Image.findByIdAndDelete(id);

        res.redirect('/admin/images');
    } catch (error) {
        console.error('Ошибка при удалении изображения:', error);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;
