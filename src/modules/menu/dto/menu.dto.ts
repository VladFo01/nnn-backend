import { ApiProperty } from '@nestjs/swagger';

export enum DishType {
  main,
  appetizer,
  garnish,
  cold,
  salad,
  drink,
  alcohol,
}

export class Dish {
  @ApiProperty({ example: 3 })
  readonly id: number;

  @ApiProperty({ example: 'Onion salad' })
  readonly name: string;

  @ApiProperty({ example: DishType.alcohol })
  readonly type_: DishType;

  @ApiProperty({ example: 450 })
  readonly portion_weight_g: number;

  @ApiProperty({ example: 230 })
  readonly price: number;

  @ApiProperty({ example: 1500 })
  readonly approx_cook_time_s: number;
}

export class Ingredient {
  @ApiProperty({ example: 3 })
  readonly id: number;

  @ApiProperty({ example: 150 })
  readonly used_g: number;
}

export class RedisDish {
  readonly dish: Dish;
  readonly ingredients: Ingredient[];
}

export class CreateMenuDto {
  @ApiProperty({ example: [1, 2, 10], description: 'Ids of dishes' })
  readonly dishes: number[];

  @ApiProperty({
    example: '2023-12-10',
    description: 'Date in format in format «yyyy-MM-dd»',
  })
  readonly date: string;
}
