const mongoose = require('mongoose');

const RepairShopSchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true
    },
    nexPageToken: {
        type: String,
        
    }
})

//creating database table
const RepairShop = mongoose.model('RepairShops', RepairShopSchema)

module.exports = RepairShop;