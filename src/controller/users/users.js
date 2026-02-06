const userModule = require('../../model/userModuel');
const mongodbConnection = require('../../connectionDB/mongodbConnection');
// Create a new user
exports.createUser = async (req, res) => {
    try {
        await mongodbConnection();
        const insertUsers = await userModule.insertMany(req.body);
        res.status(200).json({ message: 'User created sucessfully', data: insertUsers })
    } catch (err) {
        console.log('Error creating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get all users
exports.getAllusers = async (req, res) => {
    try {
        await mongodbConnection();
        const getUsers = await userModule.find().sort({ createdAt: -1 });
        res.status(200).json({ message: 'Users fetched sucessfully', data: getUsers })
    } catch (err) {
        console.log(`Error fetching users: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get Update User by ID
exports.updateUser = async (req, res) => {
    try {
        await mongodbConnection();
        const userId = req.params.id;
        const updateData = req.body;
        const updateuser = await userModule.findByIdAndUpdate(userId, updateData);
        res.status(200).json({ message: 'User updated successfully', data: updateuser });
    } catch (err) {
        console.log(`Error updating user: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}
//Complete-Delete User by ID
exports.deleteuser = async (req, res) => {
    try {
        await mongodbConnection();
        const userId = req.params.id;
        const deleteUser = await userModule.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully', data: deleteUser });
    } catch (err) {
        console.log(`Error deleting user: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//User Inactive-Active state
exports.userInactive = async (req, res) => {
    try {
        await mongodbConnection();
        const userId = req.params.id;
        const inactiveUser = await userModule.findByIdAndUpdate(userId, req.body)
        res.status(200).json({ message: 'User set to inactive successfully', data: inactiveUser });
    } catch (err) {
        console.log(`Error setting user inactive: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//User isDelete state
exports.userIsDelete = async (req, res) => {
    try {
        await mongodbConnection();
        const userId = req.params.id;
        const inactiveUser = await userModule.findByIdAndUpdate(userId, req.body)
        res.status(200).json({ message: 'User set to isDelete successfully', data: inactiveUser });
    } catch (err) {
        console.log(`Error setting user isDelete: ${err}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

