"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieRouter = void 0;
const express_1 = __importDefault(require("express"));
const movie_controller_1 = require("./movie.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(), movie_controller_1.MovieController.createMovie);
router.get('/:id', movie_controller_1.MovieController.getSingleMovie);
router.patch('/:id', movie_controller_1.MovieController.updateMovie);
router.delete('/:id', movie_controller_1.MovieController.deleteMovie);
router.get('/', movie_controller_1.MovieController.getAllMovies);
exports.MovieRouter = router;
