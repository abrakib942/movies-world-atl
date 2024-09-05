import { NextFunction, Request, Response } from 'express';
import { User } from './user.model';
import pick from '../../../shared/pick';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Movie } from '../movie/movie.model';
import ApiError from '../../../errors/ApiError';

const rateMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization as string;
    const verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );
    const { userId } = verifiedToken;
    const { id } = req.params; // movie ID
    const { rating } = req.body;

    if (!userId) {
      throw new ApiError(400, 'You are not authorized. Please login.');
    }

    const movie = await Movie.findById(id);
    if (!movie) {
      throw new ApiError(400, 'Movie not found.');
    }

    // Check if the user already rated this movie
    const existingRating = await User.findOne({
      _id: userId,
      'ratedMovies.movie': id,
    });

    if (existingRating) {
      // Update the user's rating
      await User.updateOne(
        { _id: userId, 'ratedMovies.movie': id },
        { $set: { 'ratedMovies.$.rating': rating } }
      );

      // Update the movie's rating
      await Movie.updateOne(
        { _id: id, 'ratedUsers.user': userId },
        { $set: { 'ratedUsers.$.rating': rating } }
      );
    } else {
      // Add the rating to both User and Movie if not rated yet
      await User.findByIdAndUpdate(
        userId,
        { $push: { ratedMovies: { movie: id, rating } } },
        { new: true }
      );

      await Movie.findByIdAndUpdate(
        id,
        { $push: { ratedUsers: { user: userId, rating } } },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Movie rated successfully!',
    });
  } catch (error) {
    next(error);
  }
};

const addToWatchList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization as string;
    const verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );
    const { userId } = verifiedToken;

    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new ApiError(400, 'movie not found');
    }

    if (!userId) {
      throw new ApiError(
        400,
        'You are not authorized. Please login and access the token'
      );
    }

    const result = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { watchList: id } }, // $addToSet ensures no duplicates
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Added to Watch-List',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const removeFromWatchList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization as string;
    const verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );
    const { userId } = verifiedToken;

    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new ApiError(400, 'movie not found');
    }

    const result = await User.findByIdAndUpdate(
      userId,
      { $pull: { watchList: id } }, // $pull removes the movie from the array
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'remove from watch-list',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, ['searchTerm', 'name', 'email']);

    const { searchTerm, ...filtersData } = filters;

    const paginationOptions: Partial<IPaginationOptions> = pick(req.query, [
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

    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder as SortOrder;
    }

    const whereCondition =
      andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await User.find(whereCondition)
      .populate('addedMovies')
      .populate('watchList')
      .populate('ratedMovies')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(whereCondition);

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
  } catch (error) {
    next(error);
  }
};
const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await User.findById(id)
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
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await User.findOneAndUpdate({ _id: id }, updatedData, {
      new: true,
      runValidators: true,
    }).populate('movies');

    res.status(200).json({
      success: true,
      message: 'user updated successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'user deleted successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addToWatchList,
  removeFromWatchList,
  rateMovie,
};
