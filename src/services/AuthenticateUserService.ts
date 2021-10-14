import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
//import authConfig from '../config/auth';
//import AppError from '../erros/AppError';

interface RequestDTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Email/Password does not match.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Email/Password does not match.');
    }

    //const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, 'ae6706a21c86cc7ab1fa6e6e44c1a21c', {
     subject: user.id,
     expiresIn: '1d'
   });

    return {
      user,
      token,
    };
  }
}
