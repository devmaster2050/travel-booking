"use client";
import ReadOperations from "@/components/Operations/ReadOperations";
import ReadOperationSearch from "@/components/Operations/ReadOperationSearch";
import TotalResults from "@/components/Operations/TotalResults";
import RoleProvider from "@/providers/RoleProvider";
import { AppDispatch } from "@/store";
import {
  getOperaionBookingsAction,
  OperationLoading,
  setGuideAndDriverAction,
} from "@/store/operations";
import {
  GuideAndDriverState,
  OperationBookingState,
  OperationSearchState,
} from "@/types/app/operation";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./styles.scss";
import { getEmployeesWithRoleAction } from "@/store/employee";
import { RoleMembersState } from "@/types/app/employee";
import PurePagination from "@/Common/PurePagination";

function page() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(OperationLoading);
  const [search, setSearch] = useState<OperationSearchState>({
    type: "month",
    year: new Date().getFullYear().toString(),
    quarter: "",
    month: (new Date().getMonth() + 1).toString(),
    week: "",
    day: "",
    sortField: "",
    sortOrder: "",
  });
  const [bookings, setBookings] = useState<{
    data: OperationBookingState[];
    page: number;
    perPage: number;
    totalPages: number;
  }>({
    data: [] as OperationBookingState[],
    page: 1,
    perPage: 10,
    totalPages: 0,
  });

  const { data, page, perPage, totalPages } = bookings;
  const [roleMembers, setRoleMembers] = useState<RoleMembersState[]>([]);
  const [inMonth, setInMonth] = useState({ weeks: 5, days: 31 });

  const trustSearch = useMemo(() => search, [search]);

  const fetchOperationBookings = async () => {
    const { payload } = await dispatch(
      getOperaionBookingsAction({ ...trustSearch, page: page, limit: perPage })
    );
    console.log(payload);
    if (payload?.["data"]) {
      setBookings((pre) => ({ ...pre, ...payload }));
    } else {
      if (payload && "error" in payload) {
        // toast.error(String(payload.error));
      }
    }
  };

  const fetchEmployeesWithRole = async () => {
    const { payload } = await dispatch(getEmployeesWithRoleAction({}));
    if (payload?.["data"]) {
      setRoleMembers(payload.data);
    } else {
      if (payload && "error" in payload) {
        // toast.error(String(payload.error));
      }
    }
  };

  useEffect(() => {
    fetchOperationBookings();
    fetchEmployeesWithRole();
  }, [trustSearch, page, perPage]);

  const handleSearchTypeChange = (value: string) => {
    setSearch((prevDate) => ({
      ...prevDate,
      type: value,
      quarter: value === "quarter" ? "1" : "",
      month: value !== "quarter" ? "1" : "",
      week: value === "week" ? "1" : "",
      day: value === "day" ? "1" : "",
    }));
  };

  const handleSearchFieldChange = (field: string, value: string | number) => {
    setSearch((prevDate) => ({
      ...prevDate,
      [field]: value,
    }));
  };

  const onChangeGuideAndDriver = async (data: GuideAndDriverState) => {
    const { payload } = await dispatch(setGuideAndDriverAction(data));
    if (payload && "message" in payload) {
      setBookings((pre) => ({
        ...pre,
        data: pre.data.map((book) => {
          return {
            ...book,
            bookings: book.bookings.map((booking) => {
              if (booking._id === data._id) {
                return {
                  ...booking,
                  guide: data?.guide ?? "",
                  driver: data?.driver ?? "",
                };
              } else return booking;
            }),
          };
        }),
      }));
      toast.success(payload.message);
    } else if (payload && "error" in payload) {
      toast.error(payload.error);
    }
  };

  const generateOptions = (length: number) => {
    return Array.from({ length: length }, (_, index) => (
      <option key={index} value={index + 1}>
        {index + 1}
      </option>
    ));
  };

  const calculateWeeksInMonth = useCallback(
    (month: string, year: string) => {
      const daysInMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
      const weeks = Math.ceil(daysInMonth / 7);
      setInMonth((prev) => ({ ...prev, weeks }));
    },
    [search.month, search.year]
  );

  const calculateDaysInMonth = useCallback(
    (month: string, year: string) => {
      const days = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
      setInMonth((prev) => ({ ...prev, days }));
    },
    [search.month, search.year]
  );

  const handlePages = (type: string, value: number | string) => {
    if (type === "perPage")
      setBookings((pre) => ({ ...pre, page: 1, perPage: Number(value) }));
    else setBookings((pre) => ({ ...pre, [type]: value }));
  };

  useEffect(() => {
    if (search.type === "week") {
      calculateWeeksInMonth(search.month, search.year);
    } else if (search.type === "day") {
      calculateDaysInMonth(search.month, search.year);
    }
  }, [search.month, search.year, search.type]);

  return (
    <RoleProvider target="Operation">
      <div>
        <ReadOperationSearch
          {...{
            search,
            inMonth,
            handleSearchTypeChange,
            handleSearchFieldChange,
            generateOptions,
            roleMembers,
          }}
        />
        <TotalResults {...{ bookings: bookings.data }} />
        <ReadOperations
          {...{
            trustBookings: bookings.data,
            search,
            setSearch,
            roleMembers,
            onChangeGuideAndDriver,
          }}
        />
        <PurePagination
          {...{
            pages: { page, perPage, totalPages },
            handlePages,
            loading,
          }}
        />
      </div>
    </RoleProvider>
  );
}

export default page;
