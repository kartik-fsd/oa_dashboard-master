import React from "react";
import { Redirect } from "react-router-dom";
import BasicTwosVerify from "../pages/Authentication/BasicTwosVerify";

//Dashboard
// import DashboardAnalytics from "../pages/DashboardAnalytics";
// import DashboardCrm from "../pages/DashboardCrm";
// import DashboardEcommerce from "../pages/DashboardEcommerce";

// import DashboardCrypto from "../pages/DashboardCrypto";
// import DashboardProject from "../pages/DashboardProject";
// import DashboardNFT from "../pages/DashboardNFT";

// //Calendar
// // Email box
// import MailInbox from "../pages/EmailInbox";
// import BasicAction from "../pages/Email/EmailTemplates/BasicAction";
// import EcommerceAction from "../pages/Email/EmailTemplates/EcommerceAction";

// //CHat
// import Chat from "../pages/Chat";
// import Calendar from "../pages/Calendar";

// // Project
// import ProjectList from "../pages/Projects/ProjectList";
// import ProjectOverview from "../pages/Projects/ProjectOverview";
// import CreateProject from "../pages/Projects/CreateProject";

// //Task
// import TaskDetails from "../pages/Tasks/TaskDetails";
// import TaskList from "../pages/Tasks/TaskList";
// import KanbanBoard from "../pages/Tasks/KanbanBoard/Index";

// //Transactions
// import Transactions from "../pages/Crypto/Transactions";
// import BuySell from "../pages/Crypto/BuySell";
// import CryproOrder from "../pages/Crypto/CryptoOrder";
// import MyWallet from "../pages/Crypto/MyWallet";
// import ICOList from "../pages/Crypto/ICOList";
// import KYCVerification from "../pages/Crypto/KYCVerification";

// //Crm Pages
// import CrmCompanies from "../pages/Crm/CrmCompanies";
// import CrmContacts from "../pages/Crm/CrmContacts";
// import CrmDeals from "../pages/Crm/CrmDeals/index";
// import CrmLeads from "../pages/Crm/CrmLeads/index";

// //Invoices
// import InvoiceList from "../pages/Invoices/InvoiceList";
// import InvoiceCreate from "../pages/Invoices/InvoiceCreate";
// import InvoiceDetails from "../pages/Invoices/InvoiceDetails";

// // Support Tickets
// import ListView from "../pages/SupportTickets/ListView";
// import TicketsDetails from "../pages/SupportTickets/TicketsDetails";

// // //Ecommerce Pages
// import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
// import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
// import EcommerceAddProduct from "../pages/Ecommerce/EcommerceProducts/EcommerceAddProduct";
// import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
// import EcommerceOrderDetail from "../pages/Ecommerce/EcommerceOrders/EcommerceOrderDetail";
// import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
// import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
// import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
// import EcommerceSellers from "../pages/Ecommerce/EcommerceSellers/index";
// import EcommerceSellerDetail from "../pages/Ecommerce/EcommerceSellers/EcommerceSellerDetail";

// // NFT Marketplace Pages
// import Marketplace from "../pages/NFTMarketplace/Marketplace";
// import Collections from "../pages/NFTMarketplace/Collections";
// import CreateNFT from "../pages/NFTMarketplace/CreateNFT";
// import Creators from "../pages/NFTMarketplace/Creators";
// import ExploreNow from "../pages/NFTMarketplace/ExploreNow";
// import ItemDetails from "../pages/NFTMarketplace/Itemdetails";
// import LiveAuction from "../pages/NFTMarketplace/LiveAuction";
// import Ranking from "../pages/NFTMarketplace/Ranking";
// import WalletConnect from "../pages/NFTMarketplace/WalletConnect";

