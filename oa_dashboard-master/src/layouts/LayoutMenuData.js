import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { extract_token } from "../assets/utils/common";
import { oa_sow_list } from "../assets/utils/sow";
import { api } from "../globalConfig";
import { AppContext } from "../pages/ManagerDashboard/ManagerDashboard";

const Navdata = () => {
  const history = useHistory();
  const location = useLocation();
  const { modal_signUpModals_1, openModalside, closeModalside } =
    useContext(AppContext);

  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isSow, setIsSow] = useState(true);
  const [isInvoice, setIsInvoice] = useState(false);
  const [isPayout, setIsPayout] = useState(false);
  const [isUnbuilt, setIsUnbuilt] = useState(false);
  const [isCluster, setIsCluster] = useState(false);
  const [isQc, setIsQc] = useState(false);
  const [isHr, setIsHr] = useState(false);
  const [isMan, setIsMan] = useState(false);
  const [isFinance, setIsFinance] = useState(false);
  const [isSupply, setIsSupply] = useState(false);

  const [isBusiness, setIsBusiness] = useState(false);
  const [isBusinessProj, setIsBusinessProj] = useState(false);
  const [isBusinessLead, setIsBusinessLead] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [userType, setUserType] = useState("");

  // Apps
  const [isEmail, setEmail] = useState(false);
  const [isSubEmail, setSubEmail] = useState(false);
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isLeads, setIsLeads] = useState(false);
  const [isTasks, setIsTasks] = useState(false);
  const [isCRM, setIsCRM] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSupportTickets, setIsSupportTickets] = useState(false);
  const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");
  const [sub_items, set_sub_items] = useState([]);

  const myProjects = [
    {
      id: "1",
      label: `new project`,
      link: `/my-projects/new`,
      parentId: "My Projects",
    },
    {
      id: "2",
      label: `active project`,
      link: `/my-projects/active`,
      parentId: "My Projects",
    },
    {
      id: "3",
      label: `closed project`,
      link: `/my-projects/closed`,
      parentId: "My Projects",
    },
    {
      id: "4",
      label: `dmproject`,
      link: `/my-projects/dmproject`,
      parentId: "My Projects",
    },
  ];

  const projectsItems = [
    // {
    //   id: "Project Leads",
    //   label: "Project Leads",
    //   icon: "mdi mdi-briefcase-account-outline",
    //   link: "/project-leads",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsProjects(!isProjects);
    //     setIscurrentState("Sow");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isProjects,
    //   // subItems: myProjects,
    // },
    {
      id: "New Projects",
      label: "New Projects",
      icon: "mdi mdi-briefcase-edit-outline",
      link: "/my-projects/new",
      click: function (e) {
        e.preventDefault();
        setIsProjects(!isProjects);
        setIsQc(false);
        setIsBusiness(false);
        updateIconSidebar(e);
      },
      stateVariables: isProjects,
      // subItems: myProjects,
    },
    {
      id: "Active Projects",
      label: "Active Projects",
      icon: "mdi mdi-briefcase-check-outline",
      link: "/my-projects/active",

      click: function (e) {
        e.preventDefault();
        setIsProjects(!isProjects);
        setIsQc(false);
        setIsBusiness(false);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isProjects,
      // subItems: myProjects,
    },
    {
      id: "Closed Projects",
      label: "Closed Projects",
      icon: "mdi mdi-briefcase-remove-outline",
      link: "/my-projects/closed",
      click: function (e) {
        e.preventDefault();
        setIsProjects(!isProjects);
        setIsQc(false);
        setIsBusiness(false);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isProjects,
      // subItems: myProjects,
    },
    // {
    //   id: "On Hold Projects",
    //   label: "On hold Projects",
    //   icon: "mdi mdi-briefcase-clock-outline",
    //   link: "/my-projects/onhold",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsProjects(!isProjects);
    //     setIscurrentState("Sow");
    //     setIsQc(false);
    //     setIsBusiness(false);
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isProjects,
    //   // subItems: myProjects,
    // },
  ];
  // if (userType?.role != "super_admin") {
  //   projectsItems.shift();
  // }

  const projectsItemsBusiness = [
    // {
    //   id: "Project Leads",
    //   label: "Project Leads",
    //   icon: "mdi mdi-briefcase-account-outline",
    //   link: "/project-leads",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsProjects(!isProjects);
    //     setIscurrentState("Sow");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isProjects,
    //   // subItems: myProjects,
    // },
    {
      id: "New Projects",
      label: "New Projects",
      icon: "mdi mdi-briefcase-edit-outline",
      link: "/business/project/new",
      click: function (e) {
        e.preventDefault();
        setIsProjects(!isProjects);
        setIsQc(false);
        setIsBusiness(false);
        updateIconSidebar(e);
      },
      stateVariables: isProjects,
      // subItems: myProjects,
    },
    {
      id: "Active Projects",
      label: "Active Projects",
      icon: "mdi mdi-briefcase-check-outline",
      link: "/business/project/active",

      click: function (e) {
        e.preventDefault();
        setIsProjects(!isProjects);
        setIsQc(false);
        setIsBusiness(false);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isProjects,
      // subItems: myProjects,
    },
    {
      id: "Closed Projects",
      label: "Closed Projects",
      icon: "mdi mdi-briefcase-remove-outline",
      link: "/business/project/closed",
      click: function (e) {
        e.preventDefault();
        setIsProjects(!isProjects);
        setIsQc(false);
        setIsBusiness(false);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isProjects,
      // subItems: myProjects,
    },
    // {
    //   id: "On Hold Projects",
    //   label: "On hold Projects",
    //   icon: "mdi mdi-briefcase-clock-outline",
    //   link: "/business/project/onhold",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsProjects(!isProjects);
    //     setIscurrentState("Sow");
    //     setIsQc(false);
    //     setIsBusiness(false);
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isProjects,
    //   // subItems: myProjects,
    // },
  ];
  const projectsItemsLeads = [
    {
      id: "Lead",
      label: "Lead",
      icon: "mdi mdi-briefcase-edit-outline",
      link: "/business/leads",
      click: function (e) {
        e.preventDefault();
        setIsLeads(!isLeads);
        setIsProjects(false);
        setIsQc(false);
        setIsBusiness(false);
        updateIconSidebar(e);
      },
      stateVariables: isLeads,
    },
    {
      id: "Client",
      label: "Client",
      icon: "mdi mdi-briefcase-edit-outline",
      link: "/business-dashboard/client",
      click: function (e) {
        e.preventDefault();
        setIsLeads(!isLeads);
        setIsProjects(false);
        setIsQc(false);
        setIsBusiness(false);
        updateIconSidebar(e);
      },
      stateVariables: isLeads,
    },
    {
      id: "Company",
      label: "Compnay",
      icon: "mdi mdi-briefcase-edit-outline",
      link: "/business-dashboard/company",
      click: function (e) {
        e.preventDefault();
        setIsLeads(!isLeads);
        setIsProjects(false);
        setIsQc(false);
        setIsBusiness(false);
        updateIconSidebar(e);
      },
      stateVariables: isLeads,
    },
    // {
    //   id: "Project",
    //   label: "Project",
    //   icon: "mdi mdi-briefcase-edit-outline",
    //   link: "/business-dashboard/project",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsLeads(!isLeads);
    //     setIsProjects(false);
    //     setIsQc(false);
    //     setIsBusiness(false);
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isLeads,
    // },
    // {
    //   id: "Project",
    //   label: "dummy",
    //   icon: "mdi mdi-briefcase-edit-outline",
    //   link: "/business-dashboard/my-leads",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsLeads(!isLeads);
    //     setIsProjects(false);
    //     setIsQc(false);
    //     setIsBusiness(false);
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isLeads,
    // },
  ];
  const projectMain = [
    {
      id: "Operations",
      label: "Operations",
      icon: "bx bx-donate-heart",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsProjects(!isProjects);
        setIsQc(false);
        setIsHr(false);
        setIsBusiness(false);
        setIsFinance(false);
        updateIconSidebar(e);
        setIsSupply(false);
        setIsMan(false);
      },
      stateVariables: isProjects,
      subItems: [
        {
          id: "Projects",
          label: "Projects",
          link: "/#",
          icon: "bx bx-donate-heart",
          parentId: "Operations",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setEmail(!isEmail);
            setIsQc(false);
            setIsBusiness(false);
            setIsFinance(false);
          },
          stateVariables: isEmail,
          childItems: projectsItems,
        },
      ],
    },
  ];

  const qcItems = [
    {
      id: "Projects",
      label: "Projects",
      icon: "mdi mdi-briefcase-check-outline",
      link: "/qcprojects",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        setIsBusiness(false);
        setIsSupply(false);

        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isSow,
    },
    {
      id: "Auditors",
      label: "Auditors",
      icon: "mdi mdi-briefcase-account-outline",
      link: "/qcmembers",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        setIsBusiness(false);
        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isSow,
    },
  ];

  const hrItems = [
    {
      id: "onboarding",
      label: "Supply Onboarding",
      icon: "mdi mdi-briefcase-check-outline",
      link: "/hr/onboarding",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        setIsBusiness(false);
        setIsSupply(false);

        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isHr,
    },
  ];

  const managementItems = [
    {
      id: "daily tarcking",
      label: "Daily Performance ",
      icon: "ri-bar-chart-box-line",
      link: "/management/dailytracking",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        setIsBusiness(false);
        setIsSupply(false);

        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isMan,
    },
    // {
    //   id: "daily tarcking",
    //   label: "Daily Approval ",
    //   icon: "ri-bar-chart-box-line",
    //   link: "/management/dailytracking-approval",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsSow(!isSow);
    //     setIscurrentState("Sow");
    //     setIsBusiness(false);
    //     setIsSupply(false);

    //     setIsProjects(false);
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isMan,
    // },
    {
      id: "week",
      label: "Monthly Summary",
      icon: "ri-bar-chart-horizontal-fill",
      link: "/management/week",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        setIsBusiness(false);
        setIsSupply(false);

        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isMan,
    },
    {
      id: "pipelines",
      label: "Sales Roster ",
      icon: "mdi mdi-chart-bar-stacked",
      link: "/management/pipeline",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        setIsBusiness(false);
        setIsSupply(false);

        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isMan,
    },
    {
      id: "Dailycollectables",
      label: "Daily Collections",
      icon: " ri-group-line",
      link: "/management/daily-collections",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        setIsBusiness(false);
        setIsSupply(false);

        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isMan,
    },
    {
      id: "ArSummary",
      label: "AR Summary",
      icon: "ri-briefcase-line",
      link: "/management/ar-summary",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        setIsBusiness(false);
        setIsSupply(false);

        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isMan,
    },
    // {
    //   id: "card",
    //   label: "card",
    //   icon: "mdi mdi-briefcase-account-outline",
    //   link: "/business/card",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsSow(!isSow);
    //     setIscurrentState("Sow");
    //     setIsBusiness(false);
    //     setIsSupply(false);

    //     setIsProjects(false);
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isMan,
    //   // subItems: myProjects,
    // },
    {
      id: "annual",
      label: "Annual",
      icon: "mdi mdi-briefcase-account-outline",
      link: "/management/annual",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        setIsBusiness(false);
        setIsSupply(false);

        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isMan,
      // subItems: myProjects,
    },
    // {
    //   id: "project card",
    //   label: "Project Card",
    //   icon: " ri-group-line",
    //   link: "/management/card",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsSow(!isSow);
    //     setIscurrentState("Sow");
    //     setIsBusiness(false);
    //     setIsSupply(false);

    //     setIsProjects(false);
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isMan,
    // },

    // {
    //   id: "Sumamry",
    //   label: "Summary ",
    //   icon: "mdi mdi-pipe",
    //   link: "/management/summary",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsSow(!isSow);
    //     setIscurrentState("Sow");
    //     setIsBusiness(false);
    //     setIsSupply(false);

    //     setIsProjects(false);
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isMan,
    // },
  ];
  const invoiceItems = [
    // {
    //   id: "Invoices 2022",
    //   label: "2022-2023",
    //   icon: "mdi mdi-briefcase-clock-outline",
    //   link: "/invoice-2022",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsInvoice(!isInvoice);
    //     setIscurrentState("Sow");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isInvoice,
    // },
    {
      id: "Invoies 2021",
      label: "2021-2022",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/invoice-2021",
      click: function (e) {
        e.preventDefault();
        setIsInvoice(!isInvoice);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isInvoice,
    },

    {
      id: "Invoies 2020",
      label: "2020-2021",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/invoice-2020",
      click: function (e) {
        e.preventDefault();
        setIsInvoice(!isInvoice);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isInvoice,
    },
  ];

  const payoutItems = [
    {
      id: "manual payout",
      label: "Manual Payout",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/finance/manualpayout",
      click: function (e) {
        e.preventDefault();
        setIsPayout(!isPayout);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isPayout,
    },
  ];

  const unbuiltItems = [
    {
      id: "summary",
      label: "Summary",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/finance/unbuilt/summary",
      click: function (e) {
        e.preventDefault();
        setIsUnbuilt(!isUnbuilt);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isUnbuilt,
    },
    {
      id: "overdue invoices",
      label: "Overdue Invoices",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/finance/unbuilt/overdue",
      click: function (e) {
        e.preventDefault();
        setIsUnbuilt(!isUnbuilt);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isUnbuilt,
    },
  ];

  const clusterItems = [
    {
      id: "Overview",
      label: "Overview",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/supply/cluster",
      click: function (e) {
        e.preventDefault();
        setIsCluster(!isCluster);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isCluster,
    },
    {
      id: "Supply Request",
      label: "Supply Request",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/supply/request",
      click: function (e) {
        e.preventDefault();
        setIsCluster(!isCluster);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isCluster,
    },
    // {
    //   id: "Man Power",
    //   label: "Man Power",
    //   icon: "mdi mdi-briefcase-clock-outline",
    //   link: "/supply/cluster/cm",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsCluster(!isCluster);
    //     setIscurrentState("Sow");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isCluster,
    // },
  ];

  // const clusterItemsCM = [
  //   {
  //     id: "Supply Request",
  //     label: "Supply Request",
  //     icon: "mdi mdi-briefcase-clock-outline",
  //     link: "/supply/request",
  //     click: function (e) {
  //       e.preventDefault();
  //       setIsCluster(!isCluster);
  //       setIscurrentState("Sow");
  //       updateIconSidebar(e);
  //     },
  //     stateVariables: isCluster,
  //   },
  //   {
  //     id: "Man Power",
  //     label: "Man Power",
  //     icon: "mdi mdi-briefcase-clock-outline",
  //     link: `/supply/cluster/cm`,
  //     click: function (e) {
  //       e.preventDefault();
  //       setIsCluster(!isCluster);
  //       setIscurrentState("Sow");
  //       updateIconSidebar(e);
  //     },
  //     stateVariables: isCluster,
  //   },
  // ];

  const qcMain = [
    {
      id: "Quality",
      label: "Quality ",
      icon: "ri-pencil-ruler-2-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsQc(!isQc);
        setIsBusiness(false);
        setIsProjects(false);
        setIscurrentState("Sow");
        updateIconSidebar(e);
        setIsFinance(false);
        setIsSupply(false);
        setIsHr(false);
        setIsMan(false);
      },
      stateVariables: isQc,
      subItems: qcItems,
    },
  ];
  const hrMain = [
    {
      id: "HR",
      label: "HR",
      icon: "mdi mdi-account-tie",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsHr(!isHr);
        setIsQc(false);
        setIsBusiness(false);
        setIsProjects(false);
        setIscurrentState("Sow");
        updateIconSidebar(e);
        setIsFinance(false);
        setIsSupply(false);
        setIsMan(false);
      },
      stateVariables: isHr,
      subItems: hrItems,
    },
  ];
  const managementMain = [
    {
      id: "Management",
      label: "Management",
      icon: "mdi mdi-account-group",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsMan(!isMan);
        setIsHr(false);
        setIsQc(false);
        setIsBusiness(false);
        setIsProjects(false);
        setIscurrentState("Sow");
        updateIconSidebar(e);
        setIsFinance(false);
        setIsSupply(false);
      },
      stateVariables: isMan,
      subItems: managementItems,
    },
  ];

  const financeItems = [
    {
      id: "Invoices",
      label: "Invoices",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/invoices",
      parentId: "Finance",
      isChildItem: true,
      click: function (e) {
        e.preventDefault();
        // setIsSow(!isSow);
        setIsInvoice(!isInvoice);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isInvoice,
      childItems: invoiceItems,
    },
    // {
    //   id: "dashboard",
    //   label: "Dashboard",
    //   icon: "mdi mdi-briefcase-clock-outline",
    //   link: "/invoices",
    //   parentId: "payout",
    //   isChildItem: true,
    //   click: function (e) {
    //     e.preventDefault();
    //     // setIsSow(!isSow);
    //     setIsPayout(!isPayout);
    //     setIscurrentState("Sow");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isPayout,
    //   childItems: payoutItems,
    // },
    // {
    //   id: "unbuiltrevenue",
    //   label: "Unbuilt Revenue",
    //   icon: "mdi mdi-briefcase-clock-outline",
    //   link: "/invoices",
    //   parentId: "Finance",
    //   isChildItem: true,
    //   click: function (e) {
    //     e.preventDefault();
    //     // setIsSow(!isSow);
    //     setIsUnbuilt(!isUnbuilt);

    //     setIscurrentState("Sow");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isUnbuilt,
    //   childItems: unbuiltItems,
    // },

    {
      id: "AR Summary",
      label: "AR Summary",
      icon: "ri-stack-fill",

      link: "/finance/ar-summary",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isSow,
    },
    {
      id: "Overdue Invoices",
      label: "Collection Tracker",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/finance/ar-overdueinvoices",

      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isSow,
    },
    {
      id: "Client",
      label: "Client",
      icon: " ri-group-line",
      link: "/client",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isSow,
    },

    {
      id: "Payment Request",
      label: "Payment Request",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/paymentrequest",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isSow,
    },

    {
      id: "Process Request",
      label: "Process Request",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/processrequest",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isSow,
    },

    {
      id: "Commercials",
      label: "Commericals",
      icon: "ri-calculator-line",
      link: "/Commericals",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isSow,
    },
    {
      id: "MP Accounts",
      label: "MP Accounts",
      icon: "ri-briefcase-line",
      link: "/finance/project/active",
      click: function (e) {
        e.preventDefault();
        setIsSow(!isSow);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isSow,
    },
    // {

    //   id: "Monthly",
    //   label: "Monthly",
    //   icon: " ri-group-line",
    //   link: "/management/monthly",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsSow(!isSow);
    //     setIscurrentState("Sow");
    //     setIsBusiness(false);
    //     setIsSupply(false);

    //     setIsProjects(false);
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isMan,
    // },
    // {
    //   id: "project card",
    //   label: "Project Card",
    //   icon: " ri-group-line",
    //   link: "/management/card",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsSow(!isSow);
    //     setIscurrentState("Sow");
    //     setIsBusiness(false);
    //     setIsSupply(false);

    //     setIsProjects(false);
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isMan,
    // },

    // {
    //   id: "Sumamry",
    //   label: "Summary ",
    //   icon: "mdi mdi-pipe",
    //   link: "/management/summary",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsSow(!isSow);
    //     setIscurrentState("Sow");
    //     setIsBusiness(false);
    //     setIsSupply(false);

    //     setIsProjects(false);
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isMan,
    // },
  ];

  const financeMain = [
    {
      id: "finance",
      label: "Finance ",

      icon: " ri-money-dollar-circle-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsFinance(!isFinance);
        setIscurrentState("Sow");
        updateIconSidebar(e);
        setIsHr(false);
        setIsBusiness(false);
        setIsProjects(false);
        setIsQc(false);
        setIsSupply(false);
        setIsMan(false);
      },
      stateVariables: isFinance,
      subItems: financeItems,
    },
  ];

  const businessItems = [
    {
      id: "Hot Leads",
      label: "Hot Leads",
      icon: "mdi mdi-briefcase-account-outline",
      link: "/project-leads",
      click: function (e) {
        e.preventDefault();
        setIsSupply(false);
        setIsQc(false);
        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isBusiness,
      // subItems: myProjects,
    },
    {
      id: "Agreement",
      label: "Agreement",
      icon: "mdi mdi-briefcase-account-outline",
      link: "/business/agreement",
      click: function (e) {
        e.preventDefault();
        setIsSupply(false);
        setIsQc(false);
        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isBusiness,
      // subItems: myProjects,
    },

    {
      id: "Leads",
      label: "Leads",
      link: "/#",
      icon: "bx bx-donate-heart",
      parentId: "Operations",
      isChildItem: true,
      click: function (e) {
        e.preventDefault();
        // setEmail(!isEmail);
        // setIsQc(false);
        setIsBusinessLead(!isBusinessLead);
        setIsBusinessProj(false);
        updateIconSidebar(e);
        // setIsFinance(false);
      },
      stateVariables: isBusinessLead,
      childItems: projectsItemsLeads,
    },

    {
      id: "Projects",
      label: "Projects",
      link: "/#",
      icon: "bx bx-donate-heart",
      parentId: "Operations",
      isChildItem: true,
      click: function (e) {
        e.preventDefault();
        // setEmail(!isEmail);
        // setIsQc(false);
        setIsBusinessProj(!isBusinessProj);
        setIsBusinessLead(false);
        updateIconSidebar(e);
        // setIsFinance(false);
      },
      stateVariables: isBusinessProj,
      childItems: projectsItemsBusiness,
    },
  ];

  const businessMain = [
    {
      id: "Business",
      label: "Business",
      icon: "mdi mdi-briefcase-outline",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsSupply(false);
        setIsHr(false);
        updateIconSidebar(e);
        setIsProjects(false);
        setIsQc(false);
        setIsFinance(false);
        setIsBusiness(!isBusiness);
        setIsMan(false);
      },
      stateVariables: isBusiness,
      subItems: businessItems,
    },
  ];

  const supplyItemsCm = [
    {
      id: "performance",
      label: "Performance",
      icon: "ri-dashboard-2-line",
      link: "/supply/dashboard",
      click: function (e) {
        e.preventDefault();
        setIsBusiness(false);
        setIsSupply(!isSupply);
        setIsQc(false);
        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isSupply,
      // subItems: myProjects,
    },
    {
      id: "Earnings",
      label: "Earnings",
      icon: "ri-bar-chart-box-line",
      link: "/supply/earnings",
      click: function (e) {
        e.preventDefault();
        setIsBusiness(false);
        setIsSupply(!isSupply);
        setIsQc(false);
        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isSupply,
      // subItems: myProjects,
    },
    {
      id: "Supply Request",
      label: "Supply Request",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/supply/request",
      click: function (e) {
        e.preventDefault();
        setIsCluster(!isCluster);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isCluster,
    },
    {
      id: "My Team",
      label: "My Team",
      icon: "mdi mdi-briefcase-clock-outline",
      link: `/supply/cluster/cm`,
      click: function (e) {
        e.preventDefault();
        setIsCluster(!isCluster);
        setIscurrentState("Sow");
        updateIconSidebar(e);
      },
      stateVariables: isCluster,
    },
  ];

  const supplyItems = [
    {
      id: "dashboard",
      label: "Performance",
      icon: "ri-dashboard-2-line",
      link: "/supply/dashboard",
      click: function (e) {
        e.preventDefault();
        setIsBusiness(false);
        setIsSupply(!isSupply);
        setIsQc(false);
        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isSupply,
      // subItems: myProjects,
    },

    {
      id: "performance",
      label: "Earnings",
      icon: "ri-bar-chart-box-line",
      link: "/supply/earnings",
      click: function (e) {
        e.preventDefault();
        setIsBusiness(false);
        setIsSupply(!isSupply);
        setIsQc(false);
        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isSupply,
      // subItems: myProjects,
    },

    {
      id: "Overview",
      label: "Teams",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/supply/cluster",
      click: function (e) {
        e.preventDefault();
        setIsBusiness(false);
        setIsSupply(!isSupply);
        setIsQc(false);
        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isSupply,
    },
    {
      id: "Supply Request",
      label: "Request",
      icon: "mdi mdi-briefcase-clock-outline",
      link: "/supply/request",
      click: function (e) {
        e.preventDefault();
        setIsBusiness(false);
        setIsSupply(!isSupply);
        setIsQc(false);
        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isSupply,
    },

    {
      id: "onboarding",
      label: "Onboarding",
      icon: "mdi mdi-briefcase-check-outline",
      link: "/hr/onboarding",
      click: function (e) {
        e.preventDefault();
        setIsBusiness(false);
        setIsSupply(!isSupply);
        setIsQc(false);
        setIsProjects(false);
        updateIconSidebar(e);
      },
      stateVariables: isSupply,
    },
    // {
    //   id: "cluster",
    //   label: "Cluster",
    //   icon: "mdi mdi-account-outline",
    //   link: "/supply",
    //   parentId: "Finance",
    //   isChildItem: true,
    //   click: function (e) {
    //     e.preventDefault();
    //     // setIsBusiness(!isBusiness);
    //     setIsQc(false);
    //     setIsProjects(false);
    //     updateIconSidebar(e);
    //     setIsCluster(!isCluster);
    //     setIscurrentState("Sow");
    //   },
    //   // stateVariables: isSupply,
    //   // subItems: myProjects,
    //   stateVariables: isCluster,
    //   childItems: clusterItems,
    // },

    // {
    //   id: "Tsm",
    //   label: "Tsm",
    //   icon: "mdi mdi-account-tie-outline",
    //   link: "/supply/tsm",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsBusiness(!isBusiness);
    //     setIsQc(false);
    //     setIsProjects(false);
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isSupply,
    //   // subItems: myProjects,
    // },
  ];

  const supplyMain = [
    {
      id: "Supply",
      label: "Supply",
      icon: "mdi mdi-briefcase-account-outline",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsBusiness(false);
        updateIconSidebar(e);
        setIsProjects(false);
        setIsHr(false);
        setIsQc(false);
        setIsSupply(!isSupply);
        setIsFinance(false);
        setIsCluster(false);
        setIsMan(false);
      },
      stateVariables: isSupply,
      // subItems: supplyItems,
      subItems: userType.role == "cm" ? supplyItemsCm : supplyItems,
    },
  ];

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

  const menuFinal = [
    // {
    //   label: "Menu",
    //   isHeader: true,
    // },
  ];

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "Sow") {
      setIsSow(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState === "Chat") {
      setIsChat(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history.push("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
    if (
      location.pathname.split("/")[1] == "my-projects" ||
      location.pathname.split("/")[1] == "my-sows"
    ) {
      setIsSow(true);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isSow,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
    location.pathname,
  ]);

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
      // subItems: myProjects,
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
    // {
    //   id: "chat",
    //   label: "chat",
    //   icon: "ri-chat-1-line",
    //   link: "/chat",
    //   stateVariables: isChat,
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsChat(!isChat);
    //     setIscurrentState("Chat");
    //     updateIconSidebar(e);
    //   },
    // },
  ];
  if (userType?.business == "1") {
    menuFinal.push(...businessMain);
  }
  if (userType?.operations == "1") {
    menuFinal.push(...projectMain);
  }
  if (userType?.qc == "1") {
    menuFinal.push(...qcMain);
  }

  //for finance
  if (userType?.finance == "1") {
    menuFinal.push(...financeMain);
  }

  //for supply
  if (userType?.supply == "1") {
    menuFinal.push(...supplyMain);
  }

  // for hr
  // if (userType?.hr == "1") {
  //   menuFinal.push(...hrMain);
  // }

  // for management
  if (userType?.management == "1") {
    menuFinal.push(...managementMain);
  }

  return (
    <React.Fragment>
      {/* {userType?.type == "oa" || userType?.type == "spoc" */}
      {userType?.role == "support" || userType?.type == "spoc"
        ? menuItems
        : menuFinal}
    </React.Fragment>
  );
};
export default Navdata;
