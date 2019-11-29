import { UserService } from "../../user-service";
import { User } from "../../entity/User.entity";


export class UserFactory {

  constructor(private readonly userService: UserService) {}

  // for later use with factory-ts
  json(params: object = {}) {
    return Object.assign({
      firstname: 'Max',
      lastname: 'Muster',
    }, params
    )
  }

  build(params: object = {}): User {
    return Object.assign(new User(), this.json(params));
  }  

  create(params: Object = {}): Promise<User> {
    const user = this.build(params);
    return this.userService.createUser(user);
  }
}