// // Base Ui
// import UiAlerts from "../pages/BaseUi/UiAlerts/UiAlerts";
// import UiBadges from "../pages/BaseUi/UiBadges/UiBadges";
// import UiButtons from "../pages/BaseUi/UiButtons/UiButtons";
// import UiColors from "../pages/BaseUi/UiColors/UiColors";
// import UiCards from "../pages/BaseUi/UiCards/UiCards";
// import UiCarousel from "../pages/BaseUi/UiCarousel/UiCarousel";
// import UiDropdowns from "../pages/BaseUi/UiDropdowns/UiDropdowns";
// import UiGrid from "../pages/BaseUi/UiGrid/UiGrid";
// import UiImages from "../pages/BaseUi/UiImages/UiImages";
// import UiTabs from "../pages/Babreadcrumb m-0seUi/UiTabs/UiTabs";
// import UiAccordions from "../pages/BaseUi/UiAccordion&Collapse/UiAccordion&Collapse";
// import UiModals from "../pages/BaseUi/UiModals/UiModals";
// import UiOffcanvas from "../pages/BaseUi/UiOffcanvas/UiOffcanvas";
// import UiPlaceholders from "../pages/BaseUi/UiPlaceholders/UiPlaceholders";
// import UiProgress from "../pages/BaseUi/UiProgress/UiProgress";
// import UiNotifications from "../pages/BaseUi/UiNotifications/UiNotifications";
// import UiMediaobject from "../pages/BaseUi/UiMediaobject/UiMediaobject";
// import UiEmbedVideo from "../pages/BaseUi/UiEmbedVideo/UiEmbedVideo";
// import UiTypography from "../pages/BaseUi/UiTypography/UiTypography";
// import UiList from "../pages/BaseUi/UiLists/UiLists";
// import UiGeneral from "../pages/BaseUi/UiGeneral/UiGeneral";
// import UiRibbons from "../pages/BaseUi/UiRibbons/UiRibbons";
// import UiUtilities from "../pages/BaseUi/UiUtilities/UiUtilities";

// // Advance Ui
// import UiNestableList from "../pages/AdvanceUi/UiNestableList/UiNestableList";
// import UiScrollbar from "../pages/AdvanceUi/UiScrollbar/UiScrollbar";
// import UiAnimation from "../pages/AdvanceUi/UiAnimation/UiAnimation";
// import UiTour from "../pages/AdvanceUi/UiTour/UiTour";
// import UiSwiperSlider from "../pages/AdvanceUi/UiSwiperSlider/UiSwiperSlider";
// import UiRatings from "../pages/AdvanceUi/UiRatings/UiRatings";
// import UiHighlight from "../pages/AdvanceUi/UiHighlight/UiHighlight";

// // Widgets
// import Widgets from "../pages/Widgets/Index";

// //Forms
// import BasicElements from "../pages/Forms/BasicElements/BasicElements";
// import FormSelect from "../pages/Forms/FormSelect/FormSelect";
// import FormEditor from "../pages/Forms/FormEditor/FormEditor";
// import CheckBoxAndRadio from "../pages/Forms/CheckboxAndRadio/CheckBoxAndRadio";
// import Masks from "../pages/Forms/Masks/Masks";
// import FileUpload from "../pages/Forms/FileUpload/FileUpload";
// import FormPickers from "../pages/Forms/FormPickers/FormPickers";
// import FormRangeSlider from "../pages/Forms/FormRangeSlider/FormRangeSlider";
// import Formlayouts from "../pages/Forms/FormLayouts/Formlayouts";
// import FormValidation from "../pages/Forms/FormValidation/FormValidation";
// import FormWizard from "../pages/Forms/FormWizard/FormWizard";
// import FormAdvanced from "../pages/Forms/FormAdvanced/FormAdvanced";
// import Select2 from "../pages/Forms/Select2/Select2";

// //Tables
// import BasicTables from "../pages/Tables/BasicTables/BasicTables";
// import GridTables from "../pages/Tables/GridTables/GridTables";
// import ListTables from "../pages/Tables/ListTables/ListTables";
// import DataTables from "../pages/Tables/DataTables/DataTables";

// //Icon pages
// import RemixIcons from "../pages/Icons/RemixIcons/RemixIcons";
// import BoxIcons from "../pages/Icons/BoxIcons/BoxIcons";
// import MaterialDesign from "../pages/Icons/MaterialDesign/MaterialDesign";
// import FeatherIcons from "../pages/Icons/FeatherIcons/FeatherIcons";
// import LineAwesomeIcons from "../pages/Icons/LineAwesomeIcons/LineAwesomeIcons";

// //Maps
// import GoogleMaps from "../pages/Maps/GoogleMaps/GoogleMaps";
// import VectorMaps from "../pages/Maps/VectorMaps/VectorMaps";
// import LeafletMaps from "../pages/Maps/LeafletMaps/LeafletMaps";

