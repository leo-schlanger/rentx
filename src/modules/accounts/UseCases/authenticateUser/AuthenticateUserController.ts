import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const authenticated = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json({
      token: authenticated.token,
      user: {
        name: authenticated.user.name,
        email: authenticated.user.email,
      },
      refresh_token: authenticated.refresh_token,
    });
  }
}

export { AuthenticateUserController };
