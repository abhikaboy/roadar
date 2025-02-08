package job

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type CreateJobParams struct {
	Location    []float64   `validate:"required" json:"location"`
	Address     string      `validate:"required" json:"address"`
	Picture     []string    `json:"picture,omitempty"`
	Requester   string      `validate:"required" json:"requester"`
	JobType     JobType     `validate:"required" json:"JobType"`
	RequestType RequestType `validate:"required" json:"requestType"`
	Urgency     string      `validate:"required" json:"urgency"`
	Money       float64     `validate:"required" json:"money"`
	Details     string      `json:"details"`
}

type JobDocument struct {
	Location    *[]float64         `bson:"location" json:"location"`
	Address     string             `bson:"address" json:"address"`
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Picture     *[]string          `bson:"picture" json:"picture"`
	Requester   primitive.ObjectID `bson:"requester" json:"requester"`
	Mechanic    primitive.ObjectID `bson:"mechanic,omitempty" json:"mechanic,omitempty"`
	JobType     JobType            `bson:"JobType" json:"JobType"`
	RequestType RequestType        `bson:"requestType" json:"requestType"`
	Urgency     string             `bson:"urgency" json:"urgency"`
	Money       float64            `bson:"money" json:"money"`
	Details     string             `bson:"details" json:"details"`
	Status      Status             `bson:"status" json:"status"`
	Timestamp   time.Time          `bson:"timestamp" json:"timestamp"`
}

// This is a copy of job document but all the fields are optional and are omit empty
type JobUpdate struct {
	Location *[]float64         `bson:"location,omitempty" json:"location,omitempty"`
	Address  string             `bson:"address,omitempty" json:"address,omitempty"`
	Picture  *[]string          `bson:"picture,omitempty" json:"picture,omitempty"`
	Mechanic primitive.ObjectID `bson:"mechanic,omitempty" json:"mechanic,omitempty"`
	JobType  JobType            `bson:"JobType,omitempty" json:"JobType,omitempty"`
	Urgency  string             `bson:"urgency,omitempty" json:"urgency,omitempty"`
	Money    float64            `bson:"money,omitempty" json:"money,omitempty"`
	Details  string             `bson:"details,omitempty" json:"details,omitempty"`
	Status   Status             `bson:"status,omitempty" json:"status,omitempty"`
}

type RequestType string
type Status string
type JobType string

const (
	Pickup   RequestType = "Live"
	Delivery RequestType = "Scheuled"

	Pending    Status = "Pending"
	OTW        Status = "On The Way"
	InProgress Status = "In Progress"
	Completed  Status = "Completed"
	Cancelled  Status = "Cancelled"

	OilChange   JobType = "Oil Change"
	Gas         JobType = "Gas"
	FlatTire    JobType = "Flat Tire"
	SparkPlugs  JobType = "Spark Plugs"
	Custom      JobType = "Custom Service"
	Maintenance JobType = "Maintenance"
	Other       JobType = "Other"
)

// Jober is a nested struct in JobDocument.
type UserPreview struct {
	ID   string `bson:"id"       json:"id"`
	PFP  string `bson:"pfp"      json:"pfp"`
	Name string `bson:"name" json:"name"`
}

type GetNearbyJobsParams struct {
	Location []float64 `validate:"required" json:"location"`
	Radius   float64   `validate:"required" json:"radius"`
}

type AcceptJobParams struct {
	Job      string `validate:"required" json:"job"`
	Mechanic string `validate:"required" json:"mechanic"`
}

type FinishJobParams struct {
	Job string `validate:"required" json:"job"`
}

/*
Job Service to be used by Job Handler to interact with the
Database layer of the application
*/
type Service struct {
	Jobs *mongo.Collection
}
