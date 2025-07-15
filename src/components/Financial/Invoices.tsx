"use client";
import React, { useState } from "react";

const Invoices = () => {
  return (
    <table className="user-table table table-striped">
      <thead>
        <tr>
          <th>Tour Name</th>
          <th>Participants</th>
          <th>Total Price (incl.VAT)</th>
          <th>Account</th>
          <th>Deposit Payment (Amount & Date)</th>
          <th>Final Payment (Amount & Date)</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default Invoices;
