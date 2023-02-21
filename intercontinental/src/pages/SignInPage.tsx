import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

type Props = {};

const SignInPage = (props: Props) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      className="w-screen flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <section className="bg-blue-400 w-screen h-screen">
        <h1>Hello Sign In</h1>
      </section>
    </motion.div>
  );
};

export default SignInPage;
