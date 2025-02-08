package socket

import (
	"context"
	"fmt"
	"sync"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

/*
Router maps endpoints to handlers
*/
 func iterateChangeStream(routineCtx context.Context, waitGroup sync.WaitGroup, stream *mongo.ChangeStream) {
		fmt.Printf("Waiting for changes...\n")
		defer stream.Close(routineCtx)
		defer waitGroup.Done()
		for stream.Next(routineCtx) {
			var data bson.M
			if err := stream.Decode(&data); err != nil {
						panic(err)
			}
			fmt.Printf("%v\n", data)
		}
		fmt.Print("Stream closed\n")
	}


func Routes(app *fiber.App, collections map[string]*mongo.Collection, stream *mongo.ChangeStream) {
	service := newService(collections)
	handler := Handler{service}

	// waitGroup.Wait()

	app.Get("/ws/:id", handler.JoinRoom)
	app.Post("/ws/broadcast", handler.BroadcastRequest)
}
