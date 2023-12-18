const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const caseSchema = new mongoose.Schema(
  {
    objects: [{ type: mongoose.Schema.Types.ObjectId, ref: "ObjectModel" }],

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userID: {
      type: ObjectId,
      ref: "User", // Assuming "User" is the model for the user collection
      required: true,
    },
    // Petitioner Details
    petitioner: {
      name: {
        type: String,
        trim: true,
        required: [true, "Petitioner Name is required"],
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: [true, "Petitioner Gender is required"],
      },
      relation: {
        type: String,
        trim: true,
        required: [true, "Petitioner Relation is required"],
      },
      dateOfBirth: {
        type: Date,
        required: [true, "Date of Birth of Petitioner is required"],
      },
      age: {
        type: String,
        trim: true,
        required: [true, "Petitioner Age is required"],
      },
      caseDetails: {
        type: String,
        trim: true,
        required: [true, "Petitioner Case Details are required"],
      },
      extraName: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        required: [true, "Petitioner Email is required"],
      },
      occupation: {
        type: String,
        trim: true,
        required: [true, "Petitioner Occupation is required"],
      },
      mobileNumber: {
        type: Number,
        validate: {
          validator: function (v) {
            return /^\d{10}$/.test(v); // Mobile number validation (10 digits)
          },
          message: (props) => `${props.value} is not a valid mobile number!`,
        },
        required: [true, "Petitioner Mobile Number is required"],
      },
      pinCode: {
        type: Number,
        required: [true, "Petitioner Pin Code is required"],
      },
      address: {
        type: String,
        trim: true,
        required: [true, "Petitioner Address is required"],
      },
      state: {
        type: String,
        trim: true,
        required: [true, "Petitioner State is required"],
      },
      district: {
        type: String,
        trim: true,
        required: [true, "Petitioner District is required"],
      },
      taluka: {
        type: String,
        trim: true,
        required: [true, "Petitioner Taluka is required"],
      },
      village: {
        type: String,
        trim: true,
        required: [true, "Petitioner Village is required"],
      },
    },

    // Responder Details
    responder: {
      name: {
        type: String,
        trim: true,
        required: [true, "Responder Name is required"],
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: [true, "Responder Gender is required"],
      },
      relation: {
        type: String,
        trim: true,
        required: [true, "Responder Relation is required"],
      },
      dateOfBirth: {
        type: Date,
        required: [true, "Date of Birth of Responder is required"],
      },
      age: {
        type: Number,
        required: [true, "Responder Age is required"],
      },
      caseDetails: {
        type: String,
        trim: true,
        required: [true, "Responder Case Details are required"],
      },
      extraName: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        required: [true, "Responder Email is required"],
      },
      occupation: {
        type: String,
        trim: true,
        required: [true, "Responder Occupation is required"],
      },
      mobileNumber: {
        type: Number,
        validate: {
          validator: function (v) {
            return /^\d{10}$/.test(v); // Mobile number validation (10 digits)
          },
          message: (props) => `${props.value} is not a valid mobile number!`,
        },
        required: [true, "Responder Mobile Number is required"],
      },
      pinCode: {
        type: Number,
        required: [true, "Responder Pin Code is required"],
      },
      address: {
        type: String,
        trim: true,
        required: [true, "Responder Address is required"],
      },
      state: {
        type: String,
        trim: true,
        required: [true, "Responder State is required"],
      },
      district: {
        type: String,
        trim: true,
        required: [true, "Responder District is required"],
      },
      taluka: {
        type: String,
        trim: true,
        required: [true, "Responder Taluka is required"],
      },
      village: {
        type: String,
        trim: true,
        required: [true, "Responder Village is required"],
      },
    },

    // Case Details
    caseDetails: {
      mainDistrict: {
        type: String,
        trim: true,
        required: [true, "Main District is required"],
      },
      establishment: {
        type: String,
        trim: true,
        required: [true, "Establishment is required"],
      },
      natureOfCase: {
        type: String,
        enum: ["criminal", "civil"],
        required: [true, "Nature of Case is required"],
      },
      reliefSought: {
        type: String,
        trim: true,
        required: [true, "Relief Sought is required"],
      },
      caseType: {
        type: String,
        trim: true,
        required: [true, "Case Type is required"],
      },
      plaintiff: {
        type: String,
        trim: true,
        required: [true, "Plaintiff is required"],
      },
      contactNumber: {
        type: Number,
        validate: {
          validator: function (v) {
            return /^\d{10}$/.test(v); // Mobile number validation (10 digits)
          },
          message: (props) => `${props.value} is not a valid mobile number!`,
        },
        required: [true, "Contact Number is required"],
      },
    },

    // Other Case Details
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
    prayer: {
      type: String,
      trim: true,
      required: [true, "Prayer is required"],
    },
    valuation: {
      type: Number,
      required: [true, "Valuation is required"],
    },
    location: {
      state: {
        type: String,
        trim: true,
        required: [true, "State is required"],
      },
      district: {
        type: String,
        trim: true,
        required: [true, "District is required"],
      },
      taluka: {
        type: String,
        trim: true,
        required: [true, "Taluka is required"],
      },
      village: {
        type: String,
        trim: true,
        required: [true, "Village is required"],
      },
    },
    legalDetails: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);
