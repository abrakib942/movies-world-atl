import { model, Schema, Types } from 'mongoose';

type IMovie = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  creators: string[];
  trailerUrl: string;
  posterUrl: string;
  episodes: number;
  releaseDate: Date;
  genre: string;
  cast: [
    {
      name: string;
      character: string;
      episodes: number;
      year: number;
    }
  ];
  ratedUsers: Types.ObjectId[];
  isUpcoming: boolean;
  addedBy: Types.ObjectId;
};

const movieSchema = new Schema<IMovie>({
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
  ratedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isUpcoming: {
    type: Boolean,
    default: false,
  },
  addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Movie = model<IMovie>('Movie', movieSchema);
