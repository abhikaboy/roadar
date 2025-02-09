package socket

import (
	"context"
	"log/slog"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func newService(collections map[string]*mongo.Collection) *Service {
	return &Service{collections["mechanics"], collections["drivers"], collections["jobs"]}
}

func (s *Service) LeaveRoom(userId string, user_type string) error {
	// remove the socketID from the user document
	var coll *mongo.Collection
	if user_type == "mechanic" {
		coll = s.mechanics
	} else if user_type == "driver" {
		coll = s.drivers
	} else {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid user type")
	}
	slog.LogAttrs(context.Background(), slog.LevelInfo, "Leaving Room", slog.String("userId", userId), slog.String("user_type", user_type))

	// turns the user id into an ObjectID
	id, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return err
	}
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"socketID": nil}}

	_, err = coll.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}
	return nil
}

func (s *Service) JoinRoom(userId string, user_type string, socketId string) error {

	var coll *mongo.Collection
	if user_type == "mechanic" {
		coll = s.mechanics
	} else if user_type == "driver" {
		coll = s.drivers
	} else {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid user type")
	}

	// turns the user id into an ObjectID
	id, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return err
	}

	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"socketID": socketId}}

	_, err = coll.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	return nil
}
