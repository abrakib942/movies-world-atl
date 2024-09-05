"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_model_1 = require("./user.model");
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const movie_model_1 = require("../movie/movie.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const rateMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        const { userId } = verifiedToken;
        const { id } = req.params; // movie ID
        const { rating } = req.body;
        if (!userId) {
            throw new ApiError_1.default(400, 'You are not authorized. Please login.');
        }
        const movie = yield movie_model_1.Movie.findById(id);
        if (!movie) {
            throw new ApiError_1.default(400, 'Movie not found.');
        }
        // Check if the user already rated this movie
        const existingRating = yield user_model_1.User.findOne({
            _id: userId,
            'ratedMovies.movie': id,
        });
        if (existingRating) {
            // Update the user's rating
            yield user_model_1.User.updateOne({ _id: userId, 'ratedMovies.movie': id }, { $set: { 'ratedMovies.$.rating': rating } });
            // Update the movie's rating
            yield movie_model_1.Movie.updateOne({ _id: id, 'ratedUsers.user': userId }, { $set: { 'ratedUsers.$.rating': rating } });
        }
        else {
            // Add the rating to both User and Movie if not rated yet
            yield user_model_1.User.findByIdAndUpdate(userId, { $push: { ratedMovies: { movie: id, rating } } }, { new: true });
            yield movie_model_1.Movie.findByIdAndUpdate(id, { $push: { ratedUsers: { user: userId, rating } } }, { new: true });
        }
        res.status(200).json({
            success: true,
            message: 'Movie rated successfully!',
        });
    }
    catch (error) {
        next(error);
    }
});
const addToWatchList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        const { userId } = verifiedToken;
        const { id } = req.params;
        const movie = yield movie_model_1.Movie.findById(id);
        if (!movie) {
            throw new ApiError_1.default(400, 'movie not found');
        }
        if (!userId) {
            throw new ApiError_1.default(400, 'You are not authorized. Please login and access the token');
        }
        const result = yield user_model_1.User.findByIdAndUpdate(userId, { $addToSet: { watchList: id } }, // $addToSet ensures no duplicates
        { new: true });
        res.status(200).json({
            success: true,
            message: 'Added to Watch-List',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const removeFromWatchList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        const { userId } = verifiedToken;
        const { id } = req.params;
        const movie = yield movie_model_1.Movie.findById(id);
        if (!movie) {
            throw new ApiError_1.default(400, 'movie not found');
        }
        const result = yield user_model_1.User.findByIdAndUpdate(userId, { $pull: { watchList: id } }, // $pull removes the movie from the array
        { new: true });
        res.status(200).json({
            success: true,
            message: 'remove from watch-list',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, ['searchTerm', 'name', 'email']);
        const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
        const paginationOptions = (0, pick_1.default)(req.query, [
            'page',
            'limit',
            'sortBy',
            'sortOrder',
        ]);
        const andConditions = [];
        const usersSearchableFields = ['name', 'email'];
        if (searchTerm) {
            andConditions.push({
                $or: usersSearchableFields.map(field => ({
                    [field]: { $regex: searchTerm, $options: 'i' }, // options i - case insensitive
                })),
            });
        }
        if (Object.keys(filtersData).length) {
            andConditions.push({
                $and: Object.entries(filtersData).map(([field, value]) => ({
                    [field]: { $regex: value, $options: 'i' },
                })),
            });
        }
        const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
        const sortConditions = {};
        if (sortBy && sortOrder) {
            sortConditions[sortBy] = sortOrder;
        }
        const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
        const result = yield user_model_1.User.find(whereCondition)
            .populate('addedMovies')
            .populate('watchList')
            .populate('ratedMovies')
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        const total = yield user_model_1.User.countDocuments(whereCondition);
        res.status(200).json({
            success: true,
            message: 'users retrieved successfully!',
            data: {
                meta: {
                    page,
                    limit,
                    total,
                },
                data: result,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield user_model_1.User.findById(id)
            .populate('addedMovies')
            .populate('watchList')
            .populate({
            path: 'ratedMovies.movie',
            model: 'Movie',
        });
        res.status(200).json({
            success: true,
            message: 'user retrieved successfully!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, updatedData, {
            new: true,
            runValidators: true,
        }).populate('movies');
        res.status(200).json({
            success: true,
            message: 'user updated successfully!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield user_model_1.User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'user deleted successfully!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.UserController = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addToWatchList,
    removeFromWatchList,
    rateMovie,
};
