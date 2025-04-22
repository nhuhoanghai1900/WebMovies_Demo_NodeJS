import moviesRoute from "./movies.routes.js"
import siteRoute from "./site.routes.js"
import meRoute from "./me.routes.js"
import usersRoute from "./users.routes.js"
import searchRoute from "./search.routes.js"

function routes(app) {
  app.use("/movies", moviesRoute)
  app.use("/me", meRoute)
  app.use("/users", usersRoute)
  app.use("/search", searchRoute)
  app.use("/", siteRoute)
}

export default routes
