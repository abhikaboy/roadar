package mechanics

import (
	"errors"
	"fmt"
	"log/slog"

	"github.com/abhikaboy/Roadar/internal/xerr"
	"github.com/abhikaboy/Roadar/internal/xvalidator"
	go_json "github.com/goccy/go-json"
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
		Location:    &params.Location,
		Picture:     params.Picture,
		Earnings:    0,
		Email:       params.Email,
		FirstName:   params.FirstName,
		TotalRatings: 0,
		LastName:    params.LastName,
		PhoneNumber: params.PhoneNumber,
		Bio:         params.Bio,
		SocketID:    "",
		ID:          primitive.NewObjectID(),
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
	if err := go_json.Unmarshal(c.Body(), &partialUpdate); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.InvalidJSON())
	}

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
	err = h.service.RateMechanic(id,params.Rating)
	if err != nil {
		// Central error handler take 500
		return err
	}
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.ErrorHandler(c, err))
	}

	return c.SendStatus(fiber.StatusOK)
}
