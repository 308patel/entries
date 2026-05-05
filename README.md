# ⬡ No × 108 Ledger

A Node.js + Express + MongoDB app that stores entries of `no` and `total` (where `total = no × 108`), and displays the grand total of all entries.

---

## 🗂 Project Structure

```
nodexpress-mongo-app/
├── server.js           # App entry point
├── package.json        # Dependencies
├── models/
│   └── Entry.js        # Mongoose schema (no, total)
├── routes/
│   └── entries.js      # GET / POST routes
└── views/
    └── index.ejs       # EJS template (main UI)
```

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [MongoDB](https://www.mongodb.com/try/download/community) running locally on port 27017

### 2. Install Dependencies

```bash
cd nodexpress-mongo-app
npm install
```

### 3. Start MongoDB (if not already running)

```bash
# macOS / Linux
mongod

# Windows (run as admin)
net start MongoDB
```

### 4. Run the App

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

### 5. Open in Browser

```
http://localhost:3000
```

---

## ⚙️ Configuration

You can set these environment variables:

| Variable    | Default                              | Description          |
|-------------|--------------------------------------|----------------------|
| `PORT`      | `3000`                               | Server port          |
| `MONGO_URI` | `mongodb://localhost:27017/nototalsdb` | MongoDB connection   |

Example with custom MongoDB (e.g., MongoDB Atlas):

```bash
MONGO_URI="mongodb+srv://user:pass@cluster.mongodb.net/mydb" npm start
```

---

## 📋 Features

- **Add Entry**: Enter a number → `total = no × 108` is auto-calculated and saved.
- **Live Preview**: See the calculated total before submitting.
- **Delete Entry**: Remove any individual row.
- **Clear All**: Wipe the entire collection.
- **Grand Total**: Live sum of all `total` values shown at the bottom.
- **Stats Row**: Shows entry count, sum of NO values, and multiplier.

---

## 🗄 MongoDB Schema

```js
{
  no:        Number,   // user-provided number
  total:     Number,   // auto-calculated: no × 108
  createdAt: Date,     // auto (timestamps)
  updatedAt: Date      // auto (timestamps)
}
```

---

## 🛣 API Routes

| Method | Path          | Description            |
|--------|---------------|------------------------|
| GET    | `/`           | Show all entries       |
| POST   | `/add`        | Add new entry          |
| POST   | `/delete/:id` | Delete entry by ID     |
| POST   | `/clear`      | Delete all entries     |
