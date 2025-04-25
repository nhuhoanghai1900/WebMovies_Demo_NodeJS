import moviesRoute from "./movies.routes.js"
import siteRoute from "./site.routes.js"
import meRoute from "./me.routes.js"
import usersRoute from "./users.routes.js"
import searchRoute from "./search.routes.js"
import favoritesRoutes from "./favorites-movies.routes.js"
import rateLimit from "../app/middleware/rateLimitMiddleware.js";

function routes(app) {
  app.use("/movies", moviesRoute)
  app.use("/favorites-movies", favoritesRoutes)
  app.use("/me", meRoute)
  app.use("/users", usersRoute)
  app.use("/search", searchRoute)
  app.use("/", siteRoute)
}

export default routes