// //AuthenticationInner pages
// import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";
// import CoverSignIn from "../pages/AuthenticationInner/Login/CoverSignIn";
// import BasicSignUp from "../pages/AuthenticationInner/Register/BasicSignUp";
// import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
// import BasicPasswReset from "../pages/AuthenticationInner/PasswordReset/BasicPasswReset";
// //pages
// import Starter from "../pages/Pages/Starter/Starter";
// import SimplePage from "../pages/Pages/Profile/SimplePage/SimplePage";
// import Settings from "../pages/Pages/Profile/Settings/Settings";
// import Team from "../pages/Pages/Team/Team";
// import Timeline from "../pages/Pages/Timeline/Timeline";
// import Faqs from "../pages/Pages/Faqs/Faqs";
// import Pricing from "../pages/Pages/Pricing/Pricing";
// import Gallery from "../pages/Pages/Gallery/Gallery";
// import Maintenance from "../pages/Pages/Maintenance/Maintenance";
// import ComingSoon from "../pages/Pages/ComingSoon/ComingSoon";
// import SiteMap from "../pages/Pages/SiteMap/SiteMap";
// import SearchResults from "../pages/Pages/SearchResults/SearchResults";

// import CoverPasswReset from "../pages/AuthenticationInner/PasswordReset/CoverPasswReset";
// import BasicLockScreen from "../pages/AuthenticationInner/LockScreen/BasicLockScr";
// import CoverLockScreen from "../pages/AuthenticationInner/LockScreen/CoverLockScr";
// import BasicLogout from "../pages/AuthenticationInner/Logout/BasicLogout";
// import CoverLogout from "../pages/AuthenticationInner/Logout/CoverLogout";
// import BasicSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg";
// import CoverSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg";
// import BasicTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify";
// import CoverTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify";
// import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";
// import Cover404 from "../pages/AuthenticationInner/Errors/Cover404";
// import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
// import Error500 from "../pages/AuthenticationInner/Errors/Error500";

// import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
// import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
// import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import GetLeads from "../pages/BusinessDashboard/GetLeads";
import MyCompanies from "../pages/BusinessDashboard/MyCompanies";
import MyLeads from "../pages/BusinessDashboard/MyLeads";
import MyProjects from "../pages/BusinessDashboard/MyProjects";
import MyClients from "../pages/BusinessDashboard/MyClients";
import Chat from "../pages/chat/Chat";
import DashboardMainPage from "../pages/Dashboard";
import EditSow from "../pages/EditSow/EditSow";
import MainDashboard from "../pages/MainDashboard/MainDashboard";
import { ManagerDashboard } from "../pages/ManagerDashboard/ManagerDashboard";
import CampLeads from "../pages/ManagerDashboard/superPartner/CampLeads";
import ViewManagerProject from "../pages/viewManagerProject/ViewManagerProject";
import EditCompanyInfo from "../pages/BusinessDashboard/EditCompanyInfo";
import QcProjects from "../pages/QC Projects/QcProjects";
import ViewProject from "../pages/QC Projects/ViewProject";
// import QcMembers from "../pages/QcMembers/QcMembers";
import MainQc from "../pages/QcMembers/MainQc";
import ProjectLeads from "../pages/ManagerDashboard/ProjectLeads";
import ProjectOverView from "../pages/BusinessDashVel/ProjectOverView";
import FinanceAr from "../pages/Finance/AccountReceivable/FinanceOverDueInvoice";
import FinanceArSummary from "../pages/Finance/AccountReceivable/FinanceOverDueInvoice";
import FinanceOverDueInvoices from "../pages/Finance/AccountReceivable/FinanceSummary";
import ClientMain from "../pages/Finance/Client/ClientMain";
import InvoiceDetails from "../pages/Finance/Commericals/InvoiceDetails";
import Commercial from "../pages/Finance/Commericals/Commercial";
import Invoice2021 from "../pages/Finance/Invoice2021";
import Invoice2020 from "../pages/Finance/Invoice2020";
import PaymentRequest from "../pages/Finance/PaymentRequest/PaymentRequest";
import ProcessRequest from "../pages/Finance/ProcessRequest/ProcessRequest";
import Invoice2022 from "../pages/Finance/Invoice2022";
import DashboardSupply from "../pages/supply/DashboardSupply";
import DashboardSupplyTableInside from "../pages/supply/DashboardSupplyTableInside";
import CmSupply from "../pages/supply/CmSupply";
import Cluster from "../pages/supply/Cluster/Cluster";
import ManPowerReq from "../pages/supply/ManPowerRequest/ManPowerReq";
import BusinessAgreement from "../pages/BusinessDashboard/BusinessAgreement";
import CmOverview from "../pages/supply/Cluster/CmOverview";
import ClusterMain from "../pages/supply/Cluster/ClusterMain";
import Projects from "../pages/supply/Cluster/Projects/AsmProjects";
import AsmViewProject from "../pages/supply/Cluster/Projects/AsmViewProject";
import Details from "../pages/supply/Cluster/Projects/Details";
import Onboarding from "../pages/Hr/Onboarding";
import Onboardingdetails from "../pages/Hr/Onboardingdetails";
import FinanceSummary from "../pages/Finance/AccountReceivable/FinanceSummary";
import FinanceOverDueInvoice from "../pages/Finance/AccountReceivable/FinanceOverDueInvoice";
import AsmProfileDetails from "../pages/supply/Cluster/AsmProfileDetails";
import AsmTemp from "../pages/supply/Cluster/AsmTemp";
import Management from "../pages/Management/DailyTracking";
import Pipeline from "../pages/Management/Pipeline";
import DailyTracking from "../pages/Management/DailyTracking";
import Week from "../pages/Management/Week/Week";
import ManagementSummary from "../pages/Management/ManagementSummary";
import UnbuiltSummary from "../pages/Finance/unbuiltRevenue/UnbuiltSummary";
import UnbuiltOverdue from "../pages/Finance/unbuiltRevenue/UnbuiltOverdue";
// import DailyCollections from "../pages/Finance/Dailycollections/DailyCollections";
import Earnings from "../pages/Earnings/Earnings";

