const { app } = require("./server");

app.get("/signup", (req, res) => {
  res.send("Hello from backend");
});
