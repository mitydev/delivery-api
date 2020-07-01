import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import { User } from '../entities/User';
import jwtConfig from '../config/jwt';

class AuthController {
  async login(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;

    if (!(email && password)) {
      response.status(400).json({ error: 'Fill in all fields' });
      return;
    }

    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOneOrFail({ where: { email } });

      if (!user.checkIfPasswordIsValid(password)) {
        response.status(401).json({ error: 'Incorrect email or password' });
        return;
      } else {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          jwtConfig.jwtSecret,
          { expiresIn: '1h' }
        );

        delete user.password;

        response.status(200).json({ user: user, token: token });
      }
    } catch (error) {
      response
        .status(500)
        .json({ error: 'Internal server error. Please try again' });
    }
  }
}

export default new AuthController();
