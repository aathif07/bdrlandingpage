import React from "react";
import { motion } from "framer-motion";

type CallbackButtonProps = {
  isCallbackActive: boolean;
  phoneIcon: string;
  onClick: () => void;
};

const CallbackButton: React.FC<CallbackButtonProps> = ({ isCallbackActive, phoneIcon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
    >
      <motion.img
        src={phoneIcon}
        alt="Phone Icon"
        className="w-5 h-5 mr-2"
        animate={isCallbackActive ? { rotate: [0, 15, -15, 15, -15, 0] } : {}}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
      Set Up a Callback
    </button>
  );
};

export default CallbackButton;