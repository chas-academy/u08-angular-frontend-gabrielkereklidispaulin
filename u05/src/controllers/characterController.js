const Character = require("../models/Character");

// Get all characters
exports.getCharacters = async (req, res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get specific character by ID
exports.getCharacterById = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) return res.status(404).json({ message: "Character not found" });
        res.json(character);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Create new character
exports.createCharacter = async (req, res) => {
    const { name, weight_class, movement_speed, original_game_series } = req.body;
    if (!name || !weight_class || !movement_speed || !original_game_series) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const newCharacter = new Character(req.body);
        await newCharacter.save();
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(500).json({ message: "Failed to create character", error });
    }
};

// Update character
exports.updateCharacter = async (req, res) => {
    try {
        const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCharacter) return res.status(404).json({ message: "Character not found" });
        res.json(updatedCharacter);
    } catch (error) {
        res.status(500).json({ message: "Failed to update character", error });
    }
};

// Delete character
exports.deleteCharacter = async (req, res) => {
    try {
        const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
        if (!deletedCharacter) return res.status(404).json({ message: "Character not found" });
        res.json({ message: "Character deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
