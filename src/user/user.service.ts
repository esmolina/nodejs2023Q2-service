import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { getUserWithoutPassword } from '../helpers/getUserWithoutPassword';

import { config } from 'dotenv';

const env = config();
const SALT_CRYPT = Number(env.parsed.CRYPT_SALT) || 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async validateUserPassword(authDto: CreateUserDto) {
    const user = await this.getUserWithLogin(authDto.login);
    if (!user) return undefined;
    const enteredPasswordHash = await this.getHash(authDto.password);
    return enteredPasswordHash === user.password;
  }

  private async getHash(secretInfo: string) {
    const userSalt = await bcrypt.genSalt(SALT_CRYPT);
    return await bcrypt.hash(secretInfo, userSalt);
  }

  async getUserWithLogin(userName: string) {
    return await this.userRepository.findOne({
      where: { login: userName },
    });
  }

  async checkLoginIsAvailable(createdUserLogin: string): Promise<boolean> {
    const userWitchSuchName = this.userRepository.findOne({
      where: { login: createdUserLogin },
    });
    return !!userWitchSuchName;
  }

  async signUp(newUserDto: CreateUserDto) {
    const { password } = newUserDto;

    const newUser = this.userRepository.create(newUserDto);
    newUser.version = 1;
    newUser.createdAt = Date.now();
    newUser.updatedAt = Date.now();
    newUser.password = await this.getHash(password);
    const savedUser = await this.userRepository.save(newUser);
    return getUserWithoutPassword(savedUser);
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    newUser.version = 1;
    newUser.createdAt = Date.now();
    newUser.updatedAt = Date.now();
    const savedUser = await this.userRepository.save(newUser);
    return getUserWithoutPassword(savedUser);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => getUserWithoutPassword(user));
  }

  async findOne(id: string) {
    const user = getUserWithoutPassword(
      await this.userRepository.findOne({ where: { id: id } }),
    );
    return user;
  }

  async update(id: string, updateUserPasswordDto: UpdatePasswordDto) {
    const updatedUser = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!updatedUser) return undefined;
    if (
      !updateUserPasswordDto.newPassword ||
      !updateUserPasswordDto.oldPassword
    )
      return getUserWithoutPassword(updatedUser);

    updatedUser.password = updateUserPasswordDto.newPassword;
    updatedUser.version = updatedUser.version + 1;
    updatedUser.createdAt = Number(updatedUser.createdAt);
    updatedUser.updatedAt = Date.now();

    return getUserWithoutPassword(await this.userRepository.save(updatedUser));
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) return undefined;
    return `The user with ID #${id} was successfully deleted`;
  }

  async getUserWithPassword(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }
}
