const SHOPS = [
  {
    "id": 1,
    "name": "肯德基",
    "image": "/static/images/kfc.png",
    "rating": 4.8,
    "deliveryTime": 30,
	"deliveryFee": 5,
    "tags": ["24小时营业", "免配送费", "品牌连锁"],
    "menu": [
		{
			"category": "主食",
			"items": [
				{"foodId": 100},
				{"foodId": 101},
				{"foodId": 102}
			]
		},
		{
			"category": "分类1",
			"items": [
				{"foodId": 103},
				{"foodId": 104},
				{"foodId": 105},
				{"foodId": 106},
				{"foodId": 107}
			]
		},
		{
			"category": "分类2",
			"items": [
				{"foodId": 108},
				{"foodId": 109},
				{"foodId": 110}
			]
		}
    ]
  },
  {
    "id": 2,
    "name": "麦当劳",
    "image": "/static/images/mcd.png",
    "rating": 4.7,
    "deliveryTime": 25,
	"deliveryFee": 10,
    "tags": ["24小时营业", "免配送费", "品牌连锁"],
    "menu": [
      {
      	"category": "主食",
      	"items": [
      		{"foodId": 201},
      		{"foodId": 202}
      	]
      },
      {
      	"category": "其他",
      	"items": [
      		{"foodId": 203}
      	]
      }
    ]
  },
  {
    "id": 3,
    "name": "必胜客",
    "image": "/static/images/pizzahut.png",
    "rating": 4.5,
    "deliveryTime": 35,
	"deliveryFee": 0,
    "tags": ["品牌连锁", "套餐优惠"],
    "menu": [
      {
      	"category": "主食",
      	"items": [
      		{"foodId": 301},
      		{"foodId": 302}
      	]
      },
      {
      	"category": "其他",
      	"items": [
      		{"foodId": 303}
      	]
      }
    ]
  }
];
export default SHOPS;