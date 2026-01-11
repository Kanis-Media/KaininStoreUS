import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  height: 100%;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #666;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductName = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
`;

// Mock product data
const allProducts = {
  1: [ // Men's Clothing
    { id: 1, name: 'Classic T-Shirt', price: 29.99 },
    { id: 2, name: 'Denim Jeans', price: 79.99 },
    { id: 3, name: 'Polo Shirt', price: 49.99 },
    { id: 4, name: 'Dress Shirt', price: 59.99 }
  ],
  2: [ // Women's Clothing
    { id: 5, name: 'Summer Dress', price: 89.99 },
    { id: 6, name: 'Blouse', price: 54.99 },
    { id: 7, name: 'Skirt', price: 44.99 },
    { id: 8, name: 'Cardigan', price: 64.99 }
  ],
  3: [ // Accessories
    { id: 9, name: 'Leather Belt', price: 34.99 },
    { id: 10, name: 'Sunglasses', price: 89.99 },
    { id: 11, name: 'Watch', price: 149.99 }
  ],
  4: [ // Shoes
    { id: 12, name: 'Sneakers', price: 99.99 },
    { id: 13, name: 'Boots', price: 129.99 },
    { id: 14, name: 'Sandals', price: 49.99 }
  ],
  5: [ // Outerwear
    { id: 15, name: 'Winter Jacket', price: 199.99 },
    { id: 16, name: 'Raincoat', price: 89.99 },
    { id: 17, name: 'Hoodie', price: 59.99 }
  ]
};

const categoryNames = {
  1: 'Men\'s Clothing',
  2: 'Women\'s Clothing',
  3: 'Accessories',
  4: 'Shoes',
  5: 'Outerwear'
};

export default function ProductDisplay({ selectedCategory }) {
  const products = selectedCategory ? allProducts[selectedCategory] : [];
  const categoryName = selectedCategory ? categoryNames[selectedCategory] : '';

  return (
    <Container>
      <Header>
        <Title>{categoryName || 'Select a Category'}</Title>
        <SubTitle>
          {products.length > 0 
            ? `Showing ${products.length} products` 
            : 'Choose a category to view products'}
        </SubTitle>
      </Header>
      
      <ProductGrid>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ProductImage>
              Product Image
            </ProductImage>
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>${product.price}</ProductPrice>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
}