import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import AuthenticationService from './auth.service';
import AuthenticationController from './auth.controller';
import UserEntity from '../../entities/user/user.entity';
import MemoryDatabaseProviderModule from '../../providers/db/memory/provider.module';
import LoginDto from './dtos/login.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import RegisterDto from './dtos/register.dto';
import { Connection } from 'typeorm';

describe('Authentication Controller', () => {
	let controller: AuthenticationController;
	let service: AuthenticationService;
	let connection: Connection;

	const login_dto: LoginDto = {
		email: 'email@example.com',
		password: 'password',
	};

	const register_dto: RegisterDto = {
		name: 'Test User',
		email: 'email@example.com',
		password: 'password',
	};

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				MemoryDatabaseProviderModule,
				TypeOrmModule.forFeature([UserEntity]),
				JwtModule.register({
					secret: Math.random().toString(36),
				}),
			],
			controllers: [AuthenticationController],
			providers: [AuthenticationService],
		}).compile();

		controller = module.get<AuthenticationController>(AuthenticationController);

		service = module.get<AuthenticationService>(AuthenticationService);

		connection = module.get<Connection>(Connection);
		await connection.close();
	});

	beforeEach(async () => {
		await connection.connect();
	});

	afterEach(async () => {
		await connection.close();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('returns "Unauthorized" for wrong e-mail on login', async () => {
		await service.createClient({
			...register_dto,
			email: 'wrong@example.com',
		});

		await expect(controller.login(login_dto)).rejects.toThrowError(UnauthorizedException);
	});

	test('returns "Unauthorized" for wrong password on login', async () => {
		await service.createClient({
			...register_dto,
			password: 'wrong',
		});

		await expect(controller.login(login_dto)).rejects.toThrowError(UnauthorizedException);
	});

	test("returns the authorized user and it's token on login", async () => {
		await service.createClient(register_dto);

		expect(await controller.login(login_dto)).toEqual(
			expect.objectContaining({
				user: expect.any(UserEntity),
				token: expect.any(String),
			}),
		);
	});

	test('fails if e-mail already exists on register', async () => {
		await service.createClient(register_dto);

		await expect(controller.register(register_dto)).rejects.toThrowError(BadRequestException);
	});

	test('creates a new user', async () => {
		await expect(controller.register(register_dto)).resolves.toEqual(expect.any(UserEntity));
	});
});
