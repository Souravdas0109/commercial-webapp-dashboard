import { Avatar } from "@material-ui/core";
import { blue, purple, red } from "@material-ui/core/colors";
import NotificationsIcon from "@material-ui/icons/Notifications";
import WarningIcon from "@material-ui/icons/Warning";
import BlockIcon from "@material-ui/icons/Block";
import BackupIcon from "@material-ui/icons/Backup";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import AttachFileIcon from "@material-ui/icons/AttachFile";

export const notifications = [
  {
    title: "Product Portal",
    description:
      "5 New Lines submitted by the supplier. Pending for your approval",
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
  {
    title: "Promotion and Funding",
    description: "Finance has asked clarification on the Request : 123",
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
  {
    title: "Product Portal",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, quam.",
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
  {
    title: "Product Portal",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, quam.",
    icon: (
      <Avatar>
        <WarningIcon style={{ color: purple[500] }} />
      </Avatar>
    ),
  },
  {
    title: "Supplier Portal",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, quam.",
    icon: (
      <Avatar>
        <WarningIcon style={{ color: purple[500] }} />
      </Avatar>
    ),
  },
  {
    title: "Supplier Portal",
    description:
      "Supplier set up has been completed successfully for Happy Life Plc and is ready for transactions",
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
  {
    title: "Product Portal",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, illo?",
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
];

export const notifications2 = [
  {
    title: "Service Portal",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quae?",
    icon: (
      <Avatar>
        <BlockIcon style={{ color: red[500] }} />
      </Avatar>
    ),
  },
  {
    title: "User Analytics",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea natus facere veritatis.",
    icon: (
      <Avatar>
        <WarningIcon style={{ color: purple[500] }} />
      </Avatar>
    ),
  },
  {
    title: "Price Portal",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, quam.",
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
  {
    title: "Product Portal",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, quam.",
    icon: (
      <Avatar>
        <WarningIcon style={{ color: purple[500] }} />
      </Avatar>
    ),
  },
  {
    title: "Supplier Portal",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, quam.",
    icon: (
      <Avatar>
        <WarningIcon style={{ color: purple[500] }} />
      </Avatar>
    ),
  },
  {
    title: "Store Portal",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur tempore quam repellat commodi?",
    icon: (
      <Avatar>
        <BackupIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
  {
    title: "Product Portal",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, illo?",
    icon: (
      <Avatar>
        <NotificationsIcon style={{ color: blue[500] }} />
      </Avatar>
    ),
  },
];

export const commercialdash = [
  {
    title: "Dashboard",
    url: "/Commercial/dashboard",
    more: [],
  },
  {
    title: "Tasklists",
    url: "#",
    more: [
      {
        title: "Promotions & Funding",
        url: "/Commercial/promotions",
      },
      {
        title: "Retail Price Change",
        url: "/Commercial/retail",
      },
      {
        title: "Range Amendment",
        url: "/Commercial/range",
      },
      {
        title: "Product Portal",
        url: "/Commercial/product",
      },
      {
        title: "Supplier Portal",
        url: "/Commercial/supplier",
      },
    ],
  },
  {
    title: "KPI Analytics",
    url: "/Commercial/analytics",
    more: [],
  },
];

export const commercialtask = [
  {
    title: "Promotions & Funding",
    url: "/Commercial/promotions",
  },
  {
    title: "Retail Price Change",
    url: "/Commercial/retail",
  },
  {
    title: "Range Amendment",
    url: "/Commercial/range",
  },
  {
    title: "Product Portal",
    url: "/Commercial/product",
  },
  {
    title: "Supplier Portal",
    url: "/Commercial/supplier",
  },
];

export const userconfig = [
  {
    title: "User Information",
    url: "/userconfig/userinfo",
  },
  {
    title: "Create User",
    url: "/userconfig/usercreate",
  },
];

export const dashboard = [
  {
    title: "Promotion & Funding",
    statuscomplete: "Onetime Completion in last 3 months",
    statuscompleteval: "90%",
    reworkcomplete: "Reworks in last 3 months",
    reworkcompleteval: "15%",
    data: [
      {
        data: "Actions Pending with you",
        value: "3",
      },
      {
        data: "Actions Pending with your group",
        value: "7",
      },
      {
        data: "Unassigned workflows in your group",
        value: "5",
      },
      {
        data: "In Progress workflows initiated by you",
        value: "12",
      },
    ],
    icon: <LabelImportantIcon style={{ color: "white" }} />,
  },
  {
    title: "Retail Price Change",
    statuscomplete: "Onetime Completion in last 3 months",
    statuscompleteval: "92%",
    reworkcomplete: "Reworks in last 3 months",
    reworkcompleteval: "05%",
    data: [
      {
        data: "Actions Pending with you",
        value: "2",
      },
      {
        data: "Actions Pending with your group",
        value: "5",
      },
      {
        data: "Unassigned workflows in your group",
        value: "5",
      },
      {
        data: "In Progress workflows initiated by you",
        value: "0",
      },
    ],
    icon: <LabelImportantIcon style={{ color: "white" }} />,
  },
  {
    title: "Range Amendment",
    statuscomplete: "Onetime Completion in last 3 months",
    statuscompleteval: "85%",
    reworkcomplete: "Reworks in last 3 months",
    reworkcompleteval: "05%",
    data: [
      {
        data: "Actions Pending with you",
        value: "2",
      },
      {
        data: "Actions Pending with your group",
        value: "2",
      },
      {
        data: "Unassigned workflows in your group",
        value: "0",
      },
      {
        data: "In Progress workflows initiated by you",
        value: "2",
      },
    ],
    icon: <LabelImportantIcon style={{ color: "white" }} />,
  },
  {
    title: "Product Portal",
    statuscomplete: "Onetime Completion in last 3 months",
    statuscompleteval: "75%",
    reworkcomplete: "Reworks in last 3 months",
    reworkcompleteval: "22%",
    data: [
      {
        data: "Actions Pending with you",
        value: "15",
      },
      {
        data: "Actions Pending with your group",
        value: "21",
      },
      {
        data: "Unassigned workflows in your group",
        value: "7",
      },
      {
        data: "In Progress workflows initiated by you",
        value: "25",
      },
    ],
    icon: <LabelImportantIcon style={{ color: "white" }} />,
  },
  {
    title: "Supplier Portal",
    statuscomplete: "Onetime Completion in last 3 months",
    statuscompleteval: "90%",
    reworkcomplete: "Reworks in last 3 months",
    reworkcompleteval: "15%",
    data: [
      {
        data: "Actions Pending with you",
        value: "3",
      },
      {
        data: "Actions Pending with your group",
        value: "7",
      },
      {
        data: "Unassigned workflows in your group",
        value: "5",
      },
      {
        data: "In Progress workflows initiated by you",
        value: "12",
      },
    ],
    icon: <LabelImportantIcon style={{ color: "white" }} />,
  },
  {
    title: "Price Portal",
    statuscomplete: "Onetime Completion in last 3 months",
    statuscompleteval: "70%",
    reworkcomplete: "Reworks in last 3 months",
    reworkcompleteval: "30%",
    data: [
      {
        data: "Actions Pending with you",
        value: "3",
      },
      {
        data: "Actions Pending with your group",
        value: "7",
      },
      {
        data: "Unassigned workflows in your group",
        value: "5",
      },
      {
        data: "In Progress workflows initiated by you",
        value: "12",
      },
    ],
    icon: <LabelImportantIcon style={{ color: "white" }} />,
  },
];

export const promotions = [
  {
    id: 345564,
    subprocess: "Create Simple Promotion",
    decription: "Create Simple Promotion",
    createdate: "26-Feb-2021 9:45 AM",
    lastupdatedate: "26-Feb-2021 9:45 AM",
    status: "In Progress",
    logs: "Open",
    attachments: <AttachFileIcon />,
    action: "Open",
  },
  {
    id: 345566,
    subprocess: "Create Multibuy Promotion",
    decription: "Meal Deal Promotion",
    createdate: "23-Feb-2021 11:45 AM",
    lastupdatedate: "23-Feb-2021 11:45 AM",
    status: "In Progress",
    logs: "Open",
    attachments: "",
    action: "Open",
  },
  {
    id: 345598,
    subprocess: "Modify Promotion",
    decription: "Mothers Day Event update",
    createdate: "22-Feb-2021 3:23 PM",
    lastupdatedate: "22-Feb-2021 3:23 PM",
    status: "In Progress",
    logs: "Open",
    attachments: <AttachFileIcon />,
    action: "Open",
  },
  {
    id: 345500,
    subprocess: "Create Simple Coupon",
    decription: "Create Simple Coupon",
    createdate: "26-Mar-2021 9:45 AM",
    lastupdatedate: "26-Mar-2021 9:45 AM",
    status: "In Progress",
    logs: "Open",
    attachments: <AttachFileIcon />,
    action: "Open",
  },
  {
    id: 445564,
    subprocess: "Create Simple Deal",
    decription: "Bumper Super Deal",
    createdate: "26-Apr-2021 9:45 AM",
    lastupdatedate: "26-Apr-2021 9:45 AM",
    status: "In Progress",
    logs: "Open",
    attachments: "",
    action: "Open",
  },
  {
    id: 345564,
    subprocess: "Create Complex Promotion",
    decription: "Create Complex Promotion",
    createdate: "26-Feb-2020 9:45 AM",
    lastupdatedate: "26-Feb-2020 9:45 AM",
    status: "In Progress",
    logs: "Open",
    attachments: <AttachFileIcon />,
    action: "Open",
  },
  {
    id: 345564,
    subprocess: "Create Simple Supplier Chain",
    decription: "Create Simple Supplier Chain",
    createdate: "26-Feb-2021 10:45 AM",
    lastupdatedate: "26-Feb-2021 10:45 AM",
    status: "In Progress",
    logs: "Open",
    attachments: "",
    action: "Open",
  },
  {
    id: 545564,
    subprocess: "Lorem ipsum dolor sit amet.",
    decription: "Lorem ipsum dolor sit amet consectetur.",
    createdate: "16-Feb-2021 9:45 AM",
    lastupdatedate: "16-Feb-2021 9:45 AM",
    status: "In Progress",
    logs: "Open",
    attachments: <AttachFileIcon />,
    action: "Open",
  },
];
