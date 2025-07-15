"use client";
import React, { useState } from "react";

const CostCenter = () => {
  return (
    <table className="user-table table table-striped">
      <thead>
        <tr>
          <th>Link</th>
          <th>Final Price</th>
          <th>Account</th>
          <th>VAT</th>
          <th>Payment Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default CostCenter;
