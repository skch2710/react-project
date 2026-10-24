
For the default MUI (Material UI) theme, the typography variant font sizes are:

Variant	Font Size
h1	96px (6rem)
h2	60px (3.75rem)
h3	48px (3rem)
h4	34px (2.125rem)
h5	24px (1.5rem)
h6	20px (1.25rem)
subtitle1	16px (1rem)  --> Ovveride to 18px
subtitle2	14px (0.875rem)
body1	16px (1rem)
body2	14px (0.875rem)
button	14px (0.875rem)
caption	12px (0.75rem)
overline	12px (0.75rem)

These are the default typography

import { useCallback, useState } from "react";

import Button from "./components/button/Button";
import Typography from "./components/typography/Typography";

import { boldText, colorTextStyles } from "./styles/globalStyles";

const App = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => {
    setCount((previousCount) => previousCount + 1);
  }, []);

  return (
    <div>
      <Button onClick={handleIncrement}>Increment Count</Button>

      <Typography>Default Body1 16px : {count}</Typography>

      <Typography variant="caption" color="primary">
        Primary Color 12px
      </Typography>

      <Typography variant="body1" color="secondary">
        Secondary Color 16px
      </Typography>

      <Typography variant="body2" color="success.main">
        Success Color 14px
      </Typography>

      <Typography variant="subtitle1" color="error">
        Error Color 18px
      </Typography>

      <Typography variant="subtitle2" sx={colorTextStyles}>
        Custom Color 14px
      </Typography>

      <Typography variant="caption" color="primary" sx={boldText}>
        Primary Color 12px with Bold
      </Typography>
    </div>
  );
};

export default App;
