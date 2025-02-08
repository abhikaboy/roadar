package main

import (
	"context"
	"flag"
	"log/slog"
	"os"

	"github.com/abhikaboy/Roadar/internal/config"
	"github.com/abhikaboy/Roadar/internal/storage/xmongo"
	"github.com/abhikaboy/Roadar/internal/xslog"
	"github.com/joho/godotenv"
)

func main() {
	ctx := context.Background()
	name := flag.String("name", "users", "name of the new copy of production")

	flag.Parse()
	if *name == "" {
		fatal(ctx, "name flag is required", nil)
	}

	if err := godotenv.Load(); err != nil {
		fatal(ctx, "Failed to load .env", err)
	}
	config, err := config.Load()
	if err != nil {
		fatal(ctx, "Failed to load config", err)
	}

	config.Atlas.Environment = "Production"

	db, err := xmongo.New(ctx, config.Atlas)
	if err != nil {
		fatal(ctx, "Failed to connect to MongoDB in main", err)
	}

	if err := db.Clone(ctx, db.Collections, *name, 200); err != nil {
		fatal(ctx, "Failed to add example fields", err)
	}
}

func fatal(ctx context.Context, msg string, err error) {
	slog.LogAttrs(
		ctx,
		slog.LevelError,
		msg,
		xslog.Error(err),
	)
	os.Exit(1)
}