import Invoice2022MainDet from "../pages/Finance/Invoice2022MainDet";
import DailyCollectable from "../pages/Management/DailyCollectable/DailyCollectable";
import ManualPayout from "../pages/Finance/Payout/ManualPayout";
import Monthly from "../pages/Management/Monthly/Monthly";
import Card from "../pages/Management/card/TestingCard";
import TestingCard from "../pages/Management/card/TestingCard";
import SplitRequest from "../pages/Finance/PaymentRequest/SplitRequest";
import BuissnessCrad from "../pages/BusinessDashboard/BuissnessCrad";
import BusinessLeads from "../pages/BusinessDashboard/BusinessLeads/BusinessLeads";
import Client from "../pages/BusinessDashboard/Clients/Client";
import BusinessCompany from "../pages/BusinessDashboard/company/BusinessCompany";
import BusinessProject from "../pages/BusinessDashboard/project/BusinessProject";
import Annual from "../pages/Management/annual/Annual";
import TieBreaker from "../pages/ManagerDashboard/tieBreaker/TieBreaker";
import AddCompnay from "../pages/BusinessDashboard/company/AddCompnay";
import AddCompany from "../pages/BusinessDashboard/company/AddCompany";
import Addclient from "../pages/BusinessDashboard/Clients/Addclient";
import CompanyDetails from "../pages/BusinessDashboard/company/CompanyDetails";
import CompDet from "../pages/BusinessDashboard/company/CompDet";
import PerformaceMonthWise from "../pages/Management/Monthly/PerformaceMonthWise";
import AddClientDet from "../pages/BusinessDashboard/Clients/AddClientDet";
import BusinessRoaster from "../pages/Management/BusinessTracking";
import LeadDetails from "../pages/BusinessDashboard/BusinessLeads/LeadDetails";
import LeadMain from "../pages/BusinessDashboard/BusinessLeads/LeadMain";
import MaturningMain from "../pages/BusinessDashboard/BusinessLeads/MaturningMain";
import BusinessProjectTest from "../pages/BusinessDashboard/project/BusinessProjectTest";
import AgreementHeader from "../pages/BusinessDashboard/Agreement/AgreementHeader";
import Agreement from "../pages/BusinessDashboard/Agreement/Agreement";
import BusinessDashProjectDetails from "../pages/BusinessDashboard/project/BusinessDashProjectDetails";
import BusinessDashProjectInit from "../pages/BusinessDashboard/project/BusinessDashProjectInit";
import SplitRequestNew from "../pages/Finance/PaymentRequest/SplitRequestNew";
import AddAgreementDetails from "../pages/BusinessDashboard/Agreement/AgreementDetails";
import Ubr from "../pages/Finance/ubr/Ubr";
// import BusinessClientTable from "../pages/BusinessDashboard/Clients/BusinessClientTable";
// import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
// import Register from "../pages/Authentication/Register";

