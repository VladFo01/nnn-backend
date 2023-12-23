import {
  Controller,
  Param,
  InternalServerErrorException,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { number } from 'joi';
import axiosRequest from 'src/utils/services/apiClient/apiClient';
import { RequestMethods } from 'src/utils/services/apiClient/apiClient.dto';
import { Roles } from '../auth/roles.decorator';
import { ROLES } from 'src/utils/constants';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { WorkerObject } from 'src/decorators/worker.decorator';
import { OrderService } from './order.service';
import { Worker } from '../worker/worker.model';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Creates order' })
  @ApiResponse({ status: 200, type: number })
  @Post('/create-for-table/:id')
  async createOrder(@Param('id') id: number) {
    const result = await axiosRequest({
      url: `/order/create-for-table/${id}`,
      method: RequestMethods.POST,
    });

    if (result.error) {
      throw new InternalServerErrorException(result.error.data);
    }

    return result.response;
  }

  @ApiOperation({ summary: 'Add dish to order' })
  @ApiResponse({ status: 200, type: number })
  @Post('/:orderId/add/:dishId')
  async addDishToOrder(
    @Param('orderId') orderId: number,
    @Param('dishId') dishId: number,
  ) {
    const result = await axiosRequest({
      url: `/order/${orderId}/add/${dishId}`,
      method: RequestMethods.POST,
    });

    if (result.error) {
      throw new InternalServerErrorException(result.error.data);
    }

    return result.response;
  }

  @ApiOperation({ summary: 'Confirm order' })
  @ApiResponse({ status: 200 })
  @Roles(ROLES.WAITER)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/:orderId/confirm')
  async setOrderConfirmed(@Param('orderId') orderId: number) {
    const result = await axiosRequest({
      url: `/order/${orderId}/confirm`,
      method: RequestMethods.POST,
    });

    if (result.error) {
      throw new InternalServerErrorException(result.error.data);
    }

    return result.response;
  }

  @ApiOperation({ summary: 'Set order cooked' })
  @ApiResponse({ status: 200 })
  @Roles(ROLES.CHEF)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/:orderId/mark-cooked')
  async setOrderCooked(@Param('orderId') orderId: number) {
    const result = await axiosRequest({
      url: `/order/${orderId}/mark-cooked`,
      method: RequestMethods.POST,
    });

    if (result.error) {
      throw new InternalServerErrorException(result.error.data);
    }

    return result.response;
  }

  @ApiOperation({ summary: 'Mark order as paid' })
  @ApiResponse({ status: 200 })
  @Post('/:orderId/pay')
  async setOrderPaid(@Param('orderId') orderId: number) {
    const result = await axiosRequest({
      url: `/order/${orderId}/pay`,
      method: RequestMethods.POST,
    });

    if (result.error) {
      throw new InternalServerErrorException(result.error.data);
    }

    return result.response;
  }

  @ApiOperation({
    summary:
      'Subtracts count of dish of specified id. If there was only one — removes it from the order.',
  })
  @ApiResponse({ status: 200, type: Number })
  @Put('/:orderId/decrement/:dishId')
  async decrementDishFromOrder(
    @Param('orderId') orderId: number,
    @Param('dishId') dishId: number,
  ) {
    const result = await axiosRequest({
      url: `/order/${orderId}/decrement/${dishId}`,
      method: RequestMethods.PUT,
    });

    if (result.error) {
      throw new InternalServerErrorException(result.error.data);
    }

    return result.response;
  }

  @ApiOperation({
    summary: 'Add dish to order.',
  })
  @ApiResponse({ status: 200, type: Number })
  @Get('/get/:orderId/')
  async addDishFromOrder(@Param('orderId') orderId: number) {
    const result = await axiosRequest({
      url: `/order/get/${orderId}`,
      method: RequestMethods.GET,
    });

    if (result.error) {
      throw new InternalServerErrorException(result.error.data);
    }

    return result.response;
  }

  @ApiOperation({
    summary: 'Get all dishes.',
  })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(AuthGuard)
  @Get('/all')
  async getAllOrders(@WorkerObject() worker: Worker) {
    const result = await axiosRequest<any, any, Array<any>>({
      url: `/order/all`,
      method: RequestMethods.GET,
    });

    if (result.error) {
      throw new InternalServerErrorException(result.error.data);
    }

    const validOrders = this.orderService.removeEmptyOrders(result.response);

    const transfromedOrders = this.orderService.transfromOrders(validOrders);

    const filteredOrders = this.orderService.filterOrdersByRoles(
      transfromedOrders,
      worker.role.title,
    );

    return filteredOrders;
  }

  @ApiOperation({
    summary: 'Remove dish from order.',
  })
  @ApiResponse({ status: 200, type: Number })
  @Delete('/:orderId/:dishId')
  async removeDishFromOrder(
    @Param('orderId') orderId: number,
    @Param('dishId') dishId: number,
  ) {
    const result = await axiosRequest({
      url: `/order/${orderId}/${dishId}`,
      method: RequestMethods.DELETE,
    });

    if (result.error) {
      throw new InternalServerErrorException(result.error.data);
    }

    return result.response;
  }
}
