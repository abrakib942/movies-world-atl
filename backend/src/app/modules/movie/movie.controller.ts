import { NextFunction, Request, Response } from 'express';

import pick from '../../../shared/pick';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { Movie } from './movie.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { User } from '../user/user.model';

const createMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization as string;

    const verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { userId } = verifiedToken;

    const result = (
      await Movie.create({ addedBy: userId, ...req.body })
    ).populate('addedBy');

    await User.findByIdAndUpdate(userId, {
      $push: { addedMovies: (await result)._id },
    });

    res.status(200).json({
      success: true,
      message: 'movie created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = pick(req.query, ['searchTerm', 'genre']);

    const { searchTerm, ...filtersData } = filters;

    const paginationOptions: Partial<IPaginationOptions> = pick(req.query, [
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

    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder as SortOrder;
    }

    const whereCondition =
      andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Movie.find(whereCondition)
      .populate('addedBy')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments(whereCondition);

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
  } catch (error) {
    next(error);
  }
};
const getSingleMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await Movie.findById(id)
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
  } catch (error) {
    next(error);
  }
};
const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await Movie.findOneAndUpdate({ _id: id }, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'movie updated successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await Movie.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'movie deleted successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const MovieController = {
  createMovie,
  getAllMovies,
  getSingleMovie,
  updateMovie,
  deleteMovie,
};
