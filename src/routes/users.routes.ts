import { Router } from 'express';

import multer from 'multer';

import uploadConfig from '../config/upload';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

//usersRouter.use(ensureAuthenticated);

// Rota POST
usersRouter.post('/', async (request, response) => {

  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);

  } catch (err) {
    return response.status(400).json({ Error: (err as Error).message });
  }
});

// Rota PATCH
usersRouter.patch('/avatar',ensureAuthenticated,
upload.single('avatar'),
async (request, response) => {

  try {
     // console.log(request.file);


  const updateUserAvatar = new UpdateUserAvatarService();
  //const user

  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFilename: request.file.filename,
 });

 delete user.password;

  return response.json(user);

  }catch(err){
    response.status(400).json({error: (err as Error).message})
  }

  }
);

export default usersRouter;
