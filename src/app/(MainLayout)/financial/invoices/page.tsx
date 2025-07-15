import Invoices from "@/components/Financial/Invoices";
import RoleProvider from "@/providers/RoleProvider";
import React from "react";

function InvoicesPage() {
  return (
    <RoleProvider target="Financial">
      <div className="card">
        <div className="card-body">
          <Invoices />
        </div>
      </div>
    </RoleProvider>
  );
}

export default InvoicesPage;
