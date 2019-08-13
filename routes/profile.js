const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// * Ping API Route
router.get("/:platform/:gamertag", async (req, res) => {
  try {
    //! Header Autherntication for.API
    const headers = {
      "TRN-Api-Key": process.env.TRACKER_API_KEY
    };
    // * Destructure req.params
    const { platform, gamertag } = req.params;
    // * response handler
    const response = await fetch(
      `${process.env.TRACKER_API_URL}/profile/${platform}/${gamertag}`,
      {
        headers
      }
    );

    // ? stick the response in JSON format
    const data = await response.json();

    // If the error object is NOT empty perform following code..
    if (data.errors && data.errors.length > 0) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    // ? Handle Server Errors

    // * respond to client with JSON
    res.json(data);
  } catch (err) {
    // ! log error
    console.error(err);

    // serve client error message
    res.status(500).json({
      message: "Server Error! "
    });
  }
});

module.exports = router;
