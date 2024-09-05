"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    creators: [
        {
            type: String,
            required: true,
        },
    ],
    trailerUrl: {
        type: String,
        required: true,
    },
    posterUrl: {
        type: String,
        required: true,
    },
    episodes: {
        type: Number,
    },
    genre: {
        type: String,
    },
    cast: [
        {
            name: { type: String },
            character: { type: String },
            episodes: { type: Number },
            year: { type: Number },
        },
    ],
    ratedUsers: [
        {
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number, required: true },
        },
    ],
    isUpcoming: {
        type: Boolean,
        default: false,
    },
    addedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
});
exports.Movie = (0, mongoose_1.model)('Movie', movieSchema);
