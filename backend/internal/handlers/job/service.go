package job

import (
	"context"
	"log/slog"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// newService receives the map of collections and picks out Jobs
func newService(collections map[string]*mongo.Collection) *Service {
	return &Service{
		Jobs: collections["jobs"],
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
