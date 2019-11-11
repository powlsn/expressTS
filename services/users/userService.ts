import { User } from '../../storage/User';

export const getUserService: any = async (id: number) => {
  return await User.query().findById(id);
};

export const getUsersService: any = async () => {
  return await User.query();
};

export const createUserService: any = async (user: any) => {
  return await User.query().insert(user);
};

export const updateUserService: any = async (userID: number, user: any) => {
  return await User.query()
    .findById(userID)
    .patch(user);
};

export const deleteUserService: any = async (id: number) => {
  return await User.query()
    .findById(id)
    .delete();
};
