import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #3e4f2b !important;
  height: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CategoryButton = styled.button`
  padding: 15px 20px;
  background-color: ${props => props.active ? '#007bff' : '#fff'};
  color: ${props => props.active ? '#fff' : '#000000'};
  border: 2px solid ${props => props.active ? '#007bff' : '#ddd'};
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;

  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#f0f0f0'};
    border-color: #007bff;
  }
`;

const categories = [
  { id: 1, name: 'Men\'s Clothing', count: 24 },
  { id: 2, name: 'Women\'s Clothing', count: 32 },
  { id: 3, name: 'Accessories', count: 18 },
  { id: 4, name: 'Shoes', count: 15 },
  { id: 5, name: 'Outerwear', count: 12 }
];

export default function CategorySelector({ onCategorySelect, selectedCategory }) {
  return (
    <Container>
      <Title>Categories</Title>
      <CategoryList>
        {categories.map(category => (
          <CategoryButton
            key={category.id}
            active={selectedCategory === category.id}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryList>
    </Container>
  );
}