### Todo List

- [x] 商店列表显示代表食物：直接点击食物的跳转逻辑？
- [x] 首页去掉小按钮
- [x] 购物车和食物详情页的层级关系？
- [x] 食物详情页增加“加入购物车”按钮
- [x] 去除商店评论页
- [ ] 食物详情页完善
- [ ] “震撼美味”标签
<!-- - [ ] 支付系统、订单系统 -->
- [x] FoodList.vue currentCategory 问题
<!-- - [ ] 小球动画 -->
<!-- - [ ] “我的”页 -->
- [x] 购物车页：商店-食物
- [ ] 移动端动画问题
<!-- - [ ] 搜索 -->


### 项目描述

基于 uni-app 的外卖 APP 用户端，部署到 Android 手机。不做前后端分离，不联网，所有数据记录在本地。

### 项目结构

```
src/
├── pages/                  # 页面目录（按功能模块划分）
│   ├── home/               # 首页相关
│   │   ├── HomePage.vue    # 首页
│   │   └── ShopListPage.vue # 商家列表页
│   ├── shop/               # 商家相关
│   │   └── ShopDetailPage.vue # 商家详情页
│   ├── cart/               # 购物车与订单
│   │   ├── CartPage.vue    # 购物车页
│   │   ├── OrderConfirmPage.vue # 确认订单页
│   │   ├── OrderListPage.vue # 订单列表页
│   │   └── OrderDetailPage.vue # 订单详情页
│   └── profile/            # 个人中心
│       ├── ProfilePage.vue # 个人中心页
│       └── AddressEditPage.vue # 地址编辑页
├── components/             # 公共组件
│   ├── bottom-cart/        # 底部购物车相关
│   │   ├── BottomCart.vue  # 底部购物车
│   │   └── BottomCartList.vue # 底部购物车内部列表
│   └── FoodCountController.vue # 商品加减按钮组件
│   ├── ShopHeader.vue      # 商家Header组件
│   ├── Tab.vue             # 滑动切换组件
│   ├── FoodList.vue        # 菜品列表组件
│   ├── CommentList.vue     # 评论列表组件
│   ├── ShopCard.vue        # 商家卡片组件
│   ├── FoodCard.vue        # 菜品卡片组件
│   ├── CartItem.vue        # 购物车商品项
│   └── OrderItem.vue       # 订单项组件
├── static/                 # 静态资源（图片、JSON数据）
│   ├── images/             # 图片资源
│   │   ├── logo.png        # 应用Logo
│   │   └── kfc.jpg         # 商家图片
│   └── data/               # 模拟数据（JSON）
│       ├── shops.js        # 商家数据
│       └── foods.js        # 菜品数据
├── store/                  # Vuex状态管理（模拟数据持久化）
│   ├── index.js            # Vuex主文件
│   ├── mutation-types.js   # mutation类型
│   ├── modules/            # 模块划分
│   │   ├── user.js         # 用户信息
│   │   ├── cart.js         # 购物车数据
│   │   └── order.js        # 订单数据
├── App.vue                 # 应用根组件
└── main.js                 # 应用入口文件
```

### 代码

#### static

##### data

shops.js

```
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
				{"foodId": 101},
				{"foodId": 102}
			]
		},
		{
			"category": "其他",
			"items": [
				{"foodId": 103}
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
```

foods.js

```
const FOODS = [
  {
    "id": 101,
    "name": "香辣鸡腿堡",
    "image": "/static/images/food-burger.jpg",
    "price": 22.00,
    "description": "经典香辣鸡腿堡，外酥里嫩，辣味十足"
  },
  {
    "id": 102,
    "name": "吮指原味鸡",
    "image": "/static/images/food-chicken.jpg",
    "price": 12.50,
    "description": "酥脆外皮，鲜嫩多汁，一口满足"
  },
  {
    "id": 103,
    "name": "薯条",
    "image": "/static/images/food-fries.jpg",
    "price": 8.00,
    "description": "黄金酥脆，搭配番茄酱更美味"
  },
  {
    "id": 201,
    "name": "巨无霸汉堡",
    "image": "/static/images/food-burger.jpg",
    "price": 25.00,
    "description": "双层牛肉饼，搭配新鲜蔬菜，分量十足"
  },
  {
    "id": 202,
    "name": "麦辣鸡翅",
    "image": "/static/images/food-wings.jpg",
    "price": 15.00,
    "description": "香辣可口，外酥里嫩，回味无穷"
  },
  {
    "id": 203,
    "name": "麦乐鸡",
    "image": "/static/images/food-chicken.jpg",
    "price": 18.00,
    "description": "精选鸡肉，搭配特制酱料"
  },
  {
    "id": 301,
    "name": "超级至尊披萨",
    "image": "/static/images/food-pizza.jpg",
    "price": 68.00,
    "description": "丰富的配料，芝士浓郁，口感丰富"
  },
  {
    "id": 302,
    "name": "意式肉酱面",
    "image": "/static/images/food-pasta.jpg",
    "price": 32.00,
    "description": "经典意式肉酱，搭配劲道面条"
  },
  {
    "id": 303,
    "name": "提拉米苏",
    "image": "/static/images/food-dessert.jpg",
    "price": 28.00,
    "description": "意大利经典甜品，咖啡香与马斯卡彭奶酪的完美结合"
  }
];
export default FOODS;
```
