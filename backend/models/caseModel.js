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
