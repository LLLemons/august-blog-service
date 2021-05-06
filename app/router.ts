import { Application } from 'egg';
import homeRoute from './routers/home';
import repositoryRoute from './routers/repository';
import uploadRoute from './routers/upload';
import userRoute from './routers/user';

export default (app: Application) => {
  app.router.prefix('/api/v1')
  homeRoute(app)
  userRoute(app)
  uploadRoute(app)
  repositoryRoute(app)
};
