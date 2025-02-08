package socket

import (
	"github.com/gofiber/contrib/socketio"
	"github.com/gofiber/fiber/v2"
)

/*
Handler to execute business logic for Health Endpoint
*/
type Handler struct {
	service *Service
}

func (h *Handler) JoinRoom(c *fiber.Ctx) error {
	socketio.New(func(kws *socketio.Websocket) {
		userId := c.Params("id")
		kws.Broadcast([]byte("Hello " + userId), true, 0)

		// set the socket uuid in the database 
	})
	return c.SendString("Joined Room")
}