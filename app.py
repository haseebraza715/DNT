from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os

app = Flask(__name__)
CORS(app)

MONGODB_URI = "mongodb+srv://haseebjaved715:HNpNDoXwsnIXwFgf@cluster0.yxvzb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# MongoDB setup (ensure MONGODB_URI is set correctly in environment)
client = MongoClient(MONGODB_URI)
db = client["notes_db"]
notes_collection = db["notes"]



# Route to get all notes
@app.route('/notes', methods=['GET'])
def get_notes():
    notes = list(notes_collection.find({}, {"_id": 1, "title": 1, "content": 1, "tags": 1}))
    for note in notes:
        note["_id"] = str(note["_id"])  # Convert ObjectId to string for JSON serialization
    return jsonify(notes), 200

# Route to add a new note
@app.route('/notes', methods=['POST'])
def create_note():
    note_data = request.get_json()
    # Check if tags is a string and split it; otherwise, assume it's already a list
    if isinstance(note_data.get("tags"), str):
        note_data["tags"] = note_data["tags"].split(",")  # Split tags into a list if it's a string
    result = notes_collection.insert_one(note_data)
    return jsonify({"message": "Note added successfully", "id": str(result.inserted_id)}), 201


@app.route('/notes/<string:id>', methods=['PUT'])
def update_note_by_id(id):
    updated_data = request.get_json()
    # Check if tags is a string and split it; otherwise, assume it's already a list
    if isinstance(updated_data.get("tags"), str):
        updated_data["tags"] = updated_data["tags"].split(",")  # Ensure tags are stored as list
    result = notes_collection.update_one({"_id": ObjectId(id)}, {"$set": updated_data})
    if result.matched_count:
        return jsonify({"message": "Note updated successfully"}), 200
    else:
        return jsonify({"message": "Note not found"}), 404

# Route to delete a note by its _id
@app.route('/notes/<string:id>', methods=['DELETE'])
def delete_note_by_id(id):
    result = notes_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count:
        return jsonify({"message": "Note deleted successfully"}), 200
    else:
        return jsonify({"message": "Note not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
