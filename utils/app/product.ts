import { Product } from '@/types/product';

export const getProduct = (): Product => {
  let prod: Product = {
    name: 'Globant GPT',
    image: 'https://www.globant.com/themes/custom/globant_corp_theme/images/2019/globant-logo-dark.svg',
    description: 'A private GPT for Globant',
    welcomeMessage: 'Welcome to Globant GPT',
    importantNote: 'Important: The information you ask is not used by third party for further training AI models',
    accountUsageLink: 'https://console.beta.saia.ai',
    showSystemPrompt: false,
    allowSelectTemperature: true,
    productUrl: "https://www.globant.com",
    theme: 'light',
    keyColor: '#d9e021'
  };
  
  return prod;
};




