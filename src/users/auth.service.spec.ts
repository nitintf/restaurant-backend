import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    // create a fake copy of user service
    fakeUserService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as UserEntity),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUserService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with hashed password', async () => {
    const user = await service.signup('test@test.com', 'testpassword');

    expect(user.password).not.toEqual('testpassword');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined;
    expect(hash).toBeDefined;
  });

  // it('throws an error if user signs up with email that is in use', async (done) => {
  //   fakeUserService.find = () =>
  //     Promise.resolve([{ id: 1, email: 'a', password: 'nit' } as UserEntity]);

  //   try {
  //     await service.signup('test@test.com', 'testpassword');
  //   } catch (error) {
  //     done();
  //   }
  // });

  it('throws if signin is called with an unused email', async (done) => {
    try {
      await service.signin('teskldvb.snkdvst@test.com', 'test');
    } catch (e) {
      done();
      return;
    }
  });

  it('throws if an invalid password is provided', async (done) => {
    fakeUserService.find = () =>
      Promise.resolve([
        { email: 'test@test.com', password: 'test' } as UserEntity,
      ]);

    try {
      await service.signin('test@test.com', 'test123');
    } catch (err) {
      done();
    }
  });

  it('returns a user if correct password is provided', async () => {
    fakeUserService.find = () =>
      Promise.resolve([
        { email: 'test@test.com', password: 'test' } as UserEntity,
      ]);

    const user = await service.signin('test@test.com', 'asnvlm');

    expect(user).toBeDefined();
  });
});
