const mongoose = require("mongoose")
const ApplicationFormSchema = new mongoose.Schema(
  {
    state: { type: String, required: true },
    businessName: { type: Boolean, default: false },
    physicalAddress: { type: Boolean, default: false },
    mailingAddress: { type: Boolean, default: false },
    raName: { type: Boolean, default: false },
    raPhysicalAddress: { type: Boolean, default: false },
    raMailingAddress: { type: Boolean, default: false },
    raSignature: { type: Boolean, default: false },
    naicCodes: { type: Boolean, default: false },
    managementType: { type: Boolean, default: false },
    members: { type: Boolean, default: false },
    memberPhysicalAddress: { type: Boolean, default: false },
    memberMailingAddress: { type: Boolean, default: false },
    addOrganizer: { type: Boolean, default: false },
    organizerAddress: { type: Boolean, default: false },
    directKnowledge: { type: Boolean, default: false },
    purpose: { type: Boolean, default: false },
    OA: { type: Boolean, default: false },
    authorizedAgent: { type: Boolean, default: false },
    pllc: { type: Boolean, default: false },
    foreign: { type: Boolean, default: false },
    numberOfOfficers: { type: Boolean, default: false },
    officerPhysicalAddress: { type: Boolean, default: false },
    officerMailingAddress: { type: Boolean, default: false },
    numberofDirectors: { type: Boolean, default: false },
    directorPhysicalAddress: { type: Boolean, default: false },
    directorMailingAddress: { type: Boolean, default: false },
    addIncorporator: { type: Boolean, default: false },
    incorporatorAddress: { type: Boolean, default: false },
    preferredLanguage: { type: Boolean, default: false },
    partnershipCostUpCharge: { type: Boolean, default: false },
    owner: { type: Boolean, default: false },
    ownerAddress: { type: Boolean, default: false },
    paRequired: { type: Boolean, default: false },
    notes: { type: Boolean, default: false },
    responsiblePartyName: { type: Boolean, default: false },
    responsiblePartySSN: { type: Boolean, default: false },
    numberOfMembers: { type: Boolean, default: false },
    type: { type: String, default: "" }
  },
  {
    timestamps: true
  }
)
const ApplicationForm = mongoose.model(
  "applicationFormSchema",
  ApplicationFormSchema
)
module.exports = ApplicationForm
