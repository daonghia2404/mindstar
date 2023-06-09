import env from '@/env';
import AuthorizedInstance from '@/services/authorized-api';

const ApiService = AuthorizedInstance(env.api.baseUrl.service);

export default ApiService;
export * from './auth';
export * from './user';
export * from './setting';
export * from './branch';
export * from './dashboard';
export * from './transaction';
export * from './expense';
export * from './schedule';
export * from './order';
export * from './redeem';
export * from './manager';
export * from './class';
export * from './time-off';
export * from './upload';
export * from './event';
export * from './player';
export * from './e-connect';
export * from './attendance';
export * from './practice';
export * from './category';
export * from './reward';
export * from './product';
export * from './academy';
export * from './supplier';
export * from './bus-stop';
export * from './merchant';
export * from './inventory';

export * from './report';
