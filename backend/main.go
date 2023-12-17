package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"cloud.google.com/go/datastore"
	"github.com/joho/godotenv"
)

type Track struct {
    TrackID  string `datastore:"id" json:"id"`
    DlURL    string `datastore:"dlUrl" json:"dlUrl"`
	Platform string `datastore:"platform" json:"platform"`
}

type Image struct {
    URL string `datastore:"url"`
}

// corsMiddleware adds CORS headers to the response
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*") // Allow any origin
        w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

        // If this is a preflight request, the method will be OPTIONS,
        // so call the handler only if the method is not OPTIONS
        if r.Method != "OPTIONS" {
            next(w, r)
        }
    }
}

func tracksHandler(w http.ResponseWriter, r *http.Request) {
    projectID := os.Getenv("DATASTORE_PROJECT_ID")
    if projectID == "" {
        http.Error(w, "Internal server error", http.StatusInternalServerError)
        log.Println("DATASTORE_PROJECT_ID environment variable not set")
        return
    }

    ctx := context.Background()
    client, err := datastore.NewClient(ctx, projectID)
    if err != nil {
        http.Error(w, "Internal server error", http.StatusInternalServerError)
        log.Printf("Failed to create Datastore client: %v", err)
        return
    }
    defer client.Close()

    var tracks []Track
    query := datastore.NewQuery("track") // Assuming your entity is named "track"
    _, err = client.GetAll(ctx, query, &tracks)
    if err != nil {
        http.Error(w, "Failed to fetch tracks", http.StatusInternalServerError)
        log.Printf("Failed to get tracks: %v", err)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(tracks); err != nil {
        http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
        log.Printf("Error encoding JSON: %s", err)
        return
    }
}

func imagesHandler(w http.ResponseWriter, r *http.Request) {
    ctx := context.Background()

    // Create a client.
    projectID := os.Getenv("DATASTORE_PROJECT_ID")
    if projectID == "" {
        http.Error(w, "DATASTORE_PROJECT_ID environment variable not set", http.StatusInternalServerError)
        return
    }

    client, err := datastore.NewClient(ctx, projectID)
    if err != nil {
        http.Error(w, "Failed to create Datastore client", http.StatusInternalServerError)
        log.Printf("Failed to create Datastore client: %v", err)
        return
    }
    defer client.Close()

    // Query Datastore for all `Image` entities.
    var images []Image
    query := datastore.NewQuery("image")
    _, err = client.GetAll(ctx, query, &images)
    if err != nil {
        http.Error(w, "Failed to fetch images", http.StatusInternalServerError)
        log.Printf("Failed to get images: %v", err)
        return
    }

    // Extract URLs from the images.
    var urls []string
    for _, img := range images {
        urls = append(urls, img.URL)
    }

    // Send the URLs as a JSON response.
    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(urls); err != nil {
        http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
        log.Printf("Error encoding JSON: %s", err)
        return
    }
}


func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    http.HandleFunc("/api/v1/tracks", corsMiddleware(tracksHandler))
    http.HandleFunc("/api/v1/images", corsMiddleware(imagesHandler))
    log.Println("Server starting on port 8080...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
