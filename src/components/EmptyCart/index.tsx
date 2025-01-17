import { motion } from "framer-motion";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-2xl font-semibold">Ops...</span>

      <p>
        Parece que seu carrinho está vazio,
        <Link href="/">
          <motion.button
            className="py-2 px-1 rounded-md text-blue-600"
            whileTap={{ scale: 0.85 }}
          >
            clique aqui
          </motion.button>
        </Link>
        e vamos adicionar alguns produtos!
      </p>
    </div>
  );
};

export { EmptyCart };
