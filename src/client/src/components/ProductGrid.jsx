import React from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";

export default function ProductGrid({ products }) {
  return (
    <Row>
      {products.map(product => (
        <Col key={product.productId} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm">
            {product.imageUrl && (
              <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
            )}
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text className="fw-bold text-primary">${product.price}</Card.Text>

              {product.variations.length > 0 && (
                <Badge bg="info">{product.variations.length} variations</Badge>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
