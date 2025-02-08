package socket

import (
	"fmt"

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
	connectSocket := socketio.New(func(kws *socketio.Websocket) {

		// Retrieve the user id from endpoint
		userId := kws.Params("id") // get the user id

		// Every websocket connection has an optional session key => value storage
		kws.SetAttribute("user_id", userId)

		// Broadcast to all the connected users the newcomer
		kws.Broadcast([]byte(fmt.Sprintf("New user connected: %s and UUID: %s", userId, kws.UUID)), true)
		// Write welcome message
		kws.Emit([]byte(fmt.Sprintf("Hello user: %s with UUID: %s", userId, kws.UUID)))
	})
	err := connectSocket(c)
	if err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusOK)

}

func (h *Handler) BroadcastRequest(c *fiber.Ctx) error {
	socketio.Broadcast([]byte("Hello World"))
	return c.SendString("Broadcast Request Sent")
}
