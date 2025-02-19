package mechanics

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type CreateMechanicParams struct {
	Location    []float64 `bson:"location" json:"location"`
	Picture     string    `bson:"picture" json:"picture"`
	Email       string    `bson:"email" json:"email"`
	FirstName   string    `bson:"firstName" json:"firstName"`
	LastName    string    `bson:"lastName" json:"lastName"`
	PhoneNumber string    `bson:"phoneNumber" json:"phoneNumber"`
	Bio         string    `bson:"bio" json:"bio"`
	Address     string    `bson:"address" json:"address"`
	AppleAccountID string    `bson:"appleAccountID" json:"appleAccountID"`
}

type MechanicDocument struct {
	Location     *[]float64         `bson:"location" json:"location"`
	AppleAccountID string             `bson:"appleAccountID" json:"appleAccountID"`
	Address      string             `bson:"address" json:"address"`
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Picture      string             `bson:"picture" json:"picture"`
	Earnings     float64            `bson:"earnings" json:"earnings"`
	Email        string             `bson:"email" json:"email"`
	FirstName    string             `bson:"firstName" json:"firstName"`
	LastName     string             `bson:"lastName" json:"lastName"`
	Rating       float64            `bson:"rating" json:"rating"`
	TotalRatings int                `bson:"totalRatings" json:"totalRatings"`
	PhoneNumber  string             `bson:"phoneNumber" json:"phoneNumber"`
	Bio          string             `bson:"bio" json:"bio"`
	SocketID     string             `bson:"socketID" json:"socketID"`
	Online       bool               `bson:"online" json:"online"`
	Radius       float64            `bson:"radius" json:"radius"`
}

// This is a copy of mechanic document but all the fields are optional and are omit empty
type MechanicUpdate struct {
	Location     *[]float64         `bson:"location,omitempty" json:"location,omitempty"`
	Address      string             `bson:"address,omitempty" json:"address,omitempty"`
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Picture      string             `bson:"picture,omitempty" json:"picture,omitempty"`
	Earnings     float64            `bson:"earnings,omitempty" json:"earnings,omitempty"`
	Email        string             `bson:"email,omitempty" json:"email,omitempty"`
	FirstName    string             `bson:"firstName,omitempty" json:"firstName,omitempty"`
	LastName     string             `bson:"lastName,omitempty" json:"lastName,omitempty"`
	Rating       float64            `bson:"rating,omitempty" json:"rating,omitempty"`
	TotalRatings int                `bson:"totalRatings,omitempty" json:"totalRatings,omitempty"`
	PhoneNumber  string             `bson:"phoneNumber,omitempty" json:"phoneNumber,omitempty"`
	Bio          string             `bson:"bio,omitempty" json:"bio,omitempty"`
	SocketID     string             `bson:"socketID,omitempty" json:"socketID,omitempty"`
	Online       bool               `bson:"online,omitempty" json:"online,omitempty"`
	Radius       float64            `bson:"radius,omitempty" json:"radius,omitempty"`
}

type CreateInitialMechanicParams struct {
	AppleAccountID string `validate:"required" bson:"appleAccountID" json:"appleAccountID"`
	Email          string `validate:"required" bson:"email" json:"email"`
	FirstName      string `validate:"required" bson:"firstName" json:"firstName"`
	LastName       string `validate:"required" bson:"lastName" json:"lastName"`
}

type RateMechanicParams struct {
	Rating float64 `validate:"required" bson:"rating" json:"rating"`
}

type RequestType string
type Status string
type MechanicType string

const (
	Pickup   RequestType = "Live"
	Delivery RequestType = "Scheuled"

	Pending    Status = "Pending"
	OTW        Status = "On The Way"
	InProgress Status = "In Progress"
	Completed  Status = "Completed"
	Cancelled  Status = "Cancelled"

	OilChange   MechanicType = "Oil Change"
	Gas         MechanicType = "Gas"
	FlatTire    MechanicType = "Flat Tire"
	SparkPlugs  MechanicType = "Spark Plugs"
	Custom      MechanicType = "Custom Service"
	Maintenance MechanicType = "Maintenance"
	Other       MechanicType = "Other"
)

// Mechanicer is a nested struct in MechanicDocument.
type UserPreview struct {
	ID   string `bson:"id"       json:"id"`
	PFP  string `bson:"pfp"      json:"pfp"`
	Name string `bson:"name" json:"name"`
}

type GetNearbyMechanicsParams struct {
	Location []float64 `validate:"required" json:"location"`
	Radius   float64   `validate:"required" json:"radius"`
}

type AcceptMechanicParams struct {
}

type FinishMechanicParams struct {
	Mechanic string `validate:"required" json:"mechanic"`
}

type ChangeOnlineStatusParams struct {
	Online bool `validate:"required" json:"online"`
}

/*
Mechanic Service to be used by Mechanic Handler to interact with the
Database layer of the application
*/
type Service struct {
	Mechanics *mongo.Collection
}
