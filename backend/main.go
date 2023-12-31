package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/joho/godotenv"
)

var (
	// Global Datastore client
	datastoreClient *datastore.Client
)

func setup() {
	// Load environment variables
	if _, err := os.Stat(".env"); !os.IsNotExist(err) {
		if err := godotenv.Load(); err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	// Initialize the Datastore client
	ctx := context.Background()
	projectID := os.Getenv("DATASTORE_PROJECT_ID")
    log.Println(projectID)
	if projectID == "" {
		log.Fatal("DATASTORE_PROJECT_ID environment variable not set")
	}

	var err error
	datastoreClient, err = datastore.NewClient(ctx, projectID)
	if err != nil {
		log.Fatalf("Failed to create Datastore client: %v", err)
	}

  
    
}

// Struct for "about" kind in Datastore
type About struct {
	Content string `datastore:"content"`
}

// Struct for "track" kind in Datastore
type Track struct {
	TrackID  string `datastore:"id" json:"id"`
	DlURL    string `datastore:"dlUrl" json:"dlUrl"`
	Platform string `datastore:"platform" json:"platform"`
}

// Struct for "image" kind in Datastore
type Image struct {
	URL string `datastore:"url"`
}

// corsMiddleware adds CORS headers to the response
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	log.Println("Middleware call...")
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
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var tracks []Track
	query := datastore.NewQuery("track")

	// Use the global Datastore client
	_, err := datastoreClient.GetAll(ctx, query, &tracks)

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
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Query Datastore for all `Image` entities.
	var images []Image
	query := datastore.NewQuery("image")

	// Use the global Datastore client
	_, err := datastoreClient.GetAll(ctx, query, &images)
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

func aboutHandler(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var about []About
	query := datastore.NewQuery("about").Limit(1) // Limit to 1 result

	// Use the global Datastore client
	_, err := datastoreClient.GetAll(ctx, query, &about)
	if err != nil {
		http.Error(w, "Failed to fetch about", http.StatusInternalServerError)
		log.Printf("Failed to get about: %v", err)
		return
	}

	// Send the "about" content as a JSON response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(about); err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		log.Printf("Error encoding JSON: %s", err)
		return
	}
}

func main() {
	setup()

	http.HandleFunc("/v1/tracks", corsMiddleware(tracksHandler))
	http.HandleFunc("/v1/images", corsMiddleware(imagesHandler))
	http.HandleFunc("/v1/about", corsMiddleware(aboutHandler)) // Add route for /v1/about
	log.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
