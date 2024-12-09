const express = require("express");
const { YoutubeTranscript } = require("youtube-transcript");

const app = express();
const PORT = process.env.PORT || 3004;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/transcript", async (req, res) => {
  const videoId = req.query.videoId;

  if (!videoId) {
    console.log("checking video id");
    return res.status(400).json({ error: "Video ID is required" });
  }

  try {
    console.log("before fetching transcript");
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    console.log("after fetching transcript");
    res.json(transcript);
    console.log("after sending response");
  } catch (error) {
    console.log("if got error");
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
