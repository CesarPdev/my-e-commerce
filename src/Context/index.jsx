import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext()

export const initializeLocalStorage = () => {
    const accountInLocalStorage = localStorage.getItem('account');
    const signOutInLocalStorage = localStorage.getItem('sign-out');
    let parsedAccount;
    let parsedSignOut;

    if (!accountInLocalStorage) {
        localStorage.setItem('account', JSON.stringify({}));
        parsedAccount = {};
    } else {
        parsedAccount = JSON.parse(accountInLocalStorage);
    }

    if (!signOutInLocalStorage) {
        localStorage.setItem('sign-out', JSON.stringify(false));
        parsedSignOut = false;
    } else {
        parsedSignOut = JSON.parse(signOutInLocalStorage);
    }
};

export const ShoppingCartProvider = ({children}) => {
    
    // My Account
    const [account, setAccount] = useState({});

    // Sign Out
    const [signOut, setSignOut] = useState(false);
    
    // Shopping Cart · Add products to cart
    const [cartProducts, setCartProducts] = useState([]);
    
    // Product Detail Open/Close
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const openDetail = () => setIsDetailOpen(true);
    const closeDetail = () => setIsDetailOpen(false);
    
    // Checkout Side Menu Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);
    
    //Product Detail · Show Product
    const [productDetail, setProductDetail] = useState({});

    // Shopping Cart · Order
    const [order, setOrder] = useState([]);

    // Get Items
    const [items, setItems] = useState(null);
    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/products")
        .then(res => res.json())
        .then(data => setItems(data))
    }, [])

    // Get Searched Items
    const [searchByTitle, setSearchByTitle] = useState(null);

    // Get Items by Category
    const [searchByCategory, setSearchByCategory] = useState(null);

    // Get Filtered Items by Search
    const [filteredItems, setFilteredItems] = useState([]);
    
    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    };

    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    };

    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
            return filteredItemsByTitle(items, searchByTitle)
        }
        if (searchType === 'BY_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory)
        }
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        } if (searchType === null) {
            return items
        }
    }

    useEffect(() => {
        if (searchByTitle && searchByCategory) {
            setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        }if (searchByTitle && !searchByCategory) {
            setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        }
        if (!searchByTitle && searchByCategory) {
            setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        }
        if (!searchByTitle && !searchByCategory) {
            setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
        }
    }, [items, searchByTitle, searchByCategory]);

    return (
        <ShoppingCartContext.Provider value={{
            cartProducts,
            setCartProducts,
            openDetail,
            closeDetail,
            isDetailOpen,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            productDetail,
            setProductDetail,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            setFilteredItems,
            searchByCategory,
            setSearchByCategory,
            account,
            setAccount,
            signOut,
            setSignOut
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}