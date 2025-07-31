import {
  ProductDetailState,
  ProductTourState,
  ProductRevenueState,
} from "@/types/app/product";
import moment from "moment";

export const initialRevenue: ProductRevenueState = {
  clientTrainTicket: "",
  swissHalfFareTravelPass: "",
  mountainTicket1: "",
  mountainTicket2: "",
  boatTicket: "",
  tasting1: "",
  tasting2: "",
  tasting3: "",
  guideTrainTicket: "",
  transportation: "",
  childrenCost: "",
};

export const initialTour: ProductTourState = {
  destinationId: "",
  meetingLocation: null,
  isPrivate: false,
  withDriver: true,
  members: "15",
  times: [""],
  duration: "",
  revenue: initialRevenue,
  guideDetails: [{ position: "", pointsToCover: "" }],
  suppliers: [{ time: "", supplierId: null }],
  otaLive: [{ otaName: "", status: false, id: "" }],
};

export const initialProduct: ProductDetailState = {
  destinationId: "",
  tours: [initialTour],
  name: "",
  description: "",
  shortDescription: "",
  startDate: moment(Date.now()).format("YYYY-MM-DD"),
  endDate: null,
  blackOuts: [
    {
      startDate: moment(Date.now()).format("YYYY-MM-DD"),
      endDate: moment(Date.now()).format("YYYY-MM-DD"),
    },
  ],
  inclusions: [""],
  exclusions: [""],
  onlineMap: {
    center: { lat: 47.5596, lng: 7.5886 },
    markers: [],
    road: false,
  },
  bring: "",
  knowBefore: "",
  images: [],
  isActive: true,
  otaLive: [{ otaName: "", status: false, id: "" }],
  bookingDetails: {
    leadFullName: true,
    leadBirth: true,
    leadEmail: true,
    leadPhone: true,
    othersFullName: true,
    othersPhone: true,
    allergyQuestion: true,
    mobilityQuestion: true,
    medicalQuestion: true,
  },
};
