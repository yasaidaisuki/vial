import fastify from 'fastify'

import formDataRoutes from './routes/form_data'
import createQueryRoute from './routes/create_query'
import errorHandler from './errors'
import updateQueryRoute from './routes/update_query'
import deleteQueryRoute from './routes/delete_query'

function build(opts = {}) {
  const app = fastify(opts)

  app.register(formDataRoutes, { prefix: '/form-data' })
  app.register(createQueryRoute, {prefix: '/create-query'})
  app.register(updateQueryRoute, {prefix: '/update-query'})
  app.register(deleteQueryRoute, {prefix: '/delete-query'})

  app.setErrorHandler(errorHandler)

  return app
}
export default build
