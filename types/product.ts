export interface Product {
    keyColor?: string | undefined;
    theme: "light" | "dark";
    productUrl: string ;
    allowSelectTemperature: boolean;
    accountUsageLink?: string ;
    importantNote: string;
    description: string;
    welcomeMessage: string;
    name: string;
    image: string;
    showSystemPrompt: boolean;
  }

  