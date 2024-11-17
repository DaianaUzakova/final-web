const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    {
        title: { type: String, required: true }, 
        description: { type: String, required: true }, 
        imagePath: { 
            type: String, 
            required: true, 
            validate: {
                validator: function(value) {
                    return typeof value === 'string' && value.trim().length > 0;
                },
                message: 'Путь к изображению должен быть строкой.',
            },
        }, 
    },
    {
        timestamps: true, 
    }
);

module.exports = mongoose.model('Image', imageSchema);
