import './Card.css';

/**
 * Flexible Card component with compound layout subcomponents
 */
export const Card = ({ children, className = '', elevated = false, onClick, ...props }) => {
  return (
    <div
      className={`card ${elevated ? 'card--elevated' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`card__header ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', as: Tag = 'h3', ...props }) => {
  return (
    <Tag className={`card__title ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`card__description ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`card__body ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`card__footer ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
