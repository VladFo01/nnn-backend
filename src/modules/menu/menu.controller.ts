import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import axiosRequest from 'src/utils/services/apiClient/apiClient';
import { RequestMethods } from 'src/utils/services/apiClient/apiClient.dto';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
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
}
