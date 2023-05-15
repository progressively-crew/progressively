import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import {
  UserChangeFullnameDTO,
  UserRetrieveDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  ChangePasswordDTO,
  PlanSchema,
  PlanCreateDTO,
} from './users.dto';
import { UsersService } from './users.service';
import { MailService } from '../mail/mail.service';
import {
  ChangeFullnameSchema,
  ChangePasswordSchema,
  ResetPasswordSchema,
} from '../auth/types';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { sleep } from '../shared/utils/sleep';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly mailService: MailService,
  ) {}

  @ApiBearerAuth()
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req): Promise<UserRetrieveDTO> {
    const user = await this.userService.findByUuid(req.user.uuid);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return {
      email: user.email,
      fullname: user.fullname,
      uuid: user.uuid,
      trialEnd: user.trialEnd,
    };
  }

  @ApiBearerAuth()
  @Get('/billing')
  @UseGuards(JwtAuthGuard)
  async getBilling(@Request() req) {
    const userId = req.user.uuid;
    const plans = await this.userService.getBillingInfo(userId);
    const user = await this.userService.findByUuid(userId);
    const hitsForMonth = await this.userService.getHitsForMonth(
      userId,
      new Date(),
    );

    const activePlan = plans.shift();

    let remainingTrialingDays = 0;

    // trialEnd is only falsy when self-hosted. Should not happen on SaaS
    if (user.trialEnd) {
      remainingTrialingDays = user.trialEnd.getDate() - new Date().getDate();
    }

    return { plans, activePlan, remainingTrialingDays, hitsForMonth };
  }

  @ApiBearerAuth()
  @Post('/billing')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(PlanSchema))
  addBillingPlan(@Request() req, @Body() planDto: PlanCreateDTO) {
    if (process.env.IS_SAAS !== 'true') return {};

    return this.userService.addPlan(req.user.uuid, planDto.evalCount);
  }

  @ApiBearerAuth()
  @Put('/me')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(ChangeFullnameSchema))
  async editFullname(
    @Request() req,
    @Body() userDto: UserChangeFullnameDTO,
  ): Promise<UserRetrieveDTO> {
    const userId = req.user.uuid;
    const updatedUser = await this.userService.changeFullname(
      userId,
      userDto.fullname,
    );

    return {
      email: updatedUser.email,
      fullname: updatedUser.fullname,
      uuid: updatedUser.uuid,
    };
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDTO) {
    // Mitigate brute force
    await sleep();

    if (!body.email) {
      throw new BadRequestException('Email is missing');
    }

    const user = await this.userService.findByEmail(body.email);

    if (user) {
      const rawToken = await this.userService.createResetPasswordTokenForUser(
        user.uuid,
      );

      await this.mailService.sendResetPasswordMail(
        user.fullname,
        user.email,
        rawToken,
      );
    }

    return { success: true };
  }

  @Post('/reset-password')
  @UsePipes(new ValidationPipe(ResetPasswordSchema))
  async resetPassword(@Body() body: ResetPasswordDTO) {
    // Mitigate brute force
    await sleep();

    const hashedPassword = await this.userService.checkPasswordToken(
      body.token,
    );

    if (!hashedPassword) {
      throw new BadRequestException('Invalid token');
    }

    await this.userService.resetUserPassword(
      hashedPassword.userUuid,
      body.password,
    );

    return { success: true };
  }

  @ApiBearerAuth()
  @Post('/change-password')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(ChangePasswordSchema))
  async changePassword(@Body() body: ChangePasswordDTO, @Request() req) {
    if (body.confirmationPassword !== body.password) {
      throw new BadRequestException();
    }

    await this.userService.changeUserPassword(body.password, req.user.uuid);

    return { success: true };
  }
}
