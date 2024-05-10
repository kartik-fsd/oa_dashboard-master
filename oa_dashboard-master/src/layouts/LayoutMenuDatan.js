import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../globalConfig";
import { extract_token } from "../assets/utils/common";
import axios from "axios";
import { oa_sow_list } from "../assets/utils/sow";

const Navdata1 = () => {
  const history = useHistory();

  // Slaes
  const [isCustomer, setIsCustomer] = useState(false);
  const [isSales, setIsSales] = useState(false);
  const [isProject, setIsProject] = useState(false);

  // Finance
  const [isProfitLoss, setIsProfitLoss] = useState(false);
  const [isOperationSales, setIsOperationSales] = useState(false);
  const [isPayout, setIsPayout] = useState(false);
  const [isCollection, setIsCollection] = useState(false);
  const [isFinance, setIsFinance] = useState(false);

  // Operations
  const [isOperations, setIsOperations] = useState(false);

  //Supply
  const [isAcquisition, setIsAcquisition] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [isMapping, setIsMapping] = useState(false);
  const [isSupply, setIsSupply] = useState(false);
  const [isProspect, setIsProspect] = useState(false);
  const [isQualified, setIsQualified] = useState(false);

  // Management
  const [isRevenue, setIsRevenue] = useState(false);
  const [isManagementFinance, setIsManagementFinance] = useState(false);
  const [isManagementSale, setIsManagementSales] = useState(false);
  const [isManagement, setIsManagement] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Sales");
  const [isQc, setIsQc] = useState(false);
  const [userType, setUserType] = useState("");
  const [sub_items, set_sub_items] = useState([]);
  const [isDashboard, setIsDashboard] = useState(false);
  const [isSow, setIsSow] = useState(true);

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    const pathName = api.OA_URL + oa_sow_list;

    token &&
      axios
        .get(pathName)
        .then((res) => {
          const arrayData = res.data?.data?.length > 0 ? res.data.data : [];

          arrayData?.map((arr) => {
            arr["id"] = arr.sow_id;
            arr.label = `${arr?.project_title} (${arr?.sow_id})`;
            arr.link = `/my-sows/${arr?.sow_id}-${arr?.project_title}`;
            arr.parentId = "Operations";
            arr.badgeName = arr.add_lead_status == "disable" ? "Hold" : "";
            arr.badgeColor = arr.add_lead_status == "disable" ? "danger" : "";
            arr.icon = `bx bx-right-arrow-alt`;
          });
          set_sub_items(arrayData);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [token]);

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Sales") {
      setIsSales(false);
    }
    if (iscurrentState !== "Operation") {
      setIsOperations(false);
    }
    if (iscurrentState !== "Finance") {
      setIsFinance(false);
    }
    if (iscurrentState !== "Supply") {
      setIsSupply(false);
    }
    if (iscurrentState !== "Management") {
      setIsManagement(false);
    }
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Sow") {
      setIsSow(false);
    }
    if (iscurrentState !== "qc") {
      setIsQc(false);
    }
  }, [
    history,
    iscurrentState,
    isSales,
    isOperations,
    isFinance,
    isSupply,
    isManagement,
    isDashboard,
    isSow,
    isQc,
  ]);

  useEffect(() => {
    const pathName = api.VENDOR_URL + extract_token;

    axios
      .get(pathName)

      .then((res) => {
        setUserType(res.data);

        console.log("respavan", res.data);
        sessionStorage.setItem("useraccesstype", res.data.type);
        sessionStorage.setItem("role", res.data.role);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sales = {
    id: "sales",
    label: "Sales",
    icon: "ri-dashboard-2-line",
    link: "/#",
    stateVariables: isSales,
    click: function (e) {
      e.preventDefault();
      setIsSales(!isSales);
      setIscurrentState("Sales");
      updateIconSidebar(e);
    },
    subItems: [
      {
        id: "customer",
        label: "Customer",
        link: "/#",
        parentId: "sales",
        isChildItem: true,
        click: function (e) {
          e.preventDefault();
          setIsCustomer(!isCustomer);
        },
        stateVariables: isCustomer,
        childItems: [
          {
            id: 1,
            label: "Client",
            link: "/business-dashboard/client",
            parentId: "sales",
          },
          {
            id: 2,
            label: "Company",
            link: "/business-dashboard/company",
            parentId: "sales",
          },
        ],
      },

      {
        id: "project",
        label: "Project",
        link: "/#",
        parentId: "sales",
        isChildItem: true,
        click: function (e) {
          e.preventDefault();
          setIsProject(!isProject);
        },
        stateVariables: isProject,
        childItems: [
          {
            id: 1,
            label: "Prospect",
            link: "/#",
            parentId: "sales",
            isChildItem: true,
            click: function (e) {
              e.preventDefault();
              setIsProspect(!isProspect);
            },
            stateVariables: isProspect,
            childItems: [
              {
                id: 1,
                label: "Lead Agreement",
                link: "/business-dashboard/agreement-list",
              },
              { id: 2, label: "Lead", link: "/business/leads" },
            ],
          },
          {
            id: 2,
            label: "Qualified",
            link: "/business/project/new",
            parentId: "sales",
          },
          {
            id: 3,
            label: "Active Projects",
            link: "/business/project/active",
            parentId: "sales",
          },
          {
            id: 4,
            label: "Closed Projects",
            link: "/business/project/closed",
            parentId: "sales",
          },
        ],
      },
    ],
  };

  const operation = {
    id: "operation",
    label: "Operations",
    icon: "ri-apps-2-line",
    link: "/#",
    click: function (e) {
      e.preventDefault();
      setIsOperations(!isOperations);
      setIscurrentState("Operation");
      updateIconSidebar(e);
    },
    stateVariables: isOperations,
    subItems: [
      {
        id: "newProject",
        label: "New projects",
        link: "/my-projects/new",
        parentId: "operation",
      },
      {
        id: "activeProject",
        label: "Active Projects",
        link: "/my-projects/active",
        parentId: "operation",
      },
      {
        id: "closedProject",
        label: "Closed Projects",
        link: "/my-projects/closed",
        parentId: "operation",
      },
    ],
  };

  const finance = {
    id: "finance",
    label: "Finance",
    icon: "ri-money-dollar-circle-line",
    link: "/#",
    click: function (e) {
      e.preventDefault();
      setIsFinance(!isFinance);
      setIscurrentState("Finance");
      updateIconSidebar(e);
    },
    stateVariables: isFinance,
    subItems: [
      {
        id: "collection",
        label: "Collection",
        link: "/#",
        isChildItem: true,
        click: function (e) {
          e.preventDefault();
          setIsCollection(!isCollection);
        },
        parentId: "finance",
        stateVariables: isCollection,
        childItems: [
          { id: 1, label: "AR Summary", link: "/finance/ar-summary" },
          {
            id: 2,
            label: "Collection Tracker",
            link: "/finance/ar-overdueinvoices",
          },
        ],
      },
      {
        id: "payout",
        label: "Payout",
        link: "/#",
        isChildItem: true,
        click: function (e) {
          e.preventDefault();
          setIsPayout(!isPayout);
        },
        parentId: "finance",
        stateVariables: isPayout,
        childItems: [
          { id: 1, label: "Payment Request", link: "/paymentrequest" },
          { id: 2, label: "Network Request", link: "/processrequest" },
        ],
      },
      {
        id: "sales",
        label: "Sales",
        link: "/#",
        isChildItem: true,
        click: function (e) {
          e.preventDefault();
          setIsOperationSales(!isOperationSales);
        },
        parentId: "finance",
        stateVariables: isOperationSales,
        childItems: [
          { id: 1, label: "Client", link: "/client" },
          { id: 2, label: "Commercial", link: "/Commericals" },
        ],
      },
      {
        id: "P&L",
        label: "P&L",
        link: "/#",
        isChildItem: true,
        click: function (e) {
          e.preventDefault();
          setIsProfitLoss(!isProfitLoss);
        },
        parentId: "finance",
        stateVariables: isProfitLoss,
        childItems: [
          { id: 1, label: "MP Accounts", link: "/finance/project/active" },
        ],
      },
    ],
  };
  const supply = {
    id: "supply",
    label: "Supply",
    icon: "ri-pages-line",
    link: "/#",
    click: function (e) {
      e.preventDefault();
      setIsSupply(!isSupply);
      setIscurrentState("Supply");
      updateIconSidebar(e);
    },
    stateVariables: isSupply,
    subItems: [
      {
        id: "mapping",
        label: "Mapping",
        link: "/#",
        parentId: "supply",
        isChildItem: true,
        click: function (e) {
          e.preventDefault();
          setIsMapping(!isMapping);
        },
        stateVariables: isMapping,
        childItems: [
          {
            id: 1,
            label: "Request",
            link: "/supply/request",
            parentId: "pages",
          },
        ],
      },
      {
        id: "tracking",
        label: "Tracker",
        link: "/#",
        parentId: "supply",
        isChildItem: true,
        click: function (e) {
          e.preventDefault();
          setIsTracking(!isTracking);
        },
        stateVariables: isTracking,
        childItems: [
          {
            id: 1,
            label: "Performance",
            link: "/supply/dashboard",
            parentId: "supply",
          },
          {
            id: 2,
            label: "Earnings",
            link: "/supply/earnings",
            parentId: "supply",
          },
        ],
      },
      {
        id: "acquisition",
        label: "Acquisition",
        link: "/#",
        isChildItem: true,
        click: function (e) {
          e.preventDefault();
          setIsAcquisition(!isAcquisition);
        },
        parentId: "supply",
        stateVariables: isAcquisition,
        childItems: [
          {
            id: 1,
            label: "Onboarding",
            link: "/hr/onboarding",
            parentId: "pages",
          },
          {
            id: 2,
            label: "Teams",
            link: "/supply/cluster",
            parentId: "pages",
          },
        ],
      },
    ],
  };

  const management = {
    id: "management",
    label: "Management",
    icon: "mdi mdi-account-group",
    link: "/#",
    click: function (e) {
      e.preventDefault();
      setIsManagement(!isManagement);
      setIscurrentState("Management");
      updateIconSidebar(e);
    },
    stateVariables: isManagement,
    subItems: [
      {
        id: "sales",
        label: "Sales",
        link: "/ui-alerts",
        parentId: "management",
        isChildItem: true,
        click: function (e) {
          e.preventDefault();
          setIsManagementSales(!isManagementSale);
        },
        stateVariables: isManagementSale,
        childItems: [
          {
            id: 1,
            label: "Sales Roster",
            link: "/management/pipeline",
            parentId: "management",
          },
          {
            id: 2,
            label: "Hot Leads",
            link: "/project-leads",
            parentId: "management",
          },
          {
            id: 3,
            label: "Agreement",
            link: "/business/agreement",
            parentId: "management",
          },
        ],
      },
      {
        id: "finance",
        label: "Finance",
        link: "/ui-badges",
        parentId: "management",
        isChildItem: true,
        click: function (e) {
          e.preventDefault();
          setIsManagementFinance(!isManagementFinance);
        },
        stateVariables: isManagementFinance,
        childItems: [
          {
            id: 1,
            label: "Daily Collection",
            link: "/management/daily-collections",
            parentId: "management",
          },
          {
            id: 2,
            label: "AR Summary",
            link: "/management/ar-summary",
            parentId: "management",
          },
          {
            id: 3,
            label: "MP Accounts",
            link: "/finance/project/active",
            parentId: "management",
          },
        ],
      },
      {
        id: "revenue",
        label: "Revenue",
        link: "/ui-buttons",
        parentId: "management",
        isChildItem: true,
        click: function (e) {
          e.preventDefault();
          setIsRevenue(!isRevenue);
        },
        stateVariables: isRevenue,
        childItems: [
          {
            id: 1,
            label: "Daily Performance",
            link: "/management/dailytracking",
            parentId: "management",
          },
          {
            id: 2,
            label: "Monthly Summary",
            link: "/management/week",
            parentId: "management",
          },
          {
            id: 3,
            label: "Annual",
            link: "/management/annual",
            parentId: "management",
          },
        ],
      },
    ],
  };

  const qcMain = [
    {
      id: "quality",
      label: "Quality ",
      icon: "ri-pencil-ruler-2-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("qc");
        setIsQc(!isQc);
        updateIconSidebar(e);
      },
      stateVariables: isQc,
      childItems: [
        {
          id: 1,
          label: "Projects",
          link: "/qcprojects",
          parentId: "quality",
        },
        {
          id: 2,
          label: "Auditors",
          link: "/qcmembers",
          parentId: "quality",
        },
      ],
    },
  ];

  const menuFinal = [];
  if (userType?.business === "1") {
    menuFinal.push(sales);
  }
  if (userType?.operations === "1") {
    menuFinal.push(operation);
  }

  //for finance
  if (userType?.finance === "1") {
    menuFinal.push(finance);
  }

  //for supply
  if (userType?.supply === "1") {
    menuFinal.push(supply);
  }

  if (userType?.management === "1") {
    menuFinal.push(management);
  }
  if (userType?.qc === "1") {
    menuFinal.push(qcMain);
  }
  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboards",
      icon: "ri-dashboard-2-line",
      link: "/dashboard",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "New Projects",
      label: "New Projects",
      icon: "mdi mdi-briefcase-edit-outline",
      link: "/my-projects/new",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isSow,
    },

    {
      id: "Sow",
      label: "Active Projects",
      icon: "ri-pencil-ruler-2-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isSow,
      subItems: sub_items,
    },
  ];
  return (
    <React.Fragment>
      {userType?.role === "support" || userType?.type === "spoc"
        ? menuItems
        : menuFinal}
    </React.Fragment>
  );
};
export default Navdata1;
