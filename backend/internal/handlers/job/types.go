package job

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type CreateJobParams struct {
	Location  Location `validate:"required" json:"location"`
	Address   string   `validate:"required" json:"address"`
	Picture   string   `json:"picture,omitempty"`
	Requester string   `validate:"required" json:"requester"`
	JobType   JobType  `validate:"required" json:"JobType"`
	Urgency   string   `validate:"required" json:"urgency"`
	Money     int      `validate:"required" json:"money"`
	Details   string   `json:"details"`
}

type Location struct {
	Latitude  float64 `bson:"latitude" json:"latitude"`
	Longitude float64 `bson:"longitude" json:"longitude"`
}

type JobDocument struct {
	Location  Location           `bson:"location" json:"location"`
	Address   string             `bson:"address" json:"address"`
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Picture   string             `bson:"picture" json:"picture"`
	Requester primitive.ObjectID `bson:"requester" json:"requester"`
	Mechanic  primitive.ObjectID `bson:"mechanic,omitempty" json:"mechanic,omitempty"`
	JobType   JobType            `bson:"JobType" json:"JobType"`
	Urgency   string             `bson:"urgency" json:"urgency"`
	Money     int                `bson:"money" json:"money"`
	Details   string             `bson:"details" json:"details"`
	Status    Status             `bson:"status" json:"status"`
	Timestamp time.Time          `bson:"timestamp" json:"timestamp"`
}

type Status string

const (
	Pending    Status = "Pending"
	InProgress Status = "In Progress"
	Completed  Status = "Completed"
	Cancelled  Status = "Cancelled"
)

type JobType string

const (
	OilChange   JobType = "Oil Change"
	Gas         JobType = "Gas"
	FlatTire    JobType = "Flat Tire"
	SparkPlugs  JobType = "Spark Plugs"
	Custom      JobType = "Custom Service"
	Maintenance JobType = "Maintenance"
	Other       JobType = "Other"
)

// Rating is a nested struct in JobDocument.
type Rating struct {
	Portion int  `bson:"portion" json:"portion"`
	Taste   int  `bson:"taste" json:"taste"`
	Value   int  `bson:"value" json:"value"`
	Overall int  `bson:"overall" json:"overall"`
	Return  bool `bson:"return" json:"return"`
}

// Jober is a nested struct in JobDocument.
type Jober struct {
	ID       string `bson:"id"       json:"id"`
	PFP      string `bson:"pfp"      json:"pfp"`
	Username string `bson:"username" json:"username"`
}

type CreateCommentParams struct {
	Content string `validate:"required" json:"content"`
	Job     string `validate:"required" json:"Job"`
}

/*
Job Service to be used by Job Handler to interact with the
Database layer of the application
*/
type Service struct {
	Jobs *mongo.Collection
}
