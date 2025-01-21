


import json
from flask_cors import CORS
from flask import Flask, request, jsonify

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load contacts from a file
def load_contacts():
    try:
        with open("contacts.json", "r") as file:
            return json.load(file)  # Load the JSON file as a list of objects
    except FileNotFoundError:
        return []

# Save contacts to a file with formatted JSON
def save_contacts(contacts):
    with open("contacts.json", "w") as file:
        json.dump(contacts, file, indent=4)  # Use indent=4 for better formatting

# Route to view all contacts
@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    contacts = load_contacts()
    return jsonify(contacts)

# Route to add a new contact
@app.route('/api/contacts', methods=['POST'])
def add_contact():
    data = request.get_json()
    name = data['name']
    phone = data['phone']
    email = data['email']
    
    contacts = load_contacts()
    
    contact = {'name': name, 'phone': phone, 'email': email}
    contacts.append(contact)
    
    save_contacts(contacts)
    
    return jsonify(contact), 201

# Route to delete a contact
@app.route('/api/contacts/<string:name>', methods=['DELETE'])
def delete_contact(name):
    contacts = load_contacts()
    for contact in contacts:
        if contact['name'].lower() == name.lower():
            contacts.remove(contact)
            save_contacts(contacts)
            return jsonify({'message': f"Contact '{name}' deleted."}), 200
    return jsonify({'message': f"Contact '{name}' not found."}), 404

# Route to search for a contact by name
@app.route('/api/contacts/search/<string:name>', methods=['GET'])
def search_contact(name):
    contacts = load_contacts()
    for contact in contacts:
        if contact['name'].lower() == name.lower():
            return jsonify(contact)
    return jsonify({'message': f"Contact '{name}' not found."}), 404

# Route to update a contact
@app.route('/api/contacts/<string:name>', methods=['PUT'])
def update_contact(name):
    data = request.get_json()  # Get the updated contact info from the request body
    contacts = load_contacts()

    for contact in contacts:
        if contact['name'].lower() == name.lower():
            contact['name'] = data.get('name', contact['name'])  # Update name
            contact['phone'] = data.get('phone', contact['phone'])  # Update phone
            contact['email'] = data.get('email', contact['email'])  # Update email
            save_contacts(contacts)
            return jsonify({'message': f"Contact '{name}' updated successfully."}), 200

    return jsonify({'message': f"Contact '{name}' not found."}), 404

# Run the Flask app
if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)