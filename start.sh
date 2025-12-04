#!/bin/bash

# Function to kill background processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p)
    exit
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

echo "Starting Backend..."
(
    cd backend
    npm start
) &

echo "Starting Frontend..."
(
    cd frontend
    npm start
) &

# Wait for all background processes
wait
