import CostCenter from "@/components/Financial/CostCenter";
import RoleProvider from "@/providers/RoleProvider";
import React from "react";

function CostCenterPage() {
  return (
    <RoleProvider target="Financial">
      <div className="card">
        <div className="card-body">
          <CostCenter />
        </div>
      </div>
    </RoleProvider>
  );
}

export default CostCenterPage;
