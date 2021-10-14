import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

// Rota POST
sessionsRouter.post('/', async (request, response) => {

  try{
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user } = await authenticateUser.execute({ email, password });

    delete user.password;

    //return response.json({ user, token });

    return response.json({ user });
  }catch(err){
    return response.status(400).json({error: (err as Error).message})
  }

});

export default sessionsRouter;
