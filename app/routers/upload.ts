import { Application } from "egg"
export default function uploadRoute(app: Application) {
  const { router, controller } = app
  router.post('/upload',  controller.upload.index)
}