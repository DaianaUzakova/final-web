const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: [
                /^\S+@\S+\.\S+$/,
                'Invalid email format',
            ],
        },
        password: { type: String, required: [true, 'Password is required'] },
        firstName: { type: String, required: [true, 'First name is required'] },
        lastName: { type: String, required: [true, 'Last name is required'] },
        age: { type: Number, required: [true, 'Age is required'], min: 0 },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: [true, 'Gender is required'],
        },
        role: { type: String, enum: ['admin', 'editor'], default: 'editor' },
        is2FAEnabled: { type: Boolean, default: false },
        twoFactorSecret: { type: String },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        console.log(`Hashing password for user: ${this.username}`);
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log(`Password hashed successfully for user: ${this.username}`);
        next();
    } catch (error) {
        console.error('Error while hashing password:', error);
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        console.log(`Comparing passwords for user: ${this.username}`);
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        console.log(`Password comparison result for user ${this.username}: ${isMatch}`);
        return isMatch;
    } catch (error) {
        console.error('Error during password comparison:', error);
        throw error;
    }
};

module.exports = mongoose.model('User', userSchema);
