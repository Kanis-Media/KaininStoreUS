import React, { useState } from "react";
import SplitScreen from "../components/SplitScreen";
import CategorySelector from "../components/CategorySelector";
import ProductDisplay from "../components/ProductDisplay";
import { Button } from "react-bootstrap";

function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ leftWeight, setLeftWeight] = useState(1);

  const collapseSidebar = () => {
  setLeftWeight(prev => (prev === 1 ? 0 : 1));
};


  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Button onClick={() => {collapseSidebar()}}>{leftWeight === 1 ? "Collapse Menu" : "Expand Menu"}</Button>
      <SplitScreen leftWeight={leftWeight} rightWeight={4}>
        
        <CategorySelector 
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <ProductDisplay selectedCategory={selectedCategory} />
      </SplitScreen>
    </div>
  );
}

export default ProductPage;