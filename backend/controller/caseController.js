const mongoose = require("mongoose");
const Case = require("../models/caseModel.js");
const User = require("../models/user.js");
const MasterCase = mongoose.model("MasterCase", Case.schema);
const { ObjectId } = require("mongodb");

exports.addCase = async (req, res) => {
  try {
    const { courtID, ...restOfData } = req.body;

    // Assuming req.user contains the user information
    const userID = req.user._id;

    // Create a new collection based on courtID
    const caseModel = mongoose.model(`Case_${courtID}`, Case.schema);

    // Create a new document using the specific model
    const newCase = new caseModel({ courtID, userID, ...restOfData });

    // Save the document to the specific courtID table
    await newCase.save();

    // Save the case ID to the user's cases array
    await User.findByIdAndUpdate(userID, { $addToSet: { cases: newCase._id } });

    // Update the mastercases table
    const masterCase = new MasterCase({ courtID, userID, ...restOfData });
    await masterCase.save();

    res.status(201).json({ message: "Case added successfully", case: newCase });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCases = async (req, res) => {
  try {
    const mastercases = await Case.find();
    res.json(mastercases);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updateCase = async (req, res) => {
  console.log("update case");
  const { id } = req.params;
  console.log(req.params);
  const { data } = req.body;
  console.log(data);
  try {
    const updatedCase = await Case.findByIdAndUpdate({ _id: id }, req.body);
    if (!updatedCase) {
      return res.status(404).json({ error: "Case not found" });
    }
    // console.log(updatedCase)
    await res.json({ message: "Case updated successfully", case: updatedCase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCase = async (req, res) => {
  console.log("delete case");
  const { caseId } = req.params;
  console.log(req.params);
  try {
    const deletedCase = await Case.findByIdAndDelete(caseId);
    if (!deletedCase) {
      return res.status(404).json({ error: "Case not found" });
    }
    res.json({ message: "Case deleted successfully", case: deletedCase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// for the judge dashboard
exports.getCasesByCourtType = async (req, res) => {
  try {
    const { courtType } = req.params;
    const cases = await Case.find({ courtType });
    res.json(cases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserCasesDetails = async (req, res, next) => {
    try {
        const userId = req.user.id;
        console.log("User ID:", userId);

        const user = await User.findById(userId).populate({
            path: "cases",
            populate: {
                path: "objects", // Adjust this path based on your Case model
            },
        });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        console.log("User Cases:", user.cases);

        // Log the objects within each case
        user.cases.forEach((caseItem) => {
            console.log(`Case ${caseItem._id}:`, caseItem);
        });

        res.status(200).json({
            success: true,
            cases: user.cases,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