//Charts
// import LineCharts from "../pages/Charts/ApexCharts/LineCharts";
// import AreaCharts from "../pages/Charts/ApexCharts/AreaCharts";
// import ColumnCharts from "../pages/Charts/ApexCharts/ColumnCharts";
// import BarCharts from "../pages/Charts/ApexCharts/BarCharts";
// import MixedCharts from "../pages/Charts/ApexCharts/MixedCharts";
// import TimelineCharts from "../pages/Charts/ApexCharts/TimelineCharts";
// import CandlestickChart from "../pages/Charts/ApexCharts/CandlestickChart";
// import BoxplotCharts from "../pages/Charts/ApexCharts/BoxplotCharts";
// import BubbleChart from "../pages/Charts/ApexCharts/BubbleChart";
// import ScatterCharts from "../pages/Charts/ApexCharts/ScatterCharts";
// import HeatmapCharts from "../pages/Charts/ApexCharts/HeatmapCharts";
// import TreemapCharts from "../pages/Charts/ApexCharts/TreemapCharts";
// import PieCharts from "../pages/Charts/ApexCharts/PieCharts";
// import RadialbarCharts from "../pages/Charts/ApexCharts/RadialbarCharts";
// import RadarCharts from "../pages/Charts/ApexCharts/RadarCharts";
// import PolarCharts from "../pages/Charts/ApexCharts/PolarCharts";

// import ChartsJs from "../pages/Charts/ChartsJs/index";
// import Echarts from "../pages/Charts/ECharts/index";

// // Landing Index
// import OnePage from "../pages/Landing/OnePage";
// import NFTLanding from "../pages/Landing/NFTLanding";

// // User Profile
// import UserProfile from "../pages/Authentication/user-profile";

