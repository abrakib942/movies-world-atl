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
exports.MovieController = void 0;
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const movie_model_1 = require("./movie.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const user_model_1 = require("../user/user.model");
const createMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        const { userId } = verifiedToken;
        const result = (yield movie_model_1.Movie.create(Object.assign({ addedBy: userId }, req.body))).populate('addedBy');
        yield user_model_1.User.findByIdAndUpdate(userId, {
            $push: { addedMovies: (yield result)._id },
        });
        res.status(200).json({
            success: true,
            message: 'movie created successfully!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllMovies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, ['searchTerm', 'genre']);
        const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
        const paginationOptions = (0, pick_1.default)(req.query, [
            'page',
            'limit',
            'sortBy',
            'sortOrder',
        ]);
        const andConditions = [];
        const moviesSearchableFields = ['title', 'genre'];
        if (searchTerm) {
            andConditions.push({
                $or: moviesSearchableFields.map(field => ({
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
        const result = yield movie_model_1.Movie.find(whereCondition)
            .populate('addedBy')
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        const total = yield movie_model_1.Movie.countDocuments(whereCondition);
        res.status(200).json({
            success: true,
            message: 'movies retrieved successfully!',
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
const getSingleMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield movie_model_1.Movie.findById(id)
            .populate('addedBy')
            .populate('addedBy', 'name')
            .populate({
            path: 'ratedUsers.user',
            model: 'User',
            select: 'name email',
        });
        res.status(200).json({
            success: true,
            message: 'movie retrieved successfully!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const result = yield movie_model_1.Movie.findOneAndUpdate({ _id: id }, updatedData, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: 'movie updated successfully!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield movie_model_1.Movie.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'movie deleted successfully!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.MovieController = {
    createMovie,
    getAllMovies,
    getSingleMovie,
    updateMovie,
    deleteMovie,
};
