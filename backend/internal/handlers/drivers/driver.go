package drivers

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
Handler to execute business logic for Driver Endpoint
*/
type Handler struct {
	service *Service
}

func (h *Handler) CreateInitialDriver(c *fiber.Ctx) error {
	ctx := c.Context()
	var Driver DriverDocument
	var params CreateInitialDriverParams

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
	Driver = DriverDocument{
		AppleAccountID: params.AppleAccountID,
		Email:       params.Email,
		FirstName:   params.FirstName,
		LastName:    params.LastName,
		ID:          primitive.NewObjectID(),
	}

	result, err := h.service.InsertDriver(Driver)

	if err != nil {
		sErr := err.(mongo.WriteException) // Convert to Command Error
		if sErr.HasErrorCode(121) {        // Indicates that the document failed validation
			return xerr.WriteException(c, sErr) // Handle the error by returning a 121 and the error message
		}
	}

	return c.JSON(result)
}

// Create a Driver
func (h *Handler) CreateDriver(c *fiber.Ctx) error {
	ctx := c.Context()
	var Driver DriverDocument
	var params CreateDriverParams

	slog.LogAttrs(ctx, slog.LevelInfo, "Inserting Driver")
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
	Driver = DriverDocument{
		AppleAccountID: params.AppleAccountID,
		CarDetails:     params.CarDetails,
		Picture:        params.Picture,
		Email:          params.Email,
		FirstName:      params.FirstName,
		LastName:       params.LastName,
		PhoneNumber:    params.PhoneNumber,
		SocketID:       "",
		ID:             primitive.NewObjectID(),
	}

	result, err := h.service.InsertDriver(Driver)

	if err != nil {
		sErr := err.(mongo.WriteException) // Convert to Command Error
		if sErr.HasErrorCode(121) {        // Indicates that the document failed validation
			return xerr.WriteException(c, sErr) // Handle the error by returning a 121 and the error message
		}
	}

	return c.JSON(result)
}

// Get all Mechanics
func (h *Handler) GetDrivers(c *fiber.Ctx) error {
	Drivers, err := h.service.GetAllDrivers()
	fmt.Println(Drivers)

	if err != nil {
		// Central error handler take 500
		return err
	}
	return c.JSON(Drivers)
}

// Get a single Mechanic
func (h *Handler) GetDriver(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}

	Driver, err := h.service.GetDriverByID(id)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return c.Status(fiber.StatusNotFound).JSON(xerr.NotFound("Driver", "id", id.Hex()))
		}
		// Central error handler take 500
		return err
	}
	return c.JSON(Driver)
}

func (h *Handler) CreateCar(c *fiber.Ctx) error {
	ctx := c.Context()

	driverId := c.Params("id")
	id, err := primitive.ObjectIDFromHex(driverId)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}	
	var params CarDetails


	err = c.BodyParser(&params)
	if err != nil {
		return err
	}

	slog.LogAttrs(ctx, slog.LevelInfo, "Inserting Car")
	// validate body
	err = h.service.InsertCar(id,params)
	if err != nil {
		// Central error handler take 500
		return err
	}
	slog.LogAttrs(ctx, slog.LevelInfo, "Car inserted")

	return c.JSON(params)
}

// Get a single Mechanic
func (h *Handler) GetDriverByAppleAccountID(c *fiber.Ctx) error {
	id := c.Params("id")

	Driver, err := h.service.GetDriverByAppleAccountID(id)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return c.Status(fiber.StatusNotFound).JSON(xerr.NotFound("Driver", "id", id))
		}
		// Central error handler take 500
		return err
	}
	return c.JSON(Driver)
}


// Update specific fields of a Driver (PATCH)
func (h *Handler) UpdatePartialDriver(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}

	var partialUpdate DriverUpdate
	if err := go_json.Unmarshal(c.Body(), &partialUpdate); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.InvalidJSON())
	}

	err = h.service.UpdatePartialDriver(id, partialUpdate)
	if err != nil {
		// Central error handler take 500
		return err
	}
	return c.SendStatus(fiber.StatusOK)
}

// Delete a Driver
func (h *Handler) DeleteDriver(c *fiber.Ctx) error {
	id, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(xerr.BadRequest(err))
	}

	if err := h.service.DeleteDriver(id); err != nil {
		// Central error handler take 500
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}
