import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardElement = ({ children }) => {
  return (
    <Card style={{ width: "auto" }}>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default CardElement;
