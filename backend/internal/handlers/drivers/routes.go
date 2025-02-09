package drivers

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

	// Add Drivers group under API Version 1
	Driver := apiV1.Group("/drivers")

	Driver.Post("/", handler.CreateDriver)
	Driver.Get("/", handler.GetDrivers)

	Driver.Get("/:id", handler.GetDriver)
	Driver.Patch("/:id", handler.UpdatePartialDriver)
	Driver.Delete("/:id", handler.DeleteDriver)

}
