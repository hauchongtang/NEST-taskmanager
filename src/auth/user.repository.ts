import { EntityRepository, Repository } from "typeorm";
import { authCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: authCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.password = password;

    await user.save();
  }
}