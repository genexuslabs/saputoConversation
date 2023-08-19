import { Product } from '@/types/product';

export const getProduct = (): Product => {
  let prod: Product = {
    name: 'Saputo Conversation',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Saputo_Logo.svg/2560px-Saputo_Logo.svg.png',
    description: 'A private conversational hub for Saputo Inc.',
    welcomeMessage: 'Welcome to Saputo Inc. Conversation',
    importantNote: 'Important: The information you ask is not used by third party for further training AI models',
    accountUsageLink: 'https://console.beta.saia.ai',
    showSystemPrompt: false,
    allowSelectTemperature: true,
    productUrl: "https://www.saputo.com/",
    theme: 'light',
    keyColor: '#E31C23'
  };
  
  return prod;
};




