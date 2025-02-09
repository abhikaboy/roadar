package drivers

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type DriverDocument struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	AppleAccountID string             `bson:"appleAccountID" json:"appleAccountID"`
	Picture        string             `bson:"picture" json:"picture"`
	Email          string             `bson:"email" json:"email"`
	FirstName      string             `bson:"firstName" json:"firstName"`
	LastName       string             `bson:"lastName" json:"lastName"`
	PhoneNumber    string             `bson:"phoneNumber" json:"phoneNumber"`
	CarDetails     CarDetails         `bson:"carDetails" json:"carDetails"`
	SocketID       string             `bson:"socketID" json:"socketID"`
}

type DriverUpdate struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	AppleAccountID string             `bson:"appleAccountID,omitempty" json:"appleAccountID,omitempty"`
	Picture        string             `bson:"picture,omitempty" json:"picture,omitempty"`
	Email          string             `bson:"email,omitempty" json:"email,omitempty"`
	FirstName      string             `bson:"firstName,omitempty" json:"firstName,omitempty"`
	LastName       string             `bson:"lastName,omitempty" json:"lastName,omitempty"`
	PhoneNumber    string             `bson:"phoneNumber,omitempty" json:"phoneNumber,omitempty"`
	CarDetails     *CarDetails        `bson:"carDetails,omitempty" json:"carDetails,omitempty"`
	SocketID       string             `bson:"socketID,omitempty" json:"socketID,omitempty"`
}

type CreateInitialDriver struct {
	AppleAccountID string `validate:"required" bson:"appleAccountID" json:"appleAccountID"`
	Email          string `validate:"required" bson:"email" json:"email"`
	FirstName      string `validate:"required" bson:"firstName" json:"firstName"`
	LastName       string `validate:"required" bson:"lastName" json:"lastName"`
}

type CreateDriverParams struct {
	AppleAccountID string     `validate:"required" bson:"appleAccountID" json:"appleAccountID"`
	Picture        string     `validate:"required" bson:"picture" json:"picture"`
	Email          string     `validate:"required" bson:"email" json:"email"`
	FirstName      string     `validate:"required" bson:"firstName" json:"firstName"`
	LastName       string     `validate:"required" bson:"lastName" json:"lastName"`
	PhoneNumber    string     `validate:"required" bson:"phoneNumber" json:"phoneNumber"`
	CarDetails     CarDetails `validate:"required" bson:"carDetails" json:"carDetails"`
}

type CarDetails struct {
	Make         string `bson:"make" json:"make"`
	Model        string `bson:"model" json:"model"`
	Year         int    `bson:"year" json:"year"`
	Picture      string `bson:"picture" json:"picture"`
	LicensePlate string `bson:"licensePlate" json:"licensePlate"`
}

type Service struct {
	Drivers *mongo.Collection
}
