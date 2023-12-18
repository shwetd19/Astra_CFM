const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const caseSchema = new mongoose.Schema(
  {
    objects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ObjectModel' }],
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userID: {
      type: ObjectId,
      ref: "User", // Assuming "User" is the model for the user collection
      required: true,
    },
    courtType: {
      type: String,
      enum: [
        "District Court",
        "High Court",
        "Supreme Court",
        "Magistrate Court",
      ],
      required: true,
    },
    courtID: {
      type: String,
      enum: ["DC001", "HC001", "SC001", "MC001"],
      required: true,
      // unique: true,
    },
    district: {
      type: String,
      trim: true,
      required: [true, "District is required"],
    },
    caseNature: {
      civil: {
        type: Boolean,
        default: false,
      },
      criminal: {
        type: Boolean,
        default: false,
      },
    },
    parties: {
      plaintiffName: {
        type: String,
        trim: true,
        required: [true, "Plaintiff Name is required"],
      },
      defendantName: {
        type: String,
        trim: true,
        required: [true, "Defendant Name is required"],
      },
      plaintiffMobileNumber: {
        type: Number,
        validate: {
          validator: function (v) {
            return /^\d{10}$/.test(v); // Mobile number validation (10 digits)
          },
          message: (props) => `${props.value} is not a valid mobile number!`,
        },
      },
    },
    facts: {
      factDate: {
        type: Date,
        required: [true, "Fact Date is required"],
      },
      factTime: {
        type: String,
        trim: true,
        match: [
          /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
          "Fact Time should be in HH:mm format",
        ],
        required: [true, "Fact Time is required"],
      },
      factDescription: {
        type: String,
        trim: true,
        required: [true, "Fact Description is required"],
      },
    },
    causeOfAction: {
      type: String,
      trim: true,
      required: [true, "Cause of Action is required"],
    },
    causeOfActionDate: {
      type: Date,
      required: [true, "Cause of Action Date is required"],
    },
    importantInformation: {
      type: String,
      trim: true,
      required: [true, "Important Information is required"],
    },
    valuation: {
      type: Number,
      required: [true, "Valuation is required"],
    },
    disputeArising: [
      {
        state: {
          type: String,
          trim: true,
          required: [true, "Dispute Arising State is required"],
        },
        district: {
          type: String,
          trim: true,
          required: [true, "Dispute Arising District is required"],
        },
        taluka: {
          type: String,
          trim: true,
          required: [true, "Dispute Arising Taluka is required"],
        },
      },
    ],
    legalDetails: [
      {
        act: {
          type: String,
          trim: true,
          required: [true, "Act is required"],
        },
        section: {
          type: String,
          trim: true,
          required: [true, "Section is required"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);


// Sample Input for best test-case :
/*
{
    "petitioner": {
        "name": "John Doe",
        "gender": "male",
        "relation": "Father",
        "dateOfBirth": "1990-01-15",
        "age": "32",
        "caseDetails": "Some details about the petitioner's case",
        "extraName": "John Jr.",
        "email": "john.doe@example.com",
        "occupation": "Engineer",
        "mobileNumber": 1234567890,
        "pinCode": 123456,
        "address": "123 Main Street",
        "state": "California",
        "district": "Los Angeles",
        "taluka": "Some Taluka",
        "village": "Some Village"
    },
    "responder": {
        "name": "Jane Doe",
        "gender": "female",
        "relation": "Mother",
        "dateOfBirth": "1988-05-20",
        "age": 35,
        "caseDetails": "Some details about the responder's case",
        "extraName": "Jane Jr.",
        "email": "jane.doe@example.com",
        "occupation": "Doctor",
        "mobileNumber": 9876543210,
        "pinCode": 654321,
        "address": "456 Oak Street",
        "state": "California",
        "district": "San Francisco",
        "taluka": "Some Taluka",
        "village": "Some Village"
    },
    "caseDetails": {
        "mainDistrict": "Some District",
        "establishment": "XYZ Corporation",
        "natureOfCase": "civil",
        "reliefSought": "Compensation for damages",
        "caseType": "Lawsuit",
        "plaintiff": "John Doe",
        "contactNumber": 9998887777
    },
    "facts": {
        "factDescription": "Some facts about the case",
        "factTime": "12:30",
        "factDate": "2023-01-15"
    },
    "parties": {
        "defendantName": "Jane Doe",
        "plaintiffName": "John Doe"
    },
    "district": "Some District",
    "courtType": "District Court",
    "courtID": "DC001",
    "causeOfAction": "Breach of contract",
    "causeOfActionDate": "2023-01-01",
    "importantInformation": "Some important details about the case",
    "prayer": "Seeking fair compensation",
    "valuation": 50000,
    "location": {
        "state": "California",
        "district": "San Francisco",
        "taluka": "Some Taluka",
        "village": "Some Village"
    },
    "legalDetails": {
        "act": "Some Legal Act",
        "section": "Some Section"
    }
}
*/