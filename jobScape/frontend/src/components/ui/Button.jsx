import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, to, href, variant = "primary", className = "", ...rest }) => {
  const classes = ["btn"];
  if (variant === "outline") classes.push("outline_btn");
  if (variant === "black") classes.push("black_btn");
  if (className) classes.push(className);

  if (to) {
    return (
      <Link to={to} className={classes.join(" ")} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes.join(" ")} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes.join(" ")} {...rest}>
      {children}
    </button>
  );
};

export default Button;
