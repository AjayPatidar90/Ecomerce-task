import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const SidebarItems = [
    {
      name: "Dashboard",
      icon: "bi bi-grid",
      link: "/dashboard"
    },
    {
      name: "All Student",
      icon: "bi bi-people",
      link: "/admin/all-students"
    },
    {
      name: "All Teacher",
      icon: "bi bi-person-badge",
      link: "/admin/all-teachers"
    },
    {
      name: "All Employee",
      icon: "bi bi-briefcase",
      link: "/admin/all-employee"
    },
    {
      name: "Parent",
      icon: "bi bi-person-heart",
      link: "/admin/parent"
    },
    {
      name: "Timetable",
      icon: "bi bi-calendar-week",
      link: "/admin/time-table"
    },
    {
      name: "Settings",
      icon: "bi bi-gear",
      link: "/admin/settings"
    }
  ];

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {SidebarItems.map((item, index) => (
          <li className="nav-item" style={{ cursor: "pointer" }} key={index}>
            <div className="nav-link" onClick={() => navigate(item.link)}>
              <i className={item.icon}></i>
              <span>{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
