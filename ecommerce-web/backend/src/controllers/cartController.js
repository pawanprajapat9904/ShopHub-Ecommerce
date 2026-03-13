exports.getCart = async (req, res) => {

  try {

    res.json({
      message: "Cart handled on frontend"
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};