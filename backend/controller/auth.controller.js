const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // hash password
        const hashPassword = await userModel.hashPassword(password);

        // create user
        const user = new userModel({ name, email, password: hashPassword });
        await user.save();

        // generate token
        const token = user.generateAuthToken();

        // exclude password from response
        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(201).json({ user: userWithoutPassword, token });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Validate password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = user.generateAuthToken();

        res.cookie('token', token) // added without using headers it will help to show the logged in user

        res.status(200).json({ user, token });
    } catch (error) {
        next(error);
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Exclude password from response
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
        console.error("Get User By ID Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const updates = { ...req.body };

    try {
        // if password is being updated, hash it
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const user = await userModel.findByIdAndUpdate(id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Exclude password from response
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
        console.error("Update User Profile Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getLoggedInUser = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ user });
    } catch (error) {
        console.error("Get Logged In User Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    register,
    login,
    logout,
    getUserById,
    getLoggedInUser,
    updateUserProfile
};