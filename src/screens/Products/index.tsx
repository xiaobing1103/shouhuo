import React, { useState, useMemo, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  useWindowDimensions 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/MainNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../../store/slices/authSlice';
import { selectCategory, setCategories, setProducts, setLoading, setError } from '../../store/slices/productSlice';
import { addToCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { ProductService } from '../../services/ProductService';
import type { RootState } from '../../store';
import type { Product } from '../../types/models.types';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Products'>;

export const ProductsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  
  const isMobile = width < 768; // 增加判断阈值，更适应手机
  
  const { categories, products, selectedCategoryId, loading } = useSelector((state: RootState) => state.product);
  const { items: cartItems, total } = useSelector((state: RootState) => state.cart);
  const { warehouse_id } = useSelector((state: RootState) => state.auth);
  
  const [viewMode, setViewMode] = useState<'name' | 'price'>('name');

  // 初始化数据
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const productService = new ProductService();
        const allProducts = await productService.fetchProducts(warehouse_id || undefined);
        
        // 排序商品
        const sortedProducts = productService.sortProducts(allProducts);
        
        // 提取分类
        const categoriesMap = new Map();
        sortedProducts.forEach(p => {
          // 排除名称为“全部商品”的原始数据，因为 UI 顶部已经自带了“全部商品”选项
          if (p.categoryName !== '全部商品' && !categoriesMap.has(p.categoryId)) {
            categoriesMap.set(p.categoryId, {
              id: p.categoryId,
              name: p.categoryName,
              sort: p.categorySort
            });
          }
        });
        
        const categories = Array.from(categoriesMap.values()).sort((a, b) => a.sort - b.sort);
        
        dispatch(setCategories(categories));
        dispatch(setProducts(sortedProducts));
      } catch (err) {
        dispatch(setError('加载商品失败'));
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    
    fetchData();
  }, [dispatch]);

  // 过滤当前分类的商品
  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId) return products;
    return products.filter(p => p.categoryId === selectedCategoryId);
  }, [products, selectedCategoryId]);

  const handleCategorySelect = (categoryId: string) => {
    dispatch(selectCategory(categoryId));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePayment = () => {
    if (cartItems.length === 0) {
      return;
    }
    navigation.navigate('Payment');
  };

  return (
    <View style={[
      styles.container,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }
    ]}>
      {/* 头部 - 门店名称 */}
      <View style={[styles.header, isMobile && { paddingVertical: 12, paddingHorizontal: 16 }]}>
        <View style={styles.headerLeft}>
          {/* 预留左侧区域 */}
        </View>
        
        <Text style={[styles.storeName, isMobile && { fontSize: 16 }]}>YHTT门店1 · 北京总店正</Text>
        
        <View style={styles.headerRight}>
          {/* 预留右侧区域 */}
        </View>
      </View>

      {/* 主体区域 */}
      <View style={styles.mainContent}>
        {/* 左侧类目导航 */}
        <View style={[styles.categoryPanel, isMobile && { width: 90 }]}>
          <ScrollView 
            style={styles.categoryScroll}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={[
                styles.categoryItem,
                !selectedCategoryId && styles.categoryItemActive,
                isMobile && { paddingVertical: 12, paddingHorizontal: 8 }
              ]}
              onPress={() => dispatch(selectCategory(null))}
            >
              <Text style={[
                styles.categoryText,
                !selectedCategoryId && styles.categoryTextActive,
                isMobile && { fontSize: 13 }
              ]}>全部商品</Text>
            </TouchableOpacity>
            
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategoryId === category.id && styles.categoryItemActive,
                  isMobile && { paddingVertical: 12, paddingHorizontal: 8 }
                ]}
                onPress={() => handleCategorySelect(category.id)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategoryId === category.id && styles.categoryTextActive,
                  isMobile && { fontSize: 13 }
                ]}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 右侧内容区 */}
        <View style={styles.contentPanel}>
          {/* 商品展示区标题栏 */}
          <View style={[styles.productHeader, isMobile && { paddingHorizontal: 8, paddingVertical: 8 }]}>
            <Text style={[styles.productHeaderTitle, isMobile && { fontSize: 14 }]}>精选订单</Text>
            
            <View style={styles.viewModeToggle}>
              <TouchableOpacity
                style={[
                  styles.viewModeButton,
                  viewMode === 'name' && styles.viewModeButtonActive,
                  isMobile && { paddingHorizontal: 6, paddingVertical: 4 }
                ]}
                onPress={() => setViewMode('name')}
              >
                <Text style={[
                  styles.viewModeText,
                  viewMode === 'name' && styles.viewModeTextActive,
                  isMobile && { fontSize: 12 }
                ]}>商品名称</Text>
              </TouchableOpacity>
              
              <Text style={styles.viewModeSeparator}>:</Text>
              
              <TouchableOpacity
                style={[
                  styles.viewModeButton,
                  viewMode === 'price' && styles.viewModeButtonActive,
                  isMobile && { paddingHorizontal: 6, paddingVertical: 4 }
                ]}
                onPress={() => setViewMode('price')}
              >
                <Text style={[
                  styles.viewModeText,
                  viewMode === 'price' && styles.viewModeTextActive,
                  isMobile && { fontSize: 12 }
                ]}>价格</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 商品列表 */}
          <ScrollView 
            style={styles.productList}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.productGrid}>
              {filteredProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={[styles.productCard, isMobile && { width: '47%', marginHorizontal: '1.5%' }]}
                  onPress={() => handleAddToCart(product)}
                  disabled={product.isSoldOut}
                >
                  <View style={styles.productImageContainer}>
                    {product.imageUrl ? (
                      <Image 
                        source={{ uri: product.imageUrl }} 
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.productImagePlaceholder}>
                        <Text style={styles.productImagePlaceholderText}>暂无图片</Text>
                      </View>
                    )}
                    
                    {product.isSoldOut && (
                      <View style={styles.soldOutOverlay}>
                        <Text style={[styles.soldOutText, isMobile && { fontSize: 14 }]}>已售罄</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={[styles.productInfo, isMobile && { padding: 6 }]}>
                    <Text 
                      style={[styles.productName, isMobile && { fontSize: 12, height: 32 }]} 
                      numberOfLines={2}
                    >{product.name}</Text>
                    <Text style={[styles.productPrice, isMobile && { fontSize: 14 }]}>¥{product.price.toFixed(2)}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* 购物车区域 */}
          <View style={styles.cartPanel}>
            <ScrollView 
              style={styles.cartList}
              showsVerticalScrollIndicator={false}
            >
              {cartItems.length === 0 ? (
                <View style={styles.emptyCart}>
                  <Text style={styles.emptyCartText}>购物车为空</Text>
                </View>
              ) : (
                cartItems.map((item) => (
                  <View key={item.product.id} style={styles.cartItem}>
                    <View style={styles.cartItemLeft}>
                      <Text style={styles.cartItemName} numberOfLines={1}>
                        {item.product.name}
                      </Text>
                      <Text style={styles.cartItemPrice}>
                        ¥{item.product.price.toFixed(2)}
                      </Text>
                    </View>
                    
                    <View style={styles.cartItemRight}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
            
            {/* 合计 */}
            <View style={[styles.cartTotal, isMobile && { paddingVertical: 8, paddingHorizontal: 12 }]}>
              <Text style={[styles.cartTotalLabel, isMobile && { fontSize: 14 }]}>合计：</Text>
              <Text style={[styles.cartTotalAmount, isMobile && { fontSize: 18 }]}>¥{total.toFixed(2)}</Text>
            </View>
          </View>

          {/* 底部按钮 */}
          <View style={[styles.bottomButtons, isMobile && { paddingVertical: 10, paddingHorizontal: 12 }]}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, isMobile && { height: 44 }]}
              onPress={handleClearCart}
              disabled={cartItems.length === 0}
            >
              <Text style={[styles.cancelButtonText, isMobile && { fontSize: 14 }]}>取消订单</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.button, 
                styles.payButton,
                cartItems.length === 0 && styles.payButtonDisabled,
                isMobile && { height: 44 }
              ]}
              onPress={handlePayment}
              disabled={cartItems.length === 0}
            >
              <Text style={[styles.payButtonText, isMobile && { fontSize: 14 }]}>支付订单</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // 头部样式
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EF5350',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerLeft: {
    width: 80,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerRight: {
    width: 80,
  },
  // 主体区域
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  // 左侧类目面板
  categoryPanel: {
    width: 120,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  categoryScroll: {
    flex: 1,
  },
  categoryItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryItemActive: {
    backgroundColor: '#fff3f3',
    borderLeftWidth: 3,
    borderLeftColor: '#EF5350',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  categoryTextActive: {
    color: '#EF5350',
    fontWeight: 'bold',
  },
  // 右侧内容面板
  contentPanel: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // 商品区标题栏
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  productHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  viewModeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewModeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  viewModeButtonActive: {
    backgroundColor: '#EF5350',
  },
  viewModeText: {
    fontSize: 14,
    color: '#666',
  },
  viewModeTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  viewModeSeparator: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 4,
  },
  // 商品列表
  productList: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  productCard: {
    width: '23%',
    marginHorizontal: '1%',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f9f9f9',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  productImagePlaceholderText: {
    fontSize: 12,
    color: '#999',
  },
  soldOutOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soldOutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    height: 36,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF5350',
  },
  // 购物车面板
  cartPanel: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    maxHeight: 300,
  },
  cartList: {
    maxHeight: 200,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emptyCart: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 14,
    color: '#999',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cartItemLeft: {
    flex: 1,
    marginRight: 12,
  },
  cartItemName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  cartItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 12,
    minWidth: 30,
    textAlign: 'center',
  },
  cartTotal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cartTotalLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  cartTotalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF5350',
  },
  // 底部按钮
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EF5350',
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF5350',
  },
  payButton: {
    backgroundColor: '#EF5350',
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
