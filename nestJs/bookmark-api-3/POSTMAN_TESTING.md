# Postman Testing Guide

## Overview

This directory contains Postman configuration files for testing the Bookmark API.

## Files

- **postman-collection.json** - Contains all API endpoints and test scripts
- **postman-environment.json** - Environment variables for the API base URL

## Setup Instructions

### 1. Import the Collection

1. Open Postman
2. Click **File** → **Import**
3. Select `postman-collection.json`
4. Click **Import**

### 2. Import the Environment

1. Click on **Environments** in the left sidebar
2. Click **Import**
3. Select `postman-environment.json`
4. Click **Import**

### 3. Select the Environment

1. In the top-right corner of Postman, select **Bookmark API - Local** from the environment dropdown

## API Endpoints

### 1. Create Bookmark

- **Method**: POST
- **URL**: `http://localhost:3000/bookmarks`
- **Body**:
  ```json
  {
    "url": "https://www.example.com",
    "title": "Example Website",
    "description": "Optional description",
    "tags": ["optional", "tags"]
  }
  ```
- **Tests**: Validates status code, response structure, and stores bookmark ID for later use

### 2. Get All Bookmarks

- **Method**: GET
- **URL**: `http://localhost:3000/bookmarks`
- **Tests**: Validates response is an array and contains required fields

### 3. Get Bookmark by ID

- **Method**: GET
- **URL**: `http://localhost:3000/bookmarks/{id}`
- **Tests**: Validates bookmark exists and returns correct data

### 4. Update Bookmark

- **Method**: PATCH
- **URL**: `http://localhost:3000/bookmarks/{id}`
- **Body**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated description",
    "tags": ["updated", "tags"]
  }
  ```
- **Tests**: Validates update was successful

### 5. Delete Bookmark

- **Method**: DELETE
- **URL**: `http://localhost:3000/bookmarks/{id}`
- **Tests**: Validates successful deletion

### 6. Error Handling Test

- Tests 404 response when bookmark not found

### 7. Create Bookmark (Minimal)

- Tests creating a bookmark with only required fields

## Running the Tests

### Run Individual Test

1. Select a request from the collection
2. Click **Send**
3. View test results in the **Test Results** tab

### Run the Entire Collection

1. Click the collection name in the left sidebar
2. Click the **Run** button
3. In the Collection Runner:
   - Select the environment: **Bookmark API - Local**
   - Configure iterations and delay as needed
   - Click **Run Bookmark API**

## Environment Variables

The collection uses the following variables:

- `{{base_url}}` - The API base URL (default: http://localhost:3000)
- `{{bookmark_id}}` - Automatically populated after creating a bookmark

## Notes

- The "Create Bookmark" request must be run before "Get Bookmark by ID" or "Update Bookmark" to populate the `bookmark_id` variable
- For automated collection runs, execute requests in this order:
  1. Create Bookmark
  2. Get All Bookmarks
  3. Get Bookmark by ID
  4. Update Bookmark
  5. Delete Bookmark

## Troubleshooting

**Connection Refused**

- Ensure the NestJS API is running on port 3000
- Run `npm run start` in the project directory

**Tests Not Running**

- Make sure the environment is selected in the top-right dropdown
- Check that test scripts are enabled

**Variable Issues**

- Manually set `bookmark_id` in the environment if needed
- Use the value from a successful "Create Bookmark" response
