import { IconFileExport, IconLogout, IconSettings } from '@tabler/icons-react';
import { useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';

import HomeContext from '@/pages/api/home/home.context';

import { SettingDialog } from '@/components/Settings/SettingDialog';

import { Import } from '../../Settings/Import';
import { Key } from '../../Settings/Key';
import { SidebarButton } from '../../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar.context';
import { ClearConversations } from './ClearConversations';
import { PluginKeys } from './PluginKeys';
import LogoutButton from '@/components/Auth/LogoutButton';
import UserInfo from '@/components/Auth/UserInfo';
import { useMsal } from '@azure/msal-react';
import { getProduct } from '@/utils/app/product';

export const ChatbarSettings = () => {
  const { t } = useTranslation('sidebar');
  const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);

  const {
    state: {
      apiKey,
      lightMode,
      serverSideApiKeyIsSet,
      serverSidePluginKeysSet,
      conversations,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const {
    handleClearConversations,
    handleImportConversations,
    handleExportData,
    handleApiKeyChange,
  } = useContext(ChatbarContext);

  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({
        postLogoutRedirectUri: "/", 
      });
  };

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {conversations.length > 0 ? (
        <ClearConversations onClearConversations={handleClearConversations} />
      ) : null}

      <Import onImport={handleImportConversations} />

      <SidebarButton
        text={t('Export data')}
        icon={<IconFileExport style={{ color: getProduct().keyColor }} size={18} />}
        onClick={() => handleExportData()}
      />

      <SidebarButton
        text={t('Settings')}
        icon={<IconSettings style={{ color: getProduct().keyColor }} size={18} />}
        onClick={() => setIsSettingDialog(true)}
      />

      <SidebarButton 
        
        text={t('Log out')}
        icon={<IconLogout  style={{ color: getProduct().keyColor }} size={18} />}
        onClick={() => handleLogout()}
      />  

      {!serverSideApiKeyIsSet ? (
        <Key apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
      ) : null}

      {!serverSidePluginKeysSet ? <PluginKeys /> : null}

      <SettingDialog
        open={isSettingDialogOpen}
        onClose={() => {
          setIsSettingDialog(false);
        }}
      />
      <UserInfo />
  

    </div>
  );
};
