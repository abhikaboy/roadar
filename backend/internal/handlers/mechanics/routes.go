package mechanics

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

/*
Router maps endpoints to handlers
*/
func Routes(app *fiber.App, collections map[string]*mongo.Collection) {
	service := newService(collections)
	handler := Handler{service}

	// Add a group for API versioning
	apiV1 := app.Group("/api/v1")

	// Add Mechanic group under API Version 1
	Mechanic := apiV1.Group("/mechanics")

	Mechanic.Post("/", handler.CreateMechanic)
	Mechanic.Get("/", handler.GetMechanics)

	Mechanic.Post("/alert", handler.AlertMechanics)
	Mechanic.Get("/nearby", handler.GetNearbyMechanics)

	Mechanic.Get("/:id", handler.GetMechanic)
	Mechanic.Patch("/:id", handler.UpdatePartialMechanic)
	Mechanic.Patch("/:id/online", handler.ChangeOnlineStatus)
	Mechanic.Delete("/:id", handler.DeleteMechanic)

	Mechanic.Post("/:id/rate", handler.RateMechanic)
}
