package server

import (
	"github.com/abhikaboy/Roadar/internal/handlers/auth"
	"github.com/abhikaboy/Roadar/internal/handlers/health"
	"github.com/abhikaboy/Roadar/internal/handlers/review"
	"github.com/abhikaboy/Roadar/internal/xerr"
	gojson "github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/favicon"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"go.mongodb.org/mongo-driver/mongo"
)

func New(collections map[string]*mongo.Collection) *fiber.App {

	app := setupApp()

	health.Routes(app, collections)
	auth.Routes(app, collections)

	health.Routes(app, collections)
	review.Routes(app, collections)
	return app
}

func setupApp() *fiber.App {
	app := fiber.New(fiber.Config{
		JSONEncoder:  gojson.Marshal,
		JSONDecoder:  gojson.Unmarshal,
		ErrorHandler: xerr.ErrorHandler,
	})
	app.Use(recover.New())
	app.Use(requestid.New())
	app.Use(favicon.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,PATCH,DELETE",
	}))
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${ip}:${port} ${pid} ${locals:requestid} ${status} - ${latency} ${method} ${path}\n",
	}))
	app.Use(compress.New(compress.Config{
		Level: compress.LevelBestSpeed,
	}))
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).SendString("Welcome to Raodar!")
	})
	return app
}
