import {
  Controller,
  Param,
  InternalServerErrorException,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { number } from 'joi';
import axiosRequest from 'src/utils/services/apiClient/apiClient';
import { RequestMethods } from 'src/utils/services/apiClient/apiClient.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  @ApiOperation({ summary: 'Creates order' })
  @ApiResponse({ status: 200, type: number })
  @Post('/create-for-table/:id')
  async createOrder(@Param('id') id: number) {
    const result = await axiosRequest({
      url: `/order/create-for-table/${id}`,
      method: RequestMethods.POST,
    });

    if (result.error) {
      throw new InternalServerErrorException(result.error.data.message);
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
      throw new InternalServerErrorException(result.error.data.message);
    }

    return result.response;
  }

  @ApiOperation({ summary: 'Confirm order' })
  @ApiResponse({ status: 200 })
  @Post('/:orderId/confirm')
  async setOrderConfirmed(@Param('orderId') orderId: number) {
    const result = await axiosRequest({
      url: `/order/${orderId}/confirm`,
      method: RequestMethods.POST,
    });

    if (result.error) {
      throw new InternalServerErrorException(result.error.data.message);
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
      throw new InternalServerErrorException(result.error.data.message);
    }

    return result.response;
  }

  @ApiOperation({
    summary:
      'Subtracts count of dish of specified id. If there was only one — removes it from the order.',
  })
  @ApiResponse({ status: 200, type: number })
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
      throw new InternalServerErrorException(result.error.data.message);
    }

    return result.response;
  }

  @ApiOperation({
    summary: 'Remove dish from order.',
  })
  @ApiResponse({ status: 200, type: number })
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
      throw new InternalServerErrorException(result.error.data.message);
    }

    return result.response;
  }
}
