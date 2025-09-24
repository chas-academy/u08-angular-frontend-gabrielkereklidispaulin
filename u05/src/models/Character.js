const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    weight_class: { type: String, enum: ["light", "medium", "heavy"], required: true },
    movement_speed: { type: Number, required: true }, 
    original_game_series: { type: String, required: true },
    icon: { type: String },
    image: { type: String },
    model: { type: String },
    tier_ranking: { type: String, enum: ["S", "A", "B", "C", "D"], required: true },
    notable_players: { type: [String], default: [] }
});

module.exports = mongoose.model("Character", CharacterSchema);
