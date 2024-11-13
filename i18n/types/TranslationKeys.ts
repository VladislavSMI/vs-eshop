export type TranslationKeys = {
  components: {
    header: {
      cart: string;
      login: string;
      logout: string;
      register: string;
      search: string;
      welcome: string;
    };
    product: {
      addToCart: string;
      price: string;
    };
  };
  pages: {
    home: {
      title: string;
      description: string;
    };
    product: {
      title: string;
      description: string;
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
  };
  errors: {
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
  navigation: {
    home: string;
    cart: string;
    profile: string;
    allProducts: string;
    searchPlaceholder: string;
  };
  footer: {
    aboutUs: string;
    privacyPolicy: string;
    shippingReturnPolicy: string;
    termsConditions: string;
    allRightsReserved: string;
  };
};
