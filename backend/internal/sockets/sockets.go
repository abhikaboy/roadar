package sockets

import (
	"context"
	"encoding/json"
	"log/slog"

	"github.com/gofiber/contrib/socketio"
)

func New() {

	socketio.On(socketio.EventConnect, func(ep *socketio.EventPayload) {
		ctx := context.Background()
		slog.LogAttrs(ctx, slog.LevelInfo, "Connected Client")
	})

	// Event Disconnect

	socketio.On(socketio.EventDisconnect, func(ep *socketio.EventPayload) {
		ctx := context.Background()
		slog.LogAttrs(ctx, slog.LevelInfo, "Disconnected Client")
	})

	// Event CustomEvent

	socketio.On("CustomEvent", func(ep *socketio.EventPayload) {
		ctx := context.Background()
		slog.LogAttrs(ctx, slog.LevelInfo, "Custom Event Called")
		// Unmarshel the data into a struct
		var msg Message
		err := json.Unmarshal(ep.Data, &msg)
		if err != nil {
			slog.LogAttrs(ctx, slog.LevelError, "Error unmarshalling data", slog.String("error", err.Error()))
			return
		}
		slog.LogAttrs(ctx, slog.LevelInfo, "Message received", slog.String("message", msg.Message))
	})

	socketio.On(socketio.EventClose, func(ep *socketio.EventPayload) {
		ctx := context.Background()
		slog.LogAttrs(ctx, slog.LevelInfo, "Closed Connection")
	})

}
