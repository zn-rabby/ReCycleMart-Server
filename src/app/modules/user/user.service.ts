import User from './user.model';

const getSingleUser = async (id: string) => {
  const res = await User.findById(id);

  return res;
};

export const UserServices = {
  getSingleUser,
};
