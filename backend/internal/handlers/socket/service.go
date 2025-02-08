package socket

import (
	"go.mongodb.org/mongo-driver/mongo"
)

func newService(collections map[string]*mongo.Collection) *Service {
	return &Service{collections["health"]}
}
