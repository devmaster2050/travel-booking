import { RoleMembersState } from "@/types/app/employee";
import { OperationSearchState } from "@/types/app/operation";
import React, { ReactNode } from "react";

function ReadOperationSearch({
  search,
  inMonth,
  handleSearchTypeChange,
  handleSearchFieldChange,
  generateOptions,
  roleMembers,
}: {
  search: OperationSearchState;
  inMonth: { weeks: number; days: number };
  handleSearchTypeChange: (value: string) => void;
  handleSearchFieldChange: (field: string, value: string) => void;
  generateOptions: (length: number) => ReactNode;
  roleMembers: RoleMembersState[];
}) {
  return (
    <div className="g-3 header">
      <label className="form-label-title px-1">
        Criteria
        <select
          className="form-control"
          value={search.type}
          onChange={(e) => handleSearchTypeChange(e.target.value)}
        >
          <option value="quarter">Quarter</option>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>
      </label>
      <label className="form-label-title px-1">
        Year
        <select
          className="form-control"
          value={search.year}
          onChange={(e) => handleSearchFieldChange("year", e.target.value)}
        >
          <option value={new Date().getFullYear()}>
            {new Date().getFullYear()}
          </option>
          <option value={new Date().getFullYear() - 1}>
            {new Date().getFullYear() - 1}
          </option>
          <option value={new Date().getFullYear() - 2}>
            {new Date().getFullYear() - 2}
          </option>
          <option value={new Date().getFullYear() - 3}>
            {new Date().getFullYear() - 3}
          </option>
          <option value={new Date().getFullYear() - 4}>
            {new Date().getFullYear() - 4}
          </option>
          <option value={new Date().getFullYear() - 5}>
            {new Date().getFullYear() - 5}
          </option>
        </select>
      </label>
      {search.type === "quarter" && (
        <label className="form-label-title px-1">
          Quarter
          <select
            className="form-control"
            value={search.quarter}
            onChange={(e) => handleSearchFieldChange("quarter", e.target.value)}
          >
            {generateOptions(4)}
          </select>
        </label>
      )}

      {search.type !== "quarter" && (
        <label className="form-label-title px-1">
          Month
          <select
            className="form-control"
            value={search.month}
            onChange={(e) => handleSearchFieldChange("month", e.target.value)}
          >
            {generateOptions(12)}
          </select>
        </label>
      )}
      {search.type === "week" && (
        <label className="form-label-title px-1">
          Week
          <select
            className="form-control"
            value={search.week}
            onChange={(e) => handleSearchFieldChange("week", e.target.value)}
          >
            {generateOptions(inMonth.weeks)}
          </select>
        </label>
      )}
      {search.type === "day" && (
        <label className="form-label-title px-1">
          Day
          <select
            className="form-control"
            value={search.day}
            onChange={(e) => handleSearchFieldChange("day", e.target.value)}
          >
            {generateOptions(inMonth.days)}
          </select>
        </label>
      )}
      <span className="spacer"></span>
      <label className="form-label-title px-1">
        Guider
        <select className="form-control">
          <option value="all">All</option>
          {roleMembers.map((member) => (
            <option key={member._id} value={member.firstname}>
              {member.firstname + " " + member.lastname}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default ReadOperationSearch;
