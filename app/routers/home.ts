import { Application } from "egg"

/*
 * @Author: Lemon
 * @Date: 2021-04-30 13:08:28
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 09:48:45
 * @FilePath: /august-blog-service/app/routers/home.ts
 */
export default function homeRoute(app: Application) {
  const { router, controller } = app
  router.get('/', controller.home.index)
}