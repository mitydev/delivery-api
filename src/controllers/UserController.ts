import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';

import { User } from '../entities/User';

class UserController {
  async create(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;

    if (!(email && password)) {
      response.status(400).json({ error: 'Fill in all fields' });
      return;
    }

    try {
      const user = new User();
      user.email = email;
      user.password = password;

      const errors = await validate(user);
      if (errors.length > 0) {
        response.status(401).json({ error: errors });
        return;
      }

      // Hash Password
      user.hashPassword();

      // Save user on database
      const userRepository = getRepository(User);
      await userRepository.save(user);

      response.status(201).json({ message: 'User created with success' });
    } catch (error) {
      response.status(409).json({ error: 'Email already in use' });
    }
  }
}

export default new UserController();
