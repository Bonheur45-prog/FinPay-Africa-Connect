import crossBorder from "./crossBorder";
import cards from "./cards";
import kyc from "./kyc";
import diaspora from "./diaspora";
import api from "./api";

export const solutions = {
  "cross-border": crossBorder,
  "payments": crossBorder,  // Alias for navigation link
  api,
  diaspora,
  cards,
  kyc,
};