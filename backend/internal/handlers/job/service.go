package job

import (
	"context"
	"fmt"
	"log/slog"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// newService receives the map of collections and picks out Jobs
func newService(collections map[string]*mongo.Collection) *Service {
	return &Service{
		Jobs: collections["jobs"],
		Mechanics: collections["mechanics"],
	}
}

// GetAllJobs fetches all Job documents from MongoDB
func (s *Service) GetAllJobs() ([]JobDocument, error) {
	ctx := context.Background()
	cursor, err := s.Jobs.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []JobDocument
	if err := cursor.All(ctx, &results); err != nil {
		return nil, err
	}
	return results, nil
}

// GetJobByID returns a single Job document by its ObjectID
func (s *Service) GetJobByID(id primitive.ObjectID) (*JobDocument, error) {
	ctx := context.Background()
	filter := bson.M{"_id": id}

	var Job JobDocument
	err := s.Jobs.FindOne(ctx, filter).Decode(&Job)
	if err == mongo.ErrNoDocuments {
		// No matching Job found
		return nil, mongo.ErrNoDocuments
	} else if err != nil {
		// Different error occurred
		return nil, err
	}

	return &Job, nil
}

// InsertJob adds a new Job document
func (s *Service) InsertJob(r JobDocument) (*JobDocument, error) {
	ctx := context.Background()
	// Insert the document into the collection
	result, err := s.Jobs.InsertOne(ctx, r)
	if err != nil {
		return nil, err
	}

	// Cast the inserted ID to ObjectID
	id := result.InsertedID.(primitive.ObjectID)
	slog.LogAttrs(ctx, slog.LevelInfo, "Job inserted", slog.String("id", id.Hex()))

	r.ID = id
	return &r, nil
}

func toDoc(v interface{}) (doc *bson.D, err error) {
	data, err := bson.Marshal(v)
	if err != nil {
		return
	}
	err = bson.Unmarshal(data, &doc)
	return
}

// UpdatePartialJob updates only specified fields of a Job document by ObjectID.
func (s *Service) UpdatePartialJob(id primitive.ObjectID, updated JobUpdate) error {
	ctx := context.Background()
	filter := bson.M{"_id": id}

	updateFields, err := toDoc(updated)
	if err != nil {
		return err
	}

	update := bson.M{"$set": updateFields}

	_, err = s.Jobs.UpdateOne(ctx, filter, update)
	return err
}

// DeleteJob removes a Job document by ObjectID.
func (s *Service) DeleteJob(id primitive.ObjectID) error {
	ctx := context.Background()
	filter := bson.M{"_id": id}

	_, err := s.Jobs.DeleteOne(ctx, filter)
	return err
}

func (s *Service) GetNearbyJobs(location []float64, radius float64) ([]JobDocument, error) {
	ctx := context.Background()
	filter := bson.M{
		"location": bson.M{
			"$near":        location,
			"$maxDistance": radius,
		},
		"status": "Pending",
	}
	cursor, err := s.Jobs.Find(ctx, filter)
	if err != nil {
		fmt.Print("FIND ERROEROEROE")
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []JobDocument
	if err := cursor.All(ctx, &results); err != nil {
		return nil, err
	}
	return results, nil
}

func (s *Service) AcceptJob(id primitive.ObjectID, mechanicId primitive.ObjectID) error {
	ctx := context.Background()
	filter := bson.M{"_id": id}

	// find the mechanic using find one 
	mechanicResult := s.Mechanics.FindOne(ctx, bson.M{"_id": mechanicId})

	if mechanicResult.Err() != nil {
		return mechanicResult.Err()
	}

	var mechanic MechanicMiniDocument
	err := mechanicResult.Decode(&mechanic)
	if err != nil {
		return err
	}

	// Assign the mechanic to the job
	update := bson.M{
		"$set": bson.M{
			"status":   InProgress,
			"mechanic": bson.M{
				"_id": mechanicId,
				"name": mechanic.FirstName + " " + mechanic.LastName,
				"email": mechanic.Email,
				"picture": mechanic.Picture,
			},
		},
	}
	res := s.Jobs.FindOneAndUpdate(ctx, filter, update)

	return res.Err()
}


func (s *Service) GetJobByRequester(requesterId primitive.ObjectID) ([]JobDocument, error) {
	ctx := context.Background()
	filter := bson.M{
		"requester": requesterId,
	}
	cursor, err := s.Jobs.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []JobDocument
	if err := cursor.All(ctx, &results); err != nil {
		return nil, err
	}
	return results, nil
}
func (s *Service) GetJobByMechanic(requesterId primitive.ObjectID) ([]JobDocument, error) {
	ctx := context.Background()
	filter := bson.M{
		"mechanic._id": requesterId,
	}
	cursor, err := s.Jobs.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []JobDocument
	if err := cursor.All(ctx, &results); err != nil {
		return nil, err
	}
	return results, nil
}