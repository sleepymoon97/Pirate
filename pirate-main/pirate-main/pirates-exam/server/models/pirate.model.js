const mongoose = require('mongoose');
 
const PirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    chests: {
        type: Number,
        required: [true, 'Chests is required']
    },
    phrase: {
        type: String,
        required: [true, 'Phrase is required']
    },
    position: {
        type: String,
        enum: ['Captain', 'First Mate', 'Quarter Master', 'Boatswain', 'Powder Monkey'],
        required: [true, 'Position is required']
    },
    pegLeg: {
        type: Boolean
    },
    eyePatch: {
        type: Boolean
    },
    hookHand: {
        type: Boolean
    },
}, {timestamps: true} );
 
const Pirate = mongoose.model('Pirate', PirateSchema);
 
module.exports = Pirate;
