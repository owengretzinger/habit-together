import Icon from "@/src/components/Icon";
import {
  SettingsChoice,
  SettingsContainer,
} from "@/src/components/SettingsComponents";
import { IconMoon, IconSun, IconTool } from "@tabler/icons-react-native";

export default function Widgetsettings() {
  return (
    <SettingsContainer>
      <SettingsChoice
        groupTitle="Small Widget Theme"
        settingKey="smallWidgetTheme"
        settings={[
          {
            icon: <Icon icon={IconTool} />,
            title: "System",
            onPress: () => {},
          },
          {
            icon: <Icon icon={IconSun} />,
            title: "Light",
            onPress: () => {},
          },
          {
            icon: <Icon icon={IconMoon} />,
            title: "Dark",
            onPress: () => {},
          },
        ]}
        defaultSetting={0}
      />
      <SettingsChoice
        groupTitle="Medium Widget Theme"
        settingKey="mediumWidgetTheme"
        settings={[
          {
            icon: <Icon icon={IconTool} />,
            title: "System",
            onPress: () => {},
          },
          {
            icon: <Icon icon={IconSun} />,
            title: "Light",
            onPress: () => {},
          },
          {
            icon: <Icon icon={IconMoon} />,
            title: "Dark",
            onPress: () => {},
          },
        ]}
        defaultSetting={0}
      />
    </SettingsContainer>
  );
}
