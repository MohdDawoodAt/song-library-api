import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    // console.log('auth login: looking for admin');
    const admin = await this.adminService.findAdmin(username);
    // console.log(admin);
    const isAdmin = await this.comparePasswords({
      plainPassword: password,
      hashedPassword: admin[0].passwordHash,
    });

    if (!isAdmin) {
      throw new UnauthorizedException();
    } else {
      const payload = { username: username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }

  private async comparePasswords({
    plainPassword,
    hashedPassword,
  }): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword); // Returns true if they match
  }
}
