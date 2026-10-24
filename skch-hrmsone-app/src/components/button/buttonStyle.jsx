export const addButtonStyles = (theme) => ({
  boxShadow: "none",

  // Active state
  backgroundColor: theme.colors.blue.btnBgm,
  color: theme.colors.white.btn,

  "&:hover": {
    backgroundColor: theme.colors.blue.btnBgmHover,
    color: theme.colors.white.btn,
    boxShadow: "none",
  },

  // Disabled state
  "&.Mui-disabled": {
    backgroundColor: theme.colors.white.btnBgm,
    border: `1px solid ${theme.colors.white.btnBorder}`,
    color: theme.colors.gray.btn,
    boxShadow: "none",
  },
});

export const closeButtonStyles = (theme) => ({
  boxShadow: "none",

  // Active state
  backgroundColor: theme.colors.white.btn,
  color: theme.colors.teal.btn,
  border: `1px solid ${theme.colors.teal.btn}`,

  "&:hover": {
    backgroundColor: theme.colors.white[100],
    boxShadow: "none",
  },

  // Disabled state
  "&.Mui-disabled": {
    backgroundColor: theme.colors.white.btn,
    border: `1px solid ${theme.colors.white[200]}`,
    color: theme.colors.gray[100],
  },
});
