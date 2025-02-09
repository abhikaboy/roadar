package mechanics

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"

	"github.com/abhikaboy/Roadar/internal/handlers/job"
	"github.com/gofiber/contrib/socketio"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// newService receives the map of collections and picks out Mechanics
func newService(collections map[string]*mongo.Collection) *Service {
	return &Service{
		Mechanics: collections["mechanics"],
	}
}

// GetAllMechanics fetches all Mechanic documents from MongoDB
func (s *Service) GetAllMechanics() ([]MechanicDocument, error) {
	ctx := context.Background()
	cursor, err := s.Mechanics.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []MechanicDocument
	if err := cursor.All(ctx, &results); err != nil {
		return nil, err
	}
	return results, nil
}

// GetMechanicByID returns a single Mechanic document by its ObjectID
func (s *Service) GetMechanicByID(id primitive.ObjectID) (*MechanicDocument, error) {
	ctx := context.Background()
	filter := bson.M{"_id": id}

	var Mechanic MechanicDocument
	err := s.Mechanics.FindOne(ctx, filter).Decode(&Mechanic)
	if err == mongo.ErrNoDocuments {
		// No matching Mechanic found
		return nil, mongo.ErrNoDocuments
	} else if err != nil {
		// Different error occurred
		return nil, err
	}

	return &Mechanic, nil
}

// InsertMechanic adds a new Mechanic document
func (s *Service) InsertMechanic(r MechanicDocument) (*MechanicDocument, error) {
	ctx := context.Background()
	// Insert the document into the collection
	result, err := s.Mechanics.InsertOne(ctx, r)
	if err != nil {
		return nil, err
	}

	// Cast the inserted ID to ObjectID
	id := result.InsertedID.(primitive.ObjectID)
	slog.LogAttrs(ctx, slog.LevelInfo, "Mechanic inserted", slog.String("id", id.Hex()))

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

// UpdatePartialMechanic updates only specified fields of a Mechanic document by ObjectID.
func (s *Service) UpdatePartialMechanic(id primitive.ObjectID, updated MechanicUpdate) error {
	ctx := context.Background()
	filter := bson.M{"_id": id}

	updateFields, err := toDoc(updated)
	if err != nil {
		return err
	}

	update := bson.M{"$set": updateFields}
	fmt.Printf("%+v \n", update)
	_, err = s.Mechanics.UpdateOne(ctx, filter, update)
	return err
}

// DeleteMechanic removes a Mechanic document by ObjectID.
func (s *Service) DeleteMechanic(id primitive.ObjectID) error {
	ctx := context.Background()
	filter := bson.M{"_id": id}

	_, err := s.Mechanics.DeleteOne(ctx, filter)
	return err
}

func (s *Service) GetNearbyMechanics(location []float64, radius float64) ([]MechanicDocument, error) {
	ctx := context.Background()
	filter := bson.M{
		"location": bson.M{
			"$near":        location,
			"$maxDistance": radius,
		},
		"status": "Pending",
	}
	cursor, err := s.Mechanics.Find(ctx, filter)
	if err != nil {
		fmt.Print("FIND ERROEROEROE")
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []MechanicDocument
	if err := cursor.All(ctx, &results); err != nil {
		return nil, err
	}
	return results, nil
}

func (s *Service) RateMechanic(id primitive.ObjectID, rating float64) error {
	ctx := context.Background()
	filter := bson.M{"_id": id}

	// get the current rating
	mechanicResult := s.Mechanics.FindOne(ctx, filter)
	if mechanicResult.Err() != nil {
		return mechanicResult.Err()
	}

	var mechanic MechanicDocument
	err := mechanicResult.Decode(&mechanic)
	if err != nil {
		return err
	}
	newRating := (mechanic.Rating*float64(mechanic.TotalRatings) + rating) / (float64(mechanic.TotalRatings + 1))

	// sum + rating / total ratings + 1
	update := bson.M{
		"$inc": bson.M{
			"totalRatings": 1,
		},
		"$set": bson.M{
			"rating": newRating,
		},
	}
	res := s.Mechanics.FindOneAndUpdate(ctx, filter, update)

	return res.Err()
}

func (s *Service) AcceptMechanic(id primitive.ObjectID, mechanicId primitive.ObjectID) error {
	ctx := context.Background()
	filter := bson.M{"_id": id}

	// Assign the mechanic to the mechanic
	update := bson.M{
		"$set": bson.M{
			"status":   InProgress,
			"mechanic": mechanicId,
		},
	}
	res := s.Mechanics.FindOneAndUpdate(ctx, filter, update)

	return res.Err()
}

func (s *Service) AlertMechanics(job job.JobDocument) error {
	ctx := context.Background()

	// Find mechanics that are online and the job is in radius
	// TODO: make maxDistance utilize the radius on the mechanic doucment
	filter := bson.M{
		"online": true,
		"location": bson.M{
			"$near":        job.Location,
			"$maxDistance": 1000,
		},
		"socketID": bson.M{
			"$exists": true,
			"$nin":     bson.A{nil,""},
		},
	}

	fmt.Println("Received Job")
	fmt.Println(job)

	cursor, err := s.Mechanics.Find(ctx, filter)
	if err != nil {
		return err
	}
	defer cursor.Close(ctx)

	var results []MechanicDocument
	if err := cursor.All(ctx, &results); err != nil {
		return err
	}

	
	uuids := make([]string, 0)
  slog.LogAttrs(ctx, slog.LevelInfo, "Emitting to list", slog.String("uuids", ""))
	for _, mechanic := range results {
		// send alert to mechanic
		uuids = append(uuids, mechanic.SocketID)
	}
	// take the job and convert to a byte array
	jobBytes, err := json.Marshal(job)
	if err != nil {
		return err
	}


	socketio.EmitToList(uuids, 
		jobBytes,  
		1,
	)
	for _, uuid := range uuids {
		fmt.Println(uuid)
	}
	return err
}

func (s *Service) ChangeOnlineStatus(id primitive.ObjectID, online bool) error {
	ctx := context.Background()
	filter := bson.M{"_id": id}

	update := bson.M{
		"$set": bson.M{
			"online": online,
		},
	}
	res := s.Mechanics.FindOneAndUpdate(ctx, filter, update)

	return res.Err()
}