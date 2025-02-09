package drivers

import (
	"context"
	"fmt"
	"log/slog"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// newService receives the map of collections and picks out Mechanics
func newService(collections map[string]*mongo.Collection) *Service {
	return &Service{
		Drivers: collections["drivers"],
	}
}

// GetAllDrivers fetches all Mechanic documents from MongoDB
func (s *Service) GetAllDrivers() ([]DriverDocument, error) {
	ctx := context.Background()
	cursor, err := s.Drivers.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var results []DriverDocument
	if err := cursor.All(ctx, &results); err != nil {
		return nil, err
	}
	return results, nil
}

// GetDriverByID returns a single Mechanic document by its ObjectID
func (s *Service) GetDriverByID(id primitive.ObjectID) (*DriverDocument, error) {
	ctx := context.Background()
	filter := bson.M{"_id": id}

	var Driver DriverDocument
	err := s.Drivers.FindOne(ctx, filter).Decode(&Driver)
	if err == mongo.ErrNoDocuments {
		// No matching Mechanic found
		return nil, mongo.ErrNoDocuments
	} else if err != nil {
		// Different error occurred
		return nil, err
	}

	return &Driver, nil
}

// GetDriverByID returns a single Mechanic document by its ObjectID
func (s *Service) GetDriverByAppleAccountID(id string) (*DriverDocument, error) {
	ctx := context.Background()
	filter := bson.M{"appleAccountID": id}

	var Driver DriverDocument
	err := s.Drivers.FindOne(ctx, filter).Decode(&Driver)
	if err == mongo.ErrNoDocuments {
		// No matching Mechanic found
		return nil, mongo.ErrNoDocuments
	} else if err != nil {
		// Different error occurred
		return nil, err
	}

	return &Driver, nil
}

// InsertMechanic adds a new Mechanic document
func (s *Service) InsertDriver(r DriverDocument) (*DriverDocument, error) {
	ctx := context.Background()
	// Insert the document into the collection
	result, err := s.Drivers.InsertOne(ctx, r)
	if err != nil {
		return nil, err
	}

	// Cast the inserted ID to ObjectID
	id := result.InsertedID.(primitive.ObjectID)
	slog.LogAttrs(ctx, slog.LevelInfo, "Driver inserted", slog.String("id", id.Hex()))

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

// UpdatePartialDriver updates only specified fields of a Driver document by ObjectID.
func (s *Service) UpdatePartialDriver(id primitive.ObjectID, updated DriverUpdate) error {
	ctx := context.Background()
	filter := bson.M{"_id": id}

	updateFields, err := toDoc(updated)
	if err != nil {
		return err
	}

	fmt.Println(updateFields)
	fmt.Println(updated)

	update := bson.M{"$set": updateFields}

	_, err = s.Drivers.UpdateOne(ctx, filter, update)
	return err
}

// DeleteMechanic removes a Mechanic document by ObjectID.
func (s *Service) DeleteDriver(id primitive.ObjectID) error {
	ctx := context.Background()
	filter := bson.M{"_id": id}

	_, err := s.Drivers.DeleteOne(ctx, filter)
	return err
}

func (s *Service) InsertCar(driverId primitive.ObjectID, params CarDetails) error {
	ctx := context.Background()

	// Ensure `carDetails` is an empty array if it is currently `nil`
	_, err := s.Drivers.UpdateOne(
		ctx,
		bson.M{"_id": driverId, "carDetails": nil}, // Only matches if carDetails is explicitly nil
		bson.M{"$set": bson.M{"carDetails": []CarDetails{}}},
	)
	if err != nil {
		return err
	}

	// Now safely push the new car details
	_, err = s.Drivers.UpdateOne(
		ctx,
		bson.M{"_id": driverId},
		bson.M{"$push": bson.M{"carDetails": params}},
	)

	return err
}