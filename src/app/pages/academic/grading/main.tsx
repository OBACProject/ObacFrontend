"use client";
import { useState } from "react";
import { Subject } from "./subject/subject";
import { ClassSubject } from "./classSubject/classSubject";

export function Main() {
  // Use state to manage the selected tab
  const [activeTab, setActiveTab] = useState<string>("subject");

  const handleTab = (tab: string) => {
    console.log("tab", tab);
    setActiveTab(tab); // Update active tab
  };

  return (
    <>
      <ClassSubject id={2} year={2024} term={1} />
      {/* Use the Subject component */}
      {/* <Subject handleTab={handleTab} /> */}

      {/* {activeTab === "subject" && (
        <div>
          <Subject handleTab={handleTab} />
        </div>
      )}
      {activeTab === "class" && <div>Class</div>}
      {activeTab === "student" && <div>Student</div>} */}
    </>
  );
}
