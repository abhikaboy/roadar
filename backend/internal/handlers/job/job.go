package job

import (
	"errors"
	"fmt"
	"log/slog"
	"time"

	"github.com/abhikaboy/Roadar/internal/xerr"
	"github.com/abhikaboy/Roadar/internal/xvalidator"
	go_json "github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

/*
Handler to execute business logic for Job Endpoint
*/
type Handler struct {
	service *Service
}

// Create a Job
func (h *Handler) CreateJob(c *fiber.Ctx) error {
	ctx := c.Context()
	var Job JobDocument
	var params CreateJobParams

	slog.LogAttrs(ctx, slog.LevelInfo, "Inserting Job")
	// validate body
	err := c.BodyParser(&params)
	if err != nil {
		return err
	}
	errs := xvalidator.Validator.Validate(params)
	if len(errs) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(errs)
	}

	// convert id string to primitive.ObjectID
	id, err := primitive.ObjectIDFromHex(params.Requester)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}
	requesterId := id

	var mechanicId primitive.ObjectID

	// do some validations on the inputs
	Job = JobDocument{
		Location:    &params.Location,
		Address:     params.Address,
		Picture:     &params.Picture,
		Requester:   requesterId,
		Mechanic:    mechanicId,
		JobType:     params.JobType,
		Urgency:     params.Urgency,
		Money:       params.Money,
		Details:     params.Details,
		Status:      Pending,
		RequestType: params.RequestType,
		Timestamp:   time.Now(),
		ID:          primitive.NewObjectID(),
	}

	result, err := h.service.InsertJob(Job)

	if err != nil {
		sErr := err.(mongo.WriteException) // Convert to Command Error
		if sErr.HasErrorCode(121) {        // Indicates that the document failed validation
			return xerr.WriteException(c, sErr) // Handle the error by returning a 121 and the error message
		}
	}

	return c.JSON(result)
}

// Get all Jobs
func (h *Handler) GetJobs(c *fiber.Ctx) error {
	Jobs, err := h.service.GetAllJobs()

	if err != nil {
		// Central error handler take 500
		return err
	}
	return c.JSON(Jobs)
}

// Get a single Job
func (h *Handler) GetJob(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}

	Job, err := h.service.GetJobByID(id)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return c.Status(fiber.StatusNotFound).JSON(xerr.NotFound("Job", "id", id.Hex()))
		}
		// Central error handler take 500
		return err
	}
	return c.JSON(Job)
}

// Update specific fields of a Job (PATCH)
func (h *Handler) UpdatePartialJob(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}

	var partialUpdate JobUpdate
	if err := go_json.Unmarshal(c.Body(), &partialUpdate); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.InvalidJSON())
	}

	err = h.service.UpdatePartialJob(id, partialUpdate)
	if err != nil {
		// Central error handler take 500
		return err
	}
	return c.SendStatus(fiber.StatusOK)
}

// Delete a Job
func (h *Handler) DeleteJob(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}

	if err := h.service.DeleteJob(id); err != nil {
		// Central error handler take 500
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func (h *Handler) GetNearbyJobs(c *fiber.Ctx) error {
	var params GetNearbyJobsParams

	err := c.BodyParser(&params)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.InvalidJSON())
	}

	// service call
	jobs, err := h.service.GetNearbyJobs(params.Location, params.Radius)
	if err != nil {
		// Central error handler take 500
		return err
	}
	err = c.JSON(jobs)
	if err != nil {
		fmt.Print("ASODIJASOD")
		return c.Status(fiber.StatusBadRequest).JSON(xerr.ErrorHandler(c, err))
	}

	return c.JSON(jobs)
}

func (h *Handler) AcceptJob(c *fiber.Ctx) error {
	var params AcceptJobParams

	err := c.BodyParser(&params)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.InvalidJSON())
	}

	// convert id string to primitive.ObjectID
	id, err := primitive.ObjectIDFromHex(params.Job)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}

	mechanicId, err := primitive.ObjectIDFromHex(params.Mechanic)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}

	// service call
	err = h.service.AcceptJob(id, mechanicId)
	if err != nil {
		// Central error handler take 500
		return err
	}
	return c.SendStatus(fiber.StatusOK)
}
