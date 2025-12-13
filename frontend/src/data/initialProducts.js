export const initialProducts = [
    {
        id: 1,
        name: 'Arogya Sanjivini - Diabet Fit',
        category: 'Health',
        subCategory: 'Diabetes',
        description: '90 tablets - Natural herbal supplement for diabetes management and immunity support.',
        images: [
            '/products/diabet-fit-3.jpg',
            '/products/diabet-fit-2.jpg',
            '/products/diabet-fit-1.jpg'
        ],
        image: '/products/diabet-fit-3.jpg',
        benefits: ['Diabetic Control', 'Immunity Booster', 'Good HBA1C Results', 'Herbal Supplement'],
        mrp: 645,
        sizes: [
            { size: '90 Tablets', price: 499 }
        ]
    },
    {
        id: 2,
        name: 'Arogya Vardhini',
        category: 'Health',
        subCategory: 'Joint Pain',
        description: '90 tablets - Natural herbal supplement for joint pain relief, arthritis, and obesity management.',
        images: [
            '/products/vardhini-3.jpg',
            '/products/vardhini-2.jpg',
            '/products/vardhini-1.jpg'
        ],
        image: '/products/vardhini-3.jpg',
        benefits: ['Reducing Joint Pains', 'Arthritis Relief', 'Obesity Management', 'Herbal Supplement'],
        mrp: 645,
        sizes: [
            { size: '90 Tablets', price: 499 }
        ]
    },
    {
        id: 3,
        name: 'Zero Piles',
        category: 'Health',
        subCategory: 'Digestive',
        description: '30 tablets - High quality natural herbal supplement for piles, constipation, and digestive health.',
        images: [
            '/products/zero-piles-3.jpg',
            '/products/zero-piles-2.jpg',
            '/products/zero-piles-1.jpg'
        ],
        image: '/products/zero-piles-3.jpg',
        benefits: ['Constipation Relief', 'Stops Bleeding', 'Reduce Pain', 'Remove Lumps'],
        mrp: 349,
        sizes: [
            { size: '30 Tablets', price: 299 }
        ]
    },
    {
        id: 4,
        name: '4 Way Action',
        category: 'Health',
        subCategory: 'Digestive',
        description: '200ml - A Herbal Liver, Enzyme, Antacid & Alkalizer Syrup. Get relief from Gastrouble in just 10 min.',
        images: [
            '/products/4-way-action-3.jpg',
            '/products/4-way-action-2.jpg',
            '/products/4-way-action-details.png'
        ],
        image: '/products/4-way-action-3.jpg',
        benefits: ['Relief from Gastrouble in 10 min', 'Liver Support', 'Enzyme & Antacid', 'Alkalizer'],
        mrp: 160,
        sizes: [
            { size: '200ml Syrup', price: 150 }
        ]
    },
    {
        id: 5,
        name: 'PAIN CURE Oil',
        category: 'Pain Relief',
        subCategory: 'External',
        description: '60ml Roll On - Pain-Relief Oil for external use. Natural ingredients for effective pain management.',
        images: [
            '/products/pain-cure-3.jpg',
            '/products/pain-cure-ingredients.png',
            '/products/pain-cure-2.jpg'
        ],
        image: '/products/pain-cure-3.jpg',
        benefits: ['Reducing Joint Pain', 'Arthritis Relief', 'Muscle Pain Relief', 'Roll On Application'],
        mrp: 110,
        sizes: [
            { size: '60ml Roll On', price: 100 }
        ]
    },
    {
        id: 6,
        name: 'Arogya Vardhini/Pain cure oil',
        category: 'Combos',
        subCategory: 'Pain Relief',
        description: 'COMBO PACK - Arogya Vardhini (90 tablets) + PAIN CURE Oil (60ml Roll On). Complete solution for joint pain, arthritis, and muscle pain relief.',
        images: [
            '/products/vardhini-3.jpg',
            '/products/pain-cure-3.jpg'
        ],
        image: '/products/vardhini-3.jpg',
        benefits: ['Complete Joint Pain Solution', 'Internal + External Relief', 'Arthritis Management', 'Combo Savings - Save ₹50!'],
        mrp: 599,
        sizes: [
            { size: 'Combo Pack (2 items)', price: 549 }
        ],
        isCombo: true
    }
]
