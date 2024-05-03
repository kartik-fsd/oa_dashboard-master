import React, { useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const options = [
  { label: "Active", value: "active" },
  { label: "Closed", value: "closed" },
  { label: "New", value: "new" },
  { label: "Hold", value: "hold" },
];

function Project() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  return (
    <main className="page-content">
      <Container fluid>
        <Card>
          <CardHeader
            className="d-flex justify-content-between align-items-center"
            style={{ padding: "13px" }}
          >
            <h5
              className="fw-600 fs-16"
              style={{
                letterSpacing: "2px",
                marginLeft: "15px",
                color: "#b83016",
              }}
            >
              Projects
            </h5>
            <div>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle
                  color="warning"
                  style={{ backgroundColor: "#ec5c24", color: "#f2f2f2" }}
                >
                  <i className="ri-filter-3-line align-bottom me-1 fs-14" />
                  Filter
                </DropdownToggle>
                <DropdownMenu>
                  {options.map((option) => (
                    <DropdownItem key={option.value} value={option.value}>
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </CardHeader>
        </Card>
      </Container>
    </main>
  );
}

export default Project;
