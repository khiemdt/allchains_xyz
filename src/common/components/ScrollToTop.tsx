import { useEffect } from "react";
import { useLocation } from "react-router";

interface Props {
  children: any;
}

const ScrollToTop = (props: Props) => {
  const { children } = props;
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

export default ScrollToTop;
