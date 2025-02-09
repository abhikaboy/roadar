package job

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

	// Add Job group under API Version 1
	Job := apiV1.Group("/jobs")

	Job.Post("/", handler.CreateJob)
	Job.Get("/", handler.GetJobs)
	Job.Get("/nearby", handler.GetNearbyJobs)
	Job.Post("/acceptJob", handler.AcceptJob)
	Job.Get("/:id", handler.GetJob)
	Job.Patch("/:id", handler.UpdatePartialJob)
	Job.Delete("/:id", handler.DeleteJob)
	Job.Get("/requester/:id", handler.GetJobByRequester)
}
