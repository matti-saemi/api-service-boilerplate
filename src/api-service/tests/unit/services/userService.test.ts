import { UserService } from '../../../src/services/userService';
import UserModel from '../../../src/models/user';
import { UserResponse } from '../../../src/types/user';
import sinon from 'sinon';

describe('UserService', () => {
  let findOneStub: sinon.SinonStub;

  beforeEach(() => {
    findOneStub = sinon.stub(UserModel, 'findOne');
  });

  afterEach(() => {
    findOneStub.restore();
    sinon.restore();
  });

  it('should return user data when user is found', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      created_at: '1234567890',
      updated_at: '1234567890',
      exec: sinon.stub().resolves({
        id: 1,
        email: 'test@example.com',
        created_at: '1234567890',
        updated_at: '1234567890',
      }),
    };

    findOneStub.returns(mockUser);

    const result = await UserService.getUser(1);

    expect(result).toEqual({
      id: 1,
      email: 'test@example.com',
      createdAt: new Date(parseInt(mockUser.created_at)).toISOString(),
      updatedAt: new Date(parseInt(mockUser.updated_at)).toISOString(),
    } as UserResponse);
  });

  it('should return user data without timestamps when created_at and updated_at are not present', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      exec: sinon.stub().resolves({
        id: 1,
        email: 'test@example.com',
      }),
    };

    findOneStub.returns(mockUser);

    const result = await UserService.getUser(1);

    expect(result).toEqual({
      id: 1,
      email: 'test@example.com',
    } as UserResponse);
  });

  it('should throw an error when user is not found', async () => {
    const execStub = sinon.stub().resolves(null);
    findOneStub.returns({ exec: execStub } as any);

    await expect(UserService.getUser(999)).rejects.toEqual({
      status: 404,
      message: 'User not found',
    });
  });
});
