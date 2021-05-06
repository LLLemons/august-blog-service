import { Application } from "egg"
export default function repositoryRoute(app: Application) {
  const { router, controller } = app
  const jwt = app.middleware.jwt()
  router.post('/repository', jwt, controller.repository.create)
  router.get('/repository', jwt, controller.repository.query)
  router.get('/repository/:id', jwt, controller.repository.queryOne)
}