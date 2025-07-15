export interface readReportState {
  _id: string;
  productId: {
    _id: string;
    name: string;
  };
  bookingId: {
    _id: string;
    bookingDate: string;
    startTime: string;
    mainTraveller: {
      email: string;
    };
  };
  createdBy: {
    _id: string;
    firstname: string;
    lastname: string;
  };
}

export interface reportState {
  productId: string | { _id: string; name: string; isPrivate: boolean };
  bookingId: string;
  earn: number;
  break: number;
  feedback: string;
  files: File[];
  startTime: string;
  endTime: string;
  createdAt?: string;
  updatedAt?: string;
}