const authProtectedRoutes = [
  //   { path: "/dashboard-analytics", component: DashboardAnalytics },
  // { path: "/chat", component: Chat },
  { path: "/dashboard", component: MainDashboard },
  { path: "/sow/:id", component: DashboardMainPage },

  { path: "/my-projects/:id", component: ManagerDashboard },
  { path: "/tie-breaker", component: TieBreaker },

  { path: "/business/project/:id", component: ManagerDashboard },
  { path: "/finance/project/:id", component: ManagerDashboard },
  { path: "/finance/daily-collections", component: DailyCollectable },
  { path: "/editsow/:id", component: EditSow },
  { path: "/my-sows/:id", component: ViewManagerProject },
  { path: "/camp-leads/:id", component: CampLeads },
  { path: "/qcprojects", component: QcProjects },
  { path: "/viewproject/:id", component: ViewProject },
  { path: "/qcmembers", component: MainQc },
  { path: "/business-dashboard/my-leads", component: MyLeads },
  { path: "/business-dashboard/my-companies", component: MyCompanies },
  { path: "/business-dashboard/my-companies/:id", component: EditCompanyInfo },
  { path: "/business-dashboard/my-projects", component: MyProjects },
  { path: "/business-dashboard/my-client", component: MyClients },
  { path: "/business-dashboard/my-leads/:id", component: GetLeads },
  { path: "/business-dashboard/client", component: Client },
  { path: "/business-dashboard/company", component: BusinessCompany },
  { path: "/business-dashboard/company/:id", component: CompDet },
  { path: "/business-dashboard/project", component: BusinessProjectTest },
  { path: "/business-dashboard/agreement-list", component: AgreementHeader },
  { path: "/business/project", component: ManagerDashboard },
  //{ path: "/business-dashboard/Agreement", component: Agreement },
  {
    path: "/business-dashboard/agreementDetails/:id",
    component: AddAgreementDetails,
  },
  {
    path: "/business-dashboard/project-details/:id",
    component: BusinessDashProjectDetails,
  },
  {
    path: "/business-dashboard/project-init/:id",
    component: BusinessDashProjectInit,
  },
  { path: "/business-dashboard/addcompany", component: AddCompany },
  { path: "/business-dashboard/addclient/:id", component: AddClientDet },
  { path: "/business-dashboard/clientDetails/:id", component: LeadMain },
  { path: "/business-dashboard/businessreq", component: MaturningMain },

  { path: "/project-leads", component: ProjectLeads },
  { path: "/project-overview/:id", component: ProjectOverView },
  { path: "/finance/ar-summary", component: FinanceSummary },
  { path: "/finance/ar-overdueinvoices", component: FinanceOverDueInvoice },
  //{ path: "/management/daily-collections", component: DailyCollectable },
  { path: "/management/monthly/:id", component: Monthly },
  { path: "/management/card", component: TestingCard },
  // { path: "/management/annual", component: Annual },

  { path: "/client", component: ClientMain },
  { path: "/Commericals", component: Commercial },
  { path: "/invoice-2022", component: Invoice2022 },
  { path: "/invoice-2021", component: Invoice2021 },
  { path: "/invoice-2020", component: Invoice2020 },
  { path: "/paymentrequest", component: PaymentRequest },
  { path: "/splitrequest/:id", component: SplitRequest },
  { path: "/processrequest", component: ProcessRequest },
  { path: "/supply/dashboard", component: DashboardSupply },
  { path: "/supply/dashboard/:id", component: DashboardSupplyTableInside },
  { path: "/supply/cm", component: CmSupply },
  { path: "/supply/cluster", component: ClusterMain },
  { path: "/supply/cluster/cm/:id", component: CmOverview },
  { path: "/supply/cluster/cm", component: CmOverview },
  { path: "/manpower/asmprojects", component: Projects },
  { path: "/asm/viewprojects:id", component: AsmViewProject },
  { path: "/supply/request", component: ManPowerReq },
  { path: "/supply/earnings", component: Earnings },
  { path: "/supply/performance", component: Earnings },
  { path: "/cm/dashboard/:id", component: DashboardSupplyTableInside },
  { path: "/business/agreement", component: BusinessAgreement },
  { path: "/business/card", component: BuissnessCrad },
  { path: "/business/leads", component: BusinessLeads },
  { path: "/manpower/details/:id", component: Details },
  { path: "/hr/onboarding", component: Onboarding },
  { path: "/hr/onboarding", component: Onboarding },
  { path: "/hr/onboarding/details/:id", component: Onboardingdetails },
  // { path: "/manpower/asm/:id", component: AsmProfileDetails },
  { path: "/manpower/asm/:id", component: AsmTemp },
  { path: "/management/pipeline", component: DailyTracking },
  { path: "/management/dailytracking", component: Pipeline },
  { path: "/founders/dailytracking", component: Pipeline },

  { path: "/management/business-roaster", component: BusinessRoaster },
  {
    path: "/management/month-wise-performance",
    component: PerformaceMonthWise,
  },
  { path: "/management/dailytracking-approval", component: Pipeline },
  { path: "/management/week", component: Week },
  { path: "/founders/monthly-summary", component: Week },
  { path: "/management/summary", component: ManagementSummary },
  { path: "/management/ar-summary", component: FinanceSummary },
  { path: "/finance/unbuilt/summary", component: UnbuiltSummary },
  { path: "/finance/unbuilt/overdue", component: UnbuiltOverdue },
  { path: "/finance/inv22/maindetails", component: Invoice2022MainDet },
  { path: "/finance/manualpayout", component: ManualPayout },
  { path: "/splitrequestnew/:id", component: SplitRequestNew },
  { path: "/finance/ubr", component: Ubr },
  { path: "/management/ubr", component: Ubr },

  //   { path: "/dashboard-crypto", component: DashboardCrypto },
  //   { path: "/dashboard-projects", component: DashboardProject },
  //   { path: "/dashboard-nft", component: DashboardNFT },
  //   { path: "/apps-calendar", component: Calendar },
  //   { path: "/apps-ecommerce-products", component: EcommerceProducts },
  //   { path: "/apps-ecommerce-product-details", component: EcommerceProductDetail },
  //   { path: "/apps-ecommerce-add-product", component: EcommerceAddProduct },
  //   { path: "/apps-ecommerce-orders", component: EcommerceOrders },
  //   { path: "/apps-ecommerce-order-details", component: EcommerceOrderDetail },
  //   { path: "/apps-ecommerce-customers", component: EcommerceCustomers },
  //   { path: "/apps-ecommerce-cart", component: EcommerceCart },
  //   { path: "/apps-ecommerce-checkout", component: EcommerceCheckout },
  //   { path: "/apps-ecommerce-sellers", component: EcommerceSellers },
  //   { path: "/apps-ecommerce-seller-details", component: EcommerceSellerDetail },

  //   //Chat
  //   { path: "/apps-chat", component: Chat },

  //   //EMail
  //   { path: "/apps-mailbox", component: MailInbox },
  //   { path: "/apps-email-basic", component: BasicAction },
  //   { path: "/apps-email-ecommerce", component: EcommerceAction },

  //   //Projects
  //   { path: "/apps-projects-list", component: ProjectList },
  //   { path: "/apps-projects-overview", component: ProjectOverview },
  //   { path: "/apps-projects-create", component: CreateProject },

  //   //Task
  //   { path: "/apps-tasks-list-view", component: TaskList },
  //   { path: "/apps-tasks-details", component: TaskDetails },
  //   { path: "/apps-tasks-kanban", component: KanbanBoard },
  //   //Crm
  //   { path: "/apps-crm-contacts", component: CrmContacts },
  //   { path: "/apps-crm-companies", component: CrmCompanies },
  //   { path: "/apps-crm-deals", component: CrmDeals },
  //   { path: "/apps-crm-leads", component: CrmLeads },

  //   //Invoices
  //   { path: "/apps-invoices-list", component: InvoiceList },
  //   { path: "/apps-invoices-details", component: InvoiceDetails },
  //   { path: "/apps-invoices-create", component: InvoiceCreate },

  //   //Supports Tickets
  //   { path: "/apps-tickets-list", component: ListView },
  //   { path: "/apps-tickets-details", component: TicketsDetails },

  //   //transactions
  //   { path: "/apps-crypto-transactions", component: Transactions },
  //   { path: "/apps-crypto-buy-sell", component: BuySell },
  //   { path: "/apps-crypto-orders", component: CryproOrder },
  //   { path: "/apps-crypto-wallet", component: MyWallet },
  //   { path: "/apps-crypto-ico", component: ICOList },
  //   { path: "/apps-crypto-kyc", component: KYCVerification },

  //   // NFT Marketplace
  //   { path: "/apps-nft-marketplace", component: Marketplace },
  //   { path: "/apps-nft-collections", component: Collections },
  //   { path: "/apps-nft-create", component: CreateNFT },
  //   { path: "/apps-nft-creators", component: Creators },
  //   { path: "/apps-nft-explore", component: ExploreNow },
  //   { path: "/apps-nft-item-details", component: ItemDetails },
  //   { path: "/apps-nft-auction", component: LiveAuction },
  //   { path: "/apps-nft-ranking", component: Ranking },
  //   { path: "/apps-nft-wallet", component: WalletConnect },

  //   //charts
  //   { path: "/charts-apex-line", component: LineCharts },
  //   { path: "/charts-apex-area", component: AreaCharts },
  //   { path: "/charts-apex-column", component: ColumnCharts },
  //   { path: "/charts-apex-bar", component: BarCharts },
  //   { path: "/charts-apex-mixed", component: MixedCharts },
  //   { path: "/charts-apex-timeline", component: TimelineCharts },
  //   { path: "/charts-apex-candlestick", component: CandlestickChart },
  //   { path: "/charts-apex-boxplot", component: BoxplotCharts },
  //   { path: "/charts-apex-bubble", component: BubbleChart },
  //   { path: "/charts-apex-scatter", component: ScatterCharts },
  //   { path: "/charts-apex-heatmap", component: HeatmapCharts },
  //   { path: "/charts-apex-treemap", component: TreemapCharts },
  //   { path: "/charts-apex-pie", component: PieCharts },
  //   { path: "/charts-apex-radialbar", component: RadialbarCharts },
  //   { path: "/charts-apex-radar", component: RadarCharts },
  //   { path: "/charts-apex-polar", component: PolarCharts },

  //   { path: "/charts-chartjs", component: ChartsJs },
  //   { path: "/charts-echarts", component: Echarts },

  //   // Base Ui
  //   { path: "/ui-alerts", component: UiAlerts },
  //   { path: "/ui-badges", component: UiBadges },
  //   { path: "/ui-buttons", component: UiButtons },
  //   { path: "/ui-colors", component: UiColors },
  //   { path: "/ui-cards", component: UiCards },
  //   { path: "/ui-carousel", component: UiCarousel },
  //   { path: "/ui-dropdowns", component: UiDropdowns },
  //   { path: "/ui-grid", component: UiGrid },
  //   { path: "/ui-images", component: UiImages },
  //   { path: "/ui-tabs", component: UiTabs },
  //   { path: "/ui-accordions", component: UiAccordions },
  //   { path: "/ui-modals", component: UiModals },
  //   { path: "/ui-offcanvas", component: UiOffcanvas },
  //   { path: "/ui-placeholders", component: UiPlaceholders },
  //   { path: "/ui-progress", component: UiProgress },
  //   { path: "/ui-notifications", component: UiNotifications },
  //   { path: "/ui-media", component: UiMediaobject },
  //   { path: "/ui-embed-video", component: UiEmbedVideo },
  //   { path: "/ui-typography", component: UiTypography },
  //   { path: "/ui-lists", component: UiList },
  //   { path: "/ui-general", component: UiGeneral },
  //   { path: "/ui-ribbons", component: UiRibbons },
  //   { path: "/ui-utilities", component: UiUtilities },

  //   // Advance Ui
  //   { path: "/advance-ui-nestable", component: UiNestableList },
  //   { path: "/advance-ui-scrollbar", component: UiScrollbar },
  //   { path: "/advance-ui-animation", component: UiAnimation },
  //   { path: "/advance-ui-tour", component: UiTour },
  //   { path: "/advance-ui-swiper", component: UiSwiperSlider },
  //   { path: "/advance-ui-ratings", component: UiRatings },
  //   { path: "/advance-ui-highlight", component: UiHighlight },

  //   // Widgets
  //   { path: "/widgets", component: Widgets },

  //   // Forms
  //   { path: "/forms-elements", component: BasicElements },
  //   { path: "/forms-select", component: FormSelect },
  //   { path: "/forms-editors", component: FormEditor },
  //   { path: "/forms-checkboxes-radios", component: CheckBoxAndRadio },
  //   { path: "/forms-masks", component: Masks },
  //   { path: "/forms-file-uploads", component: FileUpload },
  //   { path: "/forms-pickers", component: FormPickers },
  //   { path: "/forms-range-sliders", component: FormRangeSlider },
  //   { path: "/forms-layouts", component: Formlayouts },
  //   { path: "/forms-validation", component: FormValidation },
  //   { path: "/forms-wizard", component: FormWizard },
  //   { path: "/forms-advanced", component: FormAdvanced },
  //   { path: "/forms-select2", component: Select2 },

  //   //Tables
  //   { path: "/tables-basic", component: BasicTables },
  //   { path: "/tables-gridjs", component: GridTables },
  //   { path: "/tables-listjs", component: ListTables },
  //   { path: "/tables-datatables", component: DataTables },

  //   //Icons
  //   { path: "/icons-remix", component: RemixIcons },
  //   { path: "/icons-boxicons", component: BoxIcons },
  //   { path: "/icons-materialdesign", component: MaterialDesign },
  //   { path: "/icons-feather", component: FeatherIcons },
  //   { path: "/icons-lineawesome", component: LineAwesomeIcons },

  //   //Maps
  //   { path: "/maps-google", component: GoogleMaps },
  //   { path: "/maps-vector", component: VectorMaps },
  //   { path: "/maps-leaflet", component: LeafletMaps },

  //   //Pages
  //   { path: "/pages-starter", component: Starter },
  //   { path: "/pages-profile", component: SimplePage },
  //   { path: "/pages-profile-settings", component: Settings },
  //   { path: "/pages-team", component: Team },
  //   { path: "/pages-timeline", component: Timeline },
  //   { path: "/pages-faqs", component: Faqs },
  //   { path: "/pages-gallery", component: Gallery },
  //   { path: "/pages-pricing", component: Pricing },
  //   { path: "/pages-sitemap", component: SiteMap },
  //   { path: "/pages-search-results", component: SearchResults },

  //User Profile
  //   { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: () => {
      !sessionStorage.getItem("checktype") == "all" ? (
        <Redirect to="/my-projects" />
      ) : (
        <Redirect to="/dashboard" />
      );
    },
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/enter-otp", component: BasicTwosVerify },

  //   { path: "/forgot-password", component: ForgetPasswordPage },
  //   { path: "/register", component: Register },

  //AuthenticationInner pages
  //   { path: "/auth-signin-basic", component: BasicSignIn },
  //   { path: "/auth-signin-cover", component: CoverSignIn },
  //   { path: "/auth-signup-basic", component: BasicSignUp },
  //   { path: "/auth-signup-cover", component: CoverSignUp },
  //   { path: "/auth-pass-reset-basic", component: BasicPasswReset },
  //   { path: "/auth-pass-reset-cover", component: CoverPasswReset },
  //   { path: "/auth-lockscreen-basic", component: BasicLockScreen },
  //   { path: "/auth-lockscreen-cover", component: CoverLockScreen },
  //   { path: "/auth-logout-basic", component: BasicLogout },
  //   { path: "/auth-logout-cover", component: CoverLogout },
  //   { path: "/auth-success-msg-basic", component: BasicSuccessMsg },
  //   { path: "/auth-success-msg-cover", component: CoverSuccessMsg },
  //   { path: "/auth-twostep-basic", component: BasicTwosVerify },
  //   { path: "/auth-twostep-cover", component: CoverTwosVerify },
  //   { path: "/auth-404-basic", component: Basic404 },
  //   { path: "/auth-404-cover", component: Cover404 },
  //   { path: "/auth-404-alt", component: Alt404 },
  //   { path: "/auth-500", component: Error500 },
  //   { path: "/pages-maintenance", component: Maintenance },
  //   { path: "/pages-coming-soon", component: ComingSoon },

  //   { path: "/landing", component: OnePage },
  //   { path: "/nft-landing", component: NFTLanding },

  //   { path: "/auth-pass-change-basic", component: BasicPasswCreate },
  //   { path: "/auth-pass-change-cover", component: CoverPasswCreate },
  //   { path: "/auth-offline", component: Offlinepage },
];

export { authProtectedRoutes, publicRoutes };
