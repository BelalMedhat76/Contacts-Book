


"use client";
import { useState, useEffect } from "react";

type Contact = {
  name: string;
  phone: string;
  email: string;
};

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<Contact>({ name: "", phone: "", email: "" });
  const [searchName, setSearchName] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [editContact, setEditContact] = useState<Contact | null>(null);

  // Fetch contacts from the backend API
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await fetch("http://localhost:5000/api/contacts");
    const data: Contact[] = await res.json();
    setContacts(data);
  };

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.phone || !newContact.email) {
      setAlertMessage("Please fill all the fields before submitting.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    const res = await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    });

    if (res.ok) {
      setNewContact({ name: "", phone: "", email: "" });
      fetchContacts();
      setShowAlert(false);
    }
  };

  const handleDeleteContact = async (name: string) => {
    const res = await fetch(`http://localhost:5000/api/contacts/${name}`, { method: "DELETE" });

    if (res.ok) fetchContacts();
  };

  const handleSearch = async () => {
    if (!searchName) {
      setAlertMessage("Please enter a search term.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    const res = await fetch(`http://localhost:5000/api/contacts/search/${searchName}`);
    const data: Contact | { message: string } = await res.json();

    if ("message" in data) {
      setAlertMessage(data.message);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      setContacts([data]);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditContact(contact);
  };

  const handleUpdateContact = async () => {
    if (!editContact) return;

    const res = await fetch(`http://localhost:5000/api/contacts/${editContact.name}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editContact),
    });

    if (res.ok) {
      setEditContact(null);
      fetchContacts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {showAlert && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-4 rounded-lg shadow-lg">
          <p>{alertMessage}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start max-w-6xl mx-auto bg-gray-800 p-6 rounded-lg shadow-xl">
        <div className="w-full max-w-md space-y-6 mb-8 md:mb-0 md:w-1/3">
          <h1 className="text-4xl font-bold text-center text-indigo-500 mb-8">Contact Book</h1>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Add Contact</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full text-white bg-gray-700 p-3 border border-gray-600 rounded-lg focus:outline-none"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full text-white bg-gray-700 p-3 border border-gray-600 rounded-lg focus:outline-none"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full text-white bg-gray-700 p-3 border border-gray-600 rounded-lg focus:outline-none"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              />
              <button
                onClick={handleAddContact}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
              >
                Add Contact
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Search Contact</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search by name"
                className="w-full text-white bg-gray-700 p-3 border border-gray-600 rounded-lg"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-xl overflow-y-auto max-h-[500px] md:w-2/3">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Contacts</h2>
          <ul className="space-y-4">
            {contacts.map((contact) => (
              <li
                key={contact.name}
                className="flex justify-between items-center p-4 bg-gray-700 rounded-lg shadow-md"
              >
                <div>
                  <p className="font-semibold text-indigo-300">{contact.name}</p>
                  <p className="text-gray-400">{contact.phone}</p>
                  <p className="text-gray-400">{contact.email}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditContact(contact)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.name)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {editContact && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-400 mb-4">Edit Contact</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={editContact.name}
                onChange={(e) => setEditContact({ ...editContact, name: e.target.value })}
                className="w-full text-white bg-gray-700 p-3 border border-gray-600 rounded-lg"
              />
              <input
                type="text"
                value={editContact.phone}
                onChange={(e) => setEditContact({ ...editContact, phone: e.target.value })}
                className="w-full text-white bg-gray-700 p-3 border border-gray-600 rounded-lg"
              />
              <input
                type="email"
                value={editContact.email}
                onChange={(e) => setEditContact({ ...editContact, email: e.target.value })}
                className="w-full text-white bg-gray-700 p-3 border border-gray-600 rounded-lg"
              />
              <button
                onClick={handleUpdateContact}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
              >
                Update Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
