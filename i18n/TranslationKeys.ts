export type ResponseKeys = {
  responseError: {
    validation: {
      general: {
        required: string;
        invalid: string;
      };
      productId: {
        required: string;
        invalid: string;
      };
      sizeId: {
        required: string;
        invalid: string;
      };
      quantity: {
        required: string;
        invalid: string;
      };
    };
    unexpected: string;
    notFound: string;
    outOfStock: string;
    orderFailed: string;
    checkoutFailed: string;
  };
  responseSuccess: {
    updateCart: string;
    deleteCartItem: string;
    orderSuccess: string;
    checkoutSuccess: string;
  };
};

export type Components = {
  header: {
    cart: string;
    login: string;
    logout: string;
    register: string;
    search: string;
    welcome: string;
  };
  cart: {
    addToCart: string;
    goToCart: string;
    backToCart: string;
    myCart: string;
    remove: string;
    price: string;
    size: string;
    quantity: string;
    total: string;
    totalQuantity: string;
    totalPrice: string;
    emptyCart: string;
    adding: string;
    emptyCartMessage: string;
    checkoutNow: string;
    outOfStock: string;
    redirecting: string;
    proceedToPayment: string;
    shippingAddress: string;
  };
  signInForm: {
    description: string;
    email: string;
    password: string;
    invalidCredentials: string;
    somethingWentWrong: string;
    signIn: string;
    signingIn: string;
  };
};

export type Pages = {
  home: {
    title: string;
    description: string;
  };
  product: {
    title: string;
    description: string;
    noProductFound: string;
  };
  aboutUs: {
    title: string;
    text: string;
  };
  privacyPolicy: {
    title: string;
    text: string;
  };
  shippingReturnPolicy: {
    title: string;
    text: string;
  };
  termsConditions: {
    title: string;
    text: string;
  };
  checkout: {
    title: string;
    description: string;
    success: {
      title: string;
      description: string;
      continueShopping: string;
    };
    cancel: {
      title: string;
      description: string;
      tryAgain: string;
      returnHome: string;
    };
    unexpectedError: string;
    contactSupport: string;
  };
  dashboard: {
    title: string;
    description: string;
  };
  signOut: {
    title: string;
    description: string;
  };
};

export type Sections = {
  featuredProducts: {
    title: string;
    description: string;
  };
  newArrivals: {
    title: string;
    description: string;
  };
  productReviews: {
    title: string;
    description: string;
  };
};

export type GeneralErrors = {
  '404': {
    title: string;
    message: string;
    goBack: string;
  };
  generic: {
    title: string;
    description: string;
    retry: string;
  };
};

export type Navigation = {
  home: string;
  cart: string;
  profile: string;
  allProducts: string;
  searchPlaceholder: string;
};

export type Footer = {
  aboutUs: string;
  privacyPolicy: string;
  shippingReturnPolicy: string;
  termsConditions: string;
  allRightsReserved: string;
};

export type SearchLabels = {
  categoryId: string;
  query: string;
};

export type TranslationKeys = {
  components: Components;
  pages: Pages;
  sections: Sections;
  generalErrors: GeneralErrors;
  navigation: Navigation;
  footer: Footer;
  searchLabels: SearchLabels;
} & ResponseKeys;

// Recursive type to retrieve nested keys as dot-separated strings
type Prev = [never, 0, 1, 2, 3, 4, 5];

type NestedKeyOf<T, Depth extends number = 5> = Depth extends 0
  ? never
  : {
      [K in keyof T & string]: T[K] extends object
        ? `${K}.${NestedKeyOf<T[K], Prev[Depth]>}`
        : K;
    }[keyof T & string];

export type TranslationKey = NestedKeyOf<TranslationKeys>;

export type TranslateFunction = (
  key: TranslationKey,
  params?: Record<string, string | number>,
) => string;
