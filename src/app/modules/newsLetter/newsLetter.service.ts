import AppError from '../../errors/appError';
import { INewsLetter } from './newsLetter.interface';
import { NewsLetter } from './newsLetter.model';

const createNewsLetter = async (payload: INewsLetter) => {
  const createdNewsLetter = await NewsLetter.create(payload);
  return createdNewsLetter;
};

const getAllNewsLetters = async () => {
  const newsLetters = await NewsLetter.find();
  if (newsLetters.length === 0) {
    throw new AppError(404, 'No newsLetter record were found in the database');
  }
  return newsLetters;
};

export const newsLetterService = {
  createNewsLetter,
  getAllNewsLetters,
};
