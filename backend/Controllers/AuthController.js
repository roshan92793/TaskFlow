const bcrypt = require('bcrypt');
const UserModel = require('../Models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await UserModel.findOne({email});
        if (user) {
            return res.status(400)
            .json({ message: 'User already exists', success: false });
        }
        const userModel = new UserModel({ username, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
        .json({ message: 'User registered successfully', success: true });
    } catch (error) {
        res.status(500)
        .json({ message: 'Internal server error', success: false });
    }   
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(400)
            .json({ message: 'Invalid email or password', success: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403)
            .json({ message: 'Invalid email or password', success: false });
        }
        
        const jwtToken = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200)
        .json({ message: 'Login successful', success: true, token: jwtToken, email, username: user.username });
    } catch (error) {
        res.status(500)
        .json({ message: 'Internal server error', success: false });    
    }
};

module.exports = {
    signup,
    login
};