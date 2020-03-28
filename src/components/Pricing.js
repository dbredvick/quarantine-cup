import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Pricing.scss";

function Pricing(props) {
  return (
    <Row>
      {props.items.map((item, index) => (
        <Col
          xs={12}
          md={4}
          className="py-3 d-flex align-items-stretch"
          key={index}
        >
          <Card>
            <Card.Body className="d-flex flex-column p-4">
              <h5 className="font-weight-bold mb-4">{item.name}</h5>
              <h1 className="font-weight-bold mb-3">
                <small className="Pricing__price-symbol">$</small>
                <span>{item.price}</span>
                <small className="Pricing__price-month">/m</small>
              </h1>
              <Card.Text className="mb-4">{item.description}</Card.Text>
              <Button
                variant="primary"
                size="lg"
                block={true}
                onClick={() => props.onChoosePlan(item.id)}
                className="mt-auto"
              >
                {props.buttonText}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Pricing;
