import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/MainNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../../store/slices/authSlice';
import { selectCategory, setCategories, setProducts } from '../../store/slices/productSlice';
import { addToCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import type { RootState } from '../../store';
import type { Product } from '../../types/models.types';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Products'>;

export const ProductsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  
  const { categories, products, selectedCategoryId } = useSelector((state: RootState) => state.product);
  const { items: cartItems, total } = useSelector((state: RootState) => state.cart);
  
  const [viewMode, setViewMode] = useState<'name' | 'price'>('name');

  // 初始化模拟数据
  useEffect(() => {
    // 模拟类目数据
    const mockCategories = [
      { id: '1', name: '饮料', sort: 1 },
      { id: '2', name: '零食', sort: 2 },
      { id: '3', name: '方便食品', sort: 3 },
      { id: '4', name: '乳制品', sort: 4 },
      { id: '5', name: '生鲜果蔬', sort: 5 },
    ];

    // 模拟商品数据
    const mockProducts: Product[] = [
      { 
        id: '101', 
        name: '可口可乐 500ml', 
        price: 3.5, 
        stock: 50, 
        categoryId: '1', 
        categoryName: '饮料',
        categorySort: 1,
        productSort: 1,
        isSoldOut: false 
      },
      { 
        id: '102', 
        name: '雪碧 500ml', 
        price: 3.5, 
        stock: 30, 
        categoryId: '1', 
        categoryName: '饮料',
        categorySort: 1,
        productSort: 2,
        isSoldOut: false 
      },
      { 
        id: '103', 
        name: '元气森林 380ml', 
        price: 4.0, 
        stock: 0, 
        categoryId: '1', 
        categoryName: '饮料',
        categorySort: 1,
        productSort: 3,
        isSoldOut: true 
      },
      { 
        id: '104', 
        name: '农夫山泉 550ml', 
        price: 2.0, 
        stock: 100, 
        categoryId: '1', 
        categoryName: '饮料',
        categorySort: 1,
        productSort: 4,
        isSoldOut: false 
      },
      { 
        id: '201', 
        name: '乐事薄荷糖', 
        price: 8.5, 
        stock: 25, 
        categoryId: '2', 
        categoryName: '零食',
        categorySort: 2,
        productSort: 1,
        isSoldOut: false 
      },
      { 
        id: '202', 
        name: '德芬巴克巧克力', 
        price: 15.0, 
        stock: 15, 
        categoryId: '2', 
        categoryName: '零食',
        categorySort: 2,
        productSort: 2,
        isSoldOut: false 
      },
      { 
        id: '203', 
        name: '奥利奥饼干', 
        price: 6.5, 
        stock: 40, 
        categoryId: '2', 
        categoryName: '零食',
        categorySort: 2,
        productSort: 3,
        isSoldOut: false 
      },
      { 
        id: '204', 
        name: '三只松鼠', 
        price: 3.5, 
        stock: 60, 
        categoryId: '2', 
        categoryName: '零食',
        categorySort: 2,
        productSort: 4,
        isSoldOut: false 
      },
      { 
        id: '301', 
        name: '康师傅红烧牛肉面', 
        price: 5.5, 
        stock: 20, 
        categoryId: '3', 
        categoryName: '方便食品',
        categorySort: 3,
        productSort: 1,
        isSoldOut: false 
      },
      { 
        id: '302', 
        name: '统一老坛酸菜牛肉面', 
        price: 6.0, 
        stock: 18, 
        categoryId: '3', 
        categoryName: '方便食品',
        categorySort: 3,
        productSort: 2,
        isSoldOut: false 
      },
      { 
        id: '401', 
        name: '伊利纯牛奶 250ml', 
        price: 4.5, 
        stock: 35, 
        categoryId: '4', 
        categoryName: '乳制品',
        categorySort: 4,
        productSort: 1,
        isSoldOut: false 
      },
      { 
        id: '402', 
        name: '蒙牛纯牛奶 250ml', 
        price: 4.5, 
        stock: 30, 
        categoryId: '4', 
        categoryName: '乳制品',
        categorySort: 4,
        productSort: 2,
        isSoldOut: false 
      },
    ];

    dispatch(setCategories(mockCategories));
    dispatch(setProducts(mockProducts));
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
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* 预留左侧区域 */}
        </View>
        
        <Text style={styles.storeName}>YHTT门店1 · 北京总店正</Text>
        
        <View style={styles.headerRight}>
          {/* 预留右侧区域 */}
        </View>
      </View>

      {/* 主体区域 */}
      <View style={styles.mainContent}>
        {/* 左侧类目导航 */}
        <View style={styles.categoryPanel}>
          <ScrollView 
            style={styles.categoryScroll}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={[
                styles.categoryItem,
                !selectedCategoryId && styles.categoryItemActive,
              ]}
              onPress={() => dispatch(selectCategory(null))}
            >
              <Text style={[
                styles.categoryText,
                !selectedCategoryId && styles.categoryTextActive,
              ]}>全部商品</Text>
            </TouchableOpacity>
            
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategoryId === category.id && styles.categoryItemActive,
                ]}
                onPress={() => handleCategorySelect(category.id)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategoryId === category.id && styles.categoryTextActive,
                ]}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 右侧内容区 */}
        <View style={styles.contentPanel}>
          {/* 商品展示区标题栏 */}
          <View style={styles.productHeader}>
            <Text style={styles.productHeaderTitle}>精选订单</Text>
            
            <View style={styles.viewModeToggle}>
              <TouchableOpacity
                style={[
                  styles.viewModeButton,
                  viewMode === 'name' && styles.viewModeButtonActive,
                ]}
                onPress={() => setViewMode('name')}
              >
                <Text style={[
                  styles.viewModeText,
                  viewMode === 'name' && styles.viewModeTextActive,
                ]}>商品名称</Text>
              </TouchableOpacity>
              
              <Text style={styles.viewModeSeparator}>:</Text>
              
              <TouchableOpacity
                style={[
                  styles.viewModeButton,
                  viewMode === 'price' && styles.viewModeButtonActive,
                ]}
                onPress={() => setViewMode('price')}
              >
                <Text style={[
                  styles.viewModeText,
                  viewMode === 'price' && styles.viewModeTextActive,
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
                  style={styles.productCard}
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
                        <Text style={styles.soldOutText}>已售罄</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.productInfo}>
                    <Text 
                      style={styles.productName} 
                      numberOfLines={2}
                    >{product.name}</Text>
                    <Text style={styles.productPrice}>¥{product.price.toFixed(2)}</Text>
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
            <View style={styles.cartTotal}>
              <Text style={styles.cartTotalLabel}>合计：</Text>
              <Text style={styles.cartTotalAmount}>¥{total.toFixed(2)}</Text>
            </View>
          </View>

          {/* 底部按钮 */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClearCart}
              disabled={cartItems.length === 0}
            >
              <Text style={styles.cancelButtonText}>取消订单</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.button, 
                styles.payButton,
                cartItems.length === 0 && styles.payButtonDisabled,
              ]}
              onPress={handlePayment}
              disabled={cartItems.length === 0}
            >
              <Text style={styles.payButtonText}>支付订单</Text>
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
