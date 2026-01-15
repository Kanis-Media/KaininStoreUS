import React, { useState} from "react";
import SplitScreen from "../components/SplitScreen";
import CategorySelector from "../components/CategorySelector";
import ProductDisplay from "../components/ProductDisplay";



function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <SplitScreen leftWeight={1} rightWeight={4}>
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