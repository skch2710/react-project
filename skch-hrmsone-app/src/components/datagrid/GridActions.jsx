import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { IconButton, Tooltip } from "@mui/material";
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiOutlinePlus,
} from "react-icons/ai";
import { BiBlock, BiEditAlt, BiLocationPlus, BiUpload } from "react-icons/bi";
import { BsCheckCircle, BsSend, BsXCircle } from "react-icons/bs";
import { FaBell, FaFilePdf, FaPrescription, FaSort } from "react-icons/fa";
import { FaFileZipper, FaRegBell } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import {
    IoIosCheckmarkCircle,
    IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import {
    MdOutlineFilterList,
    MdOutlineHistory,
    MdOutlineMedicalServices,
    MdOutlineVerified,
    MdVerified,
} from "react-icons/md";
import {
    RiDeleteBinLine,
    RiDownload2Line,
    RiFileCopyLine,
    RiFileExcel2Fill,
} from "react-icons/ri";
import { TiExportOutline } from "react-icons/ti";

import Button from "../button/Button";

export const ACTION_ICONS = {
  view: AiOutlineEye,
  hide: AiOutlineEyeInvisible,
  edit: BiEditAlt,
  delete: RiDeleteBinLine,
  copy: RiFileCopyLine,
  clear: BsXCircle,
  block: BiBlock,
  terminate: BiBlock,
  active: BsCheckCircle,
  inactive: BsCheckCircle,
  check: CheckCircleOutlineIcon,
  checkMarkChecked: IoIosCheckmarkCircle,
  checkMarkUnchecked: IoIosCheckmarkCircleOutline,
  approved: MdVerified,
  unApproved: MdOutlineVerified,
  location: BiLocationPlus,
  send: BsSend,
  plus: AiOutlinePlus,
  history: MdOutlineHistory,
  person: FaPrescription,
  pharmacy: MdOutlineMedicalServices,
  exportRowLevel: TiExportOutline,
  exportFile: RiDownload2Line,
  download: FiDownload,
  notification: FaBell,
  notificationOutlined: FaRegBell,
  filter: MdOutlineFilterList,
  sort: FaSort,
};

const resolveColor = (theme, type, { disabled, isBlocked, isTerminated }) => {
  const { colors } = theme;
  switch (type) {
    case "block":
      if (isBlocked) return theme.palette.error.main;
      return disabled ? colors.grey[500] : undefined;
    case "terminate":
      return isTerminated ? colors.red[900] : undefined;
    case "active":
    case "checkMarkChecked":
      return disabled && type === "active" ? undefined : colors.green[800];
    case "inactive":
      return disabled ? undefined : colors.grey.inactive;
    case "approved":
      return colors.green[700];
    case "clear":
      return "red";
    default:
      return undefined;
  }
};

export const GridActionIcon = ({
  type,
  onClick,
  disabled = false,
  tooltip,
  isBlocked = false,
  isTerminated = false,
  toolbar = false,
  sx,
  ...rest
}) => {
  const Icon = ACTION_ICONS[type];
  if (!Icon) return null;

  const button = (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      sx={[
        (theme) => ({
          color:
            resolveColor(theme, type, { disabled, isBlocked, isTerminated }) ??
            theme.colors.blue.dark,
          fontSize: toolbar ? "24px" : "14px",
          height: toolbar ? 30 : undefined,
          padding: "4px",
          "&.Mui-disabled": { color: theme.colors.grey[500] },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      <Icon />
    </IconButton>
  );

  if (!tooltip) return button;
  // span keeps the tooltip working while the button is disabled.
  return (
    <Tooltip title={tooltip}>
      <span>{button}</span>
    </Tooltip>
  );
};

// TableIcons (toolbar buttons) built on the shared Button variants.
export const ACTION_BUTTONS = {
  bulkUpload: {
    variant: "grayOutlined",
    icon: <BiUpload />,
    label: "Bulk Upload",
  },
  add: { variant: "grayOutlined", icon: <AddCircleOutlineIcon /> },
  outlined: { variant: "blueOutlined", icon: <AddCircleOutlineIcon /> },
  upload: {
    variant: "outlined",
    icon: <BackupOutlinedIcon />,
    label: "Upload Locations",
  },
  exportExcel: {
    variant: "blueOutlined",
    icon: <RiFileExcel2Fill />,
    label: "Export",
  },
  exportPdf: {
    variant: "exportOutlined",
    icon: <FaFilePdf />,
    label: "Export",
  },
  exportZip: {
    variant: "exportOutlinedIcon",
    icon: <FaFileZipper />,
    iconOnly: true,
  },
};

export const ActionButton = ({
  type,
  label,
  children,
  disabled = false,
  tooltip,
  ...rest
}) => {
  const config = ACTION_BUTTONS[type];
  if (!config) return null;

  const { CustomIcon } = config;
  const actionIcon = CustomIcon ? (
    <CustomIcon disabled={disabled} />
  ) : (
    config.icon
  );
  const startIcon = config.iconOnly ? undefined : actionIcon;
  const buttonSx = config.iconOnly
    ? [
        { minWidth: 32, width: 32, height: 32, padding: 0, fontSize: 18 },
        ...(Array.isArray(rest.sx) ? rest.sx : rest.sx ? [rest.sx] : []),
      ]
    : rest.sx;

  const button = (
    <Button
      variant={config.variant}
      startIcon={startIcon}
      disabled={disabled}
      {...rest}
      sx={buttonSx}
    >
      {config.iconOnly ? (
        actionIcon
      ) : (
        (children ?? label ?? config.label)
      )}
    </Button>
  );

  if (!tooltip) return button;
  return (
    <Tooltip title={tooltip}>
      <span>{button}</span>
    </Tooltip>
  );
};

// Renders a row's actions: [{ type, onClick, disabled, tooltip, ... }]
const GridActions = ({ actions = [], row }) =>
  actions.map(({ type, onClick, disabled, ...action }) => (
    <GridActionIcon
      key={type}
      type={type}
      onClick={onClick ? () => onClick(row) : undefined}
      disabled={typeof disabled === "function" ? disabled(row) : disabled}
      {...action}
    />
  ));

export default GridActions;
