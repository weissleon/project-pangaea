import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useOutlet } from "react-router-dom";

type Props = {};

const App = (props: Props) => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    return () => {};
  }, [location]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AnimatedOutlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default App;

const AnimatedOutlet = () => {
  const o = useOutlet();
  const [outlet, _] = useState(o);

  return outlet;
};
