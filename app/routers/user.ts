import { Application } from "egg"

/*
 * @Author: Lemon
 * @Date: 2021-04-30 12:59:24
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 16:58:47
 * @FilePath: /august-blog-service/app/routers/user.ts
 */
export default function userRoute(app: Application) {
  const { router, controller } = app
  const jwt = app.middleware.jwt();
  router.post('/user/register', controller.user.register)
  router.post('/user/login', controller.user.login)
  router.get('/user/info', jwt, controller.user.getUserInfo)
  router.put('/user/:id', jwt, controller.user.updateUserInfo)
}