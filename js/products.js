const products = [
    {
        id: 1,
        name: 'JACKET',
        collection: 'THEORY OF IDEOLOGY',
        price: 18000,
        description: 'theory of ideology jacket',
        details: '100% swag',
        image: 'images/products/jackettheory1.jpg',
        inStock: true,
        isNew: true,
        sizes: ['BABY SIZE', 'BIG SIZE']
    },
    {
        id: 2,
        name: 'T-SHIRT',
        collection: 'KOE NO KATACHI',
        price: 4500,
        salePrice: 3000,
        description: 'koe no katachi tshirt',
        details: '100% swag',
        image: 'images/products/koet.jpg',
        inStock: true,
        isNew: false,
        sizes: ['BABY SIZE', 'BIG SIZE']
    },
    {
        id: 3,
        name: 'HOODIE',
        collection: 'THEORY OF IDEOLOGY',
        price: 10000,
        description: 'theory of ideology hoodie',
        details: '100% swag',
        image: 'images/products/jackettheory.jpg',
        inStock: true,
        isNew: true,
        sizes: ['BABY SIZE', 'BIG SIZE']
    },
    {
        id: 4,
        name: 'LONG',
        collection: 'KOE NO KATACHI',
        price: 8000,
        salePrice: 6000,
        description: 'koe no katachi long',
        details: '100% swag',
        image: 'images/products/koel.png',
        inStock: false,
        isNew: false,
        sizes: ['BABY SIZE', 'BIG SIZE']
    },
    {
        id: 5,
        name: 'T-SHIRT',
        collection: 'DIPSIZE CASTLE ANARCHY',
        price: 4000,
        salePrice: 3500,
        description: 'dipsize castle anarchy tshirt',
        details: '100% swag',
        image: 'images/products/dt.png',
        inStock: true,
        isNew: false,
        sizes: ['BABY SIZE', 'BIG SIZE']
    },
    {
        id: 6,
        name: 'LONG',
        collection: 'THEORY OF IDEOLOGY',
        price: 6000,
        description: 'theory of ideology long',
        details: '100% swag',
        image: 'images/products/long.jpg',
        inStock: true,
        isNew: true,
        sizes: ['BABY SIZE', 'BIG SIZE']
    },
    {
        id: 7,
        name: 'PANTS',
        collection: 'THEORY OF IDEOLOGY',
        price: 5000,
        description: 'theory of ideology pants',
        details: '100% swag',
        image: 'images/products/pants.jpg',
        inStock: true,
        isNew: true,
        sizes: ['BABY SIZE', 'BIG SIZE']
    },
    {
        id: 8,
        name: 'T-SHIRT',
        collection: 'DIPSIZE CASTLE ANARCHY',
        price: 3000,
        description: 'dipsize castle anarchy tshirt',
        details: '100% swag',
        image: 'images/products/dt2.png',
        inStock: true,
        isNew: false,
        sizes: ['BABY SIZE', 'BIG SIZE']
    },
    {
        id: 9,
        name: 'HOODIE',
        collection: 'KOE NO KATACHI',
        price: 10000,
        salePrice: 8000,
        description: 'koe no katachi hoodie',
        details: '100% swag',
        image: 'images/products/koeh.png',
        inStock: true,
        isNew: false,
        sizes: ['BABY SIZE', 'BIG SIZE']
    },
    {
        id: 10,
        name: 'T-SHIRT',
        collection: 'YOU ARE NOT ALONE',
        price: 5000,
        description: 'you are not alone',
        details: '100% swag',
        image: 'images/products/kont.png',
        inStock: true,
        isNew: false,
        sizes: ['BABY SIZE', 'BIG SIZE']
    },
    {
        id: 11,
        name: 'LONG',
        collection: 'YOU ARE NOT ALONE',
        price: 7000,
        salePrice: 6000,
        description: 'you are not alone long',
        details: '100% swag',
        image: 'images/products/konl.png',
        inStock: true,
        isNew: false,
        sizes: ['BABY SIZE', 'BIG SIZE']
    },
    {
        id: 12,
        name: 'HOODIE',
        collection: 'YOU ARE NOT ALONE',
        price: 9000,
        description: 'you are not alone hoodie',
        details: '100% swag',
        image: 'images/products/konh.png',
        inStock: true,
        isNew: false,
        sizes: ['BABY SIZE', 'BIG SIZE']
    },
];

const collections = [
    {
        id: 1,
        name: 'THEORY OF IDEOLOGY',
        description: 'zxcursed merch',
        image: 'images/collections/zxcursed.jpg'
    },
    {
        id: 2,
        name: 'DIPSIZE CASTLE ANARCHY',
        description: 'loonklvge merch',
        image: 'images/collections/loonklage.jpg'
    },
    {
        id: 3,
        name: 'KOE NO KATACHI',
        description: 'jzxdx merch',
        image: 'images/collections/jzxdx.jpg'
    },
    {
        id: 4,
        name: 'YOU ARE NOT ALONE',
        description: 'jzxdx x conjuctiva merch',
        image: 'images/collections/xxx.jpg'
    }
];

function getProductById(id) {
    return products.find(product => product.id === id);
}

function getCollectionById(id) {
    return collections.find(collection => collection.id === id);
}

function getProductsByCollection(collectionName) {
    return products.filter(product => product.collection === collectionName);
}

function createProductCard(product) {
    const finalPrice = product.salePrice || product.price;
    const discount = product.salePrice ? 
        Math.round((1 - product.salePrice / product.price) * 100) : 0;
    
    let badge = '';
    if (product.isNew) {
        badge = '<div class="product-badge">NEW</div>';
    }
    if (product.salePrice) {
        badge = `<div class="product-badge">-${discount}%</div>`;
    }
    if (!product.inStock) {
        badge = '<div class="product-badge" style="background: #666;">НЕТ В НАЛИЧИИ</div>';
    }
    
    return `
        <div class="product-card" onclick="openProductDetail(${product.id})">
            ${badge}
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 style="margin-bottom: 0.5rem;">${product.name}</h3>
                <p style="color: var(--white-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">
                    ${product.collection}
                </p>
                <div class="product-price">
                    ${product.salePrice ? 
                        `<span style="text-decoration: line-through; color: var(--white-secondary); margin-right: 10px; font-size: 0.9rem;">
                            ${product.price.toLocaleString()} ₽
                        </span>` 
                        : ''}
                    ${finalPrice.toLocaleString()} ₽
                </div>
            </div>
        </div>
    `;
}