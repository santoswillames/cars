import React, { ReactNode } from "react";

interface HeaderActionsProps {
  children: ReactNode;
}

export function HeaderActions({ children }: HeaderActionsProps) {
  return <>{children}</>;
}
