"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoAddCircleOutline, IoCloseCircleOutline } from "react-icons/io5";

const Accordion = ({
  title,
  children,
  isOpen,
  onToggle,
  isLast,
}: {
  title: string;
  children: string;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) => {
  return (
    <div
      onClick={onToggle}
      className={`${
        isLast ? "" : "border-b border-[#DDDDDD]"
      } py-4 xs:py-5 lg:py-6 flex flex-col gap-2.5 xs:gap-4 cursor-pointer`}
    >
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-bold text-sm xs:text-base lg:text-lg text-[#060807] dark:text-[#ffffff]">
          {title}
        </h1>
        <div className="text-2xl xs:text-3xl text-primary">
          {!isOpen ? <IoAddCircleOutline /> : <IoCloseCircleOutline />}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-xs xs:text-sm lg:text-base font-medium text-[#787878] dark:text-[#D2D2D2] 2xs:mt-1">
              {children}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
