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
export * from './upload';
export * from './event';
