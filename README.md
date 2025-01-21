
# Full Stack Project: Flask Backend & Next.js Frontend

This project consists of:
- **Backend**: A Python Flask server (`app.py`) that provides API endpoints.
- **Frontend**: A Next.js application with TypeScript for the user interface.

---

## Prerequisites

Make sure the following are installed on your system:
- Python 3.x
- `pip` (Python package manager)
- Node.js (LTS version recommended)
- `npm` or `yarn` (Node package managers)

---

## Backend: Flask API

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Navigate to the Backend Folder**:
   If the backend is in a specific folder (e.g., `backend`), move into that directory:
   ```bash
   cd backend
   ```

3. **Create a Virtual Environment** (optional but recommended):
   ```bash
   python3 -m venv myenv
   source myenv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install Dependencies**:
   Install the required Python libraries:
   ```bash
   pip install -r requirements.txt
   ```

   > If you don’t have a `requirements.txt` file, generate it:
   ```bash
   pip freeze > requirements.txt
   ```

### Running the Backend Server

1. **Start the Server**:
   Run the Flask app with:
   ```bash
   python3 app.py
   ```

2. **Access the API**:
   - The server runs at `http://127.0.0.1:5000` by default.
   - Use tools like Postman or `curl` to test endpoints.

3. **API Endpoints**:
   Document any API endpoints here:
   - `GET /example`: Returns an example response.
   - `POST /example`: Accepts data and processes it.

---

## Frontend: Next.js with TypeScript

### Installation

1. **Navigate to the Frontend Folder**:
   If the frontend is in a specific folder (e.g., `frontend`), move into that directory:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   Install the required Node.js packages:
   ```bash
   npm install
   ```
   Or, if you use `yarn`:
   ```bash
   yarn
   ```

### Running the Frontend Development Server

1. **Start the Next.js App**:
   Run the development server with:
   ```bash
   npm run dev
   ```
   Or, if you use `yarn`:
   ```bash
   yarn dev
   ```

2. **Access the App**:
   - The app runs at `http://localhost:3000` by default.
   - Open your browser and navigate to the URL.

### Connecting to the Backend

To make API calls to the Flask backend:
- Update the API base URL in the frontend project.
- Create an `api` utility file (e.g., `utils/api.ts`) for making HTTP requests.

Example `utils/api.ts`:
```typescript
const API_BASE_URL = "http://127.0.0.1:5000";

export async function fetchExampleData() {
  const response = await fetch(`${API_BASE_URL}/example`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
```

---

## Running the Full Stack Project

1. Open two terminals:
   - Terminal 1: Navigate to the `backend` folder and run:
     ```bash
     python3 app.py
     ```
   - Terminal 2: Navigate to the `frontend` folder and run:
     ```bash
     npm run dev
     ```

2. The frontend will communicate with the backend to fetch or post data.
