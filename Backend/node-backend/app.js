const express = require("express");
const bodyParser = require("body-parser");

const { getStoredItems, storeItems } = require("./data/items");

const app = express();
const PORT = process.env.PORT || 8080; // ⬅️ Dynamic port

app.use(bodyParser.json());

// CORS setup
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// GET all items
app.get("/items", async (req, res) => {
  const storedItems = await getStoredItems();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.json({ items: storedItems });
});

// GET item by ID
app.get("/items/:id", async (req, res) => {
  const storedItems = await getStoredItems();
  const item = storedItems.find((item) => item.id === req.params.id);
  res.json({ item });
});

// POST new item
app.post("/items", async (req, res) => {
  const existingItems = await getStoredItems();
  const itemData = req.body;
  const newItem = {
    ...itemData,
    id: Math.random().toString(),
  };
  const updatedItems = [newItem, ...existingItems];
  await storeItems(updatedItems);
  res.status(201).json({ message: "Stored new item.", item: newItem });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
