import { Injectable } from '@nestjs/common';
import { ORDER_STATUSES, ROLES } from 'src/utils/constants';

@Injectable()
export class OrderService {
  removeEmptyOrders(orders: Array<any>) {
    return orders.filter(({ dishes }) => dishes.length > 0);
  }

  transfromOrders(orders: Array<any>) {
    return orders.map(
      ({ dishes, order: { is_cooked, is_confirmed, is_paid, ...order } }) => {
        let status: string;
        switch (true) {
          case !is_confirmed:
            status = ORDER_STATUSES.not_confirmed;
            break;
          case is_confirmed && !is_cooked:
            status = ORDER_STATUSES.confirmed;
            break;
          case is_confirmed && is_cooked && !is_paid:
            status = ORDER_STATUSES.cooked;
            break;
          case is_confirmed && is_cooked && is_paid:
            status = ORDER_STATUSES.paid;
            break;
          default:
            status = ORDER_STATUSES.not_confirmed;
            break;
        }

        return {
          dishes,
          order: { status, ...order },
        };
      },
    );
  }

  filterOrdersByRoles(orders: Array<any>, role: string) {
    switch (role) {
      case ROLES.WAITER:
        return orders.filter(
          ({ order: { status } }) => status === ORDER_STATUSES.not_confirmed,
        );
      case ROLES.CHEF:
        return orders.filter(
          ({ order: { status } }) => status === ORDER_STATUSES.confirmed,
        );
      default:
        return orders;
    }
  }
}
