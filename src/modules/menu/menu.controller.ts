import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import axiosRequest from 'src/utils/services/apiClient/apiClient';
import { RequestMethods } from 'src/utils/services/apiClient/apiClient.dto';
import { CreateMenuDto, Dish, RedisDish } from './dto/menu.dto';
import { Roles } from '../auth/roles.decorator';
import { ROLES } from 'src/utils/constants';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  @ApiOperation({ summary: 'Get active menu' })
  @ApiResponse({ status: 200, type: [Dish] })
  @Get()
  async getMenu() {
    const result = await axiosRequest({
      url: '/menu',
      method: RequestMethods.GET,
    });

    if (result.error) {
      throw new InternalServerErrorException(result.error.data.message);
    }

    return result.response;
  }

  @ApiOperation({ summary: 'Get all dishes' })
  @ApiResponse({ status: 200, type: [Dish] })
  @Roles(ROLES.ADMIN, ROLES.CHEF)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/all-dishes')
  async getDish() {
    const result = await axiosRequest({
      url: '/menu/all-dishes',
      method: RequestMethods.GET,
    });

    if (result.error) {
      throw new HttpException(
        result.error.data.message,
        result.error.status ?? 500,
      );
    }

    return result.response;
  }

  @ApiOperation({ summary: 'Get dishe by id' })
  @ApiResponse({ status: 200, type: [RedisDish] })
  @Get('/dish/:id')
  async getDishById(@Param('id') id: number) {
    const result = await axiosRequest({
      url: `/menu/dish/${id}`,
      method: RequestMethods.GET,
    });

    if (result.error) {
      throw new HttpException(
        result.error.data.message,
        result.error.status ?? 500,
      );
    }

    return result.response;
  }

  @ApiOperation({ summary: 'Create new menu' })
  @ApiResponse({ status: 200, type: String })
  @Roles(ROLES.ADMIN, ROLES.CHEF)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/create-new')
  async createMenu(@Body() dto: CreateMenuDto) {
    const result = await axiosRequest({
      url: `/menu/create-new`,
      method: RequestMethods.POST,
      data: dto,
    });

    if (result.error) {
      throw new HttpException(
        result.error.data.message,
        result.error.status ?? 500,
      );
    }

    return result.response;
  }

  @ApiOperation({ summary: 'Set active menu by date' })
  @ApiResponse({ status: 200 })
  @Roles(ROLES.ADMIN, ROLES.CHEF)
  @UseGuards(AuthGuard, RolesGuard)
  @Put('/set-active/:date')
  async setActiveMenu(@Param('date') date: string) {
    const result = await axiosRequest({
      url: `/menu/set-active/${date}`,
      method: RequestMethods.PUT,
    });

    if (result.error) {
      throw new HttpException(
        result.error.data.message,
        result.error.status ?? 500,
      );
    }

    return result.response;
  }

  @ApiOperation({ summary: 'Delete menu for specific date' })
  @ApiResponse({ status: 200 })
  @Roles(ROLES.ADMIN, ROLES.CHEF)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':date')
  async deleteMenu(@Param('date') date: string) {
    const result = await axiosRequest({
      url: `/menu/${date}`,
      method: RequestMethods.DELETE,
    });

    if (result.error) {
      throw new HttpException(
        result.error.data.message,
        result.error.status ?? 500,
      );
    }

    return result.response;
  }
}
