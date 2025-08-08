import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  icon = "Inbox", 
  title = "Nothing here yet", 
  description = "Get started by adding your first item",
  action = null,
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col items-center justify-center min-h-[400px] text-center px-6 ${className}`}
    >
      <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={48} className="text-primary" />
      </div>
      
      <h3 className="text-2xl font-display font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Empty;