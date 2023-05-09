import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardElement = ({ children, height }) => {
  return (
    <Card style={{ width: "auto", height: height }}>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default CardElement;
