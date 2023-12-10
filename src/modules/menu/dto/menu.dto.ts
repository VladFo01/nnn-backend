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
  readonly id: number;
  readonly name: string;
  readonly type_: DishType;
  readonly portion_weight_g: number;
  readonly price: number;
  readonly approx_cook_time_s: number;
}
