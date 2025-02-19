package mechanics

import (
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"

	"github.com/abhikaboy/Roadar/internal/handlers/job"
	"github.com/abhikaboy/Roadar/internal/xerr"
	"github.com/abhikaboy/Roadar/internal/xvalidator"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

/*
Handler to execute business logic for Mechanic Endpoint
*/
type Handler struct {
	service *Service
}

// Create a Mechanic
func (h *Handler) CreateMechanic(c *fiber.Ctx) error {
	ctx := c.Context()
	var Mechanic MechanicDocument
	var params CreateMechanicParams

	slog.LogAttrs(ctx, slog.LevelInfo, "Inserting Mechanic")
	// validate body
	err := c.BodyParser(&params)
	if err != nil {
		return err
	}

	errs := xvalidator.Validator.Validate(params)
	if len(errs) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(errs)
	}

	// do some validations on the inputs
	Mechanic = MechanicDocument{
		Location:     &params.Location,
		Picture:      params.Picture,
		Earnings:     0,
		Email:        params.Email,
		FirstName:    params.FirstName,
		TotalRatings: 0,
		LastName:     params.LastName,
		PhoneNumber:  params.PhoneNumber,
		Bio:          params.Bio,
		SocketID:     "",
		ID:           primitive.NewObjectID(),
		Online:       true,
		Radius:       100,
	}

	result, err := h.service.InsertMechanic(Mechanic)

	if err != nil {
		sErr := err.(mongo.WriteException) // Convert to Command Error
		if sErr.HasErrorCode(121) {        // Indicates that the document failed validation
			return xerr.WriteException(c, sErr) // Handle the error by returning a 121 and the error message
		}
	}

	return c.JSON(result)
}


// Get all Mechanics
func (h *Handler) GetMechanics(c *fiber.Ctx) error {
	Mechanics, err := h.service.GetAllMechanics()

	if err != nil {
		// Central error handler take 500
		return err
	}
	return c.JSON(Mechanics)
}

// Get a single Mechanic
func (h *Handler) GetMechanic(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}

	Mechanic, err := h.service.GetMechanicByID(id)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return c.Status(fiber.StatusNotFound).JSON(xerr.NotFound("Mechanic", "id", id.Hex()))
		}
		// Central error handler take 500
		return err
	}
	return c.JSON(Mechanic)
}

// Update specific fields of a Mechanic (PATCH)
func (h *Handler) UpdatePartialMechanic(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}

	var partialUpdate MechanicUpdate
	if err := json.Unmarshal(c.Body(), &partialUpdate); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.InvalidJSON())
	}

	fmt.Printf("%+v \n", partialUpdate)

	err = h.service.UpdatePartialMechanic(id, partialUpdate)
	if err != nil {
		// Central error handler take 500
		return err
	}
	return c.SendStatus(fiber.StatusOK)
}

// Delete a Mechanic
func (h *Handler) DeleteMechanic(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}

	if err := h.service.DeleteMechanic(id); err != nil {
		// Central error handler take 500
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func (h *Handler) GetNearbyMechanics(c *fiber.Ctx) error {
	var params GetNearbyMechanicsParams

	err := c.BodyParser(&params)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.InvalidJSON())
	}

	// service call
	Mechanics, err := h.service.GetNearbyMechanics(params.Location, params.Radius)
	if err != nil {
		// Central error handler take 500
		return err
	}
	err = c.JSON(Mechanics)
	if err != nil {
		fmt.Print("ASODIJASOD")
		return c.Status(fiber.StatusBadRequest).JSON(xerr.ErrorHandler(c, err))
	}

	return c.JSON(Mechanics)
}

func (h *Handler) GetMechanicByAppleAccountID(c *fiber.Ctx) error {
	id := c.Params("id")

	Driver, err := h.service.GetMechanicByAppleAccountID(id)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return c.Status(fiber.StatusNotFound).JSON(xerr.NotFound("Driver", "id", id))
		}
		// Central error handler take 500
		return err
	}
	return c.JSON(Driver)
}


func (h *Handler) CreateInitialMechanic(c *fiber.Ctx) error {
	ctx := c.Context()
	var Mechanic MechanicDocument
	var params CreateInitialMechanicParams

	slog.LogAttrs(ctx, slog.LevelInfo, "Inserting Initial Driver")
	// validate body
	err := c.BodyParser(&params)
	if err != nil {
		return err
	}

	errs := xvalidator.Validator.Validate(params)
	if len(errs) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(errs)
	}



	// do some validations on the inputs
	Mechanic = MechanicDocument{
		AppleAccountID: params.AppleAccountID,
		Email:       params.Email,
		FirstName:   params.FirstName,
		LastName:    params.LastName,
		ID:          primitive.NewObjectID(),
		Radius: 	1000,
	}

	result, err := h.service.InsertMechanic(Mechanic)

	if err != nil {
		sErr := err.(mongo.WriteException) // Convert to Command Error
		if sErr.HasErrorCode(121) {        // Indicates that the document failed validation
			return xerr.WriteException(c, sErr) // Handle the error by returning a 121 and the error message
		}
	}

	return c.JSON(result)
}

func (h *Handler) AlertMechanics(c *fiber.Ctx) error {
	var job job.JobDocument

	err := c.BodyParser(&job)
	if err != nil {
		fmt.Println("ERROR PARSING BODY")
		return c.Status(fiber.StatusBadRequest).JSON(xerr.InvalidJSON())
	}

	fmt.Println("Received Job")
	fmt.Printf("%+v \n", job)

	// service call
	slog.LogAttrs(c.Context(), slog.LevelInfo, "Alerting Mechanics")
	err = h.service.AlertMechanics(job)
	if err != nil {
		// Central error handler take 500
		return err
	}
	slog.LogAttrs(c.Context(), slog.LevelInfo, "Alerted Mechanics")

	return c.SendStatus(fiber.StatusOK)
}

func (h *Handler) RateMechanic(c *fiber.Ctx) error {
	var params RateMechanicParams

	// get the id from the url
	id, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}

	err = c.BodyParser(&params)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.InvalidJSON())
	}

	// service call
	err = h.service.RateMechanic(id, params.Rating)
	if err != nil {
		// Central error handler take 500
		return err
	}
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.ErrorHandler(c, err))
	}

	return c.SendStatus(fiber.StatusOK)
}

func (h *Handler) ChangeOnlineStatus(c *fiber.Ctx) error {
	var params ChangeOnlineStatusParams
	id := c.Params("id")

	// turn id string to primitive.ObjectID
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}

	err = c.BodyParser(&params)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.InvalidJSON())
	}

	// service call
	err = h.service.ChangeOnlineStatus(oid, params.Online)
	if err != nil {
		// Central error handler take 500
		return err
	}
	return c.SendStatus(fiber.StatusOK)
}
