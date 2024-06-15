import { createNewHabitAtom, editHabitInfoAtom } from "@/src/atoms/atoms";
import Divider from "@/src/components/Divider";
import RoundedButton from "@/src/components/RoundedButton";
import { Text, View } from "@/src/components/Themed";
import DefaultColors from "@/src/constants/DefaultColors";
import colors from "@/src/constants/colors";
import { resetNavigationStack } from "@/src/lib/resetNavigationStack";
import { Habit, HabitGoalPeriod } from "@/src/lib/types";
import {
  IconArrowForwardUp,
  IconCheck,
  IconSelector,
  IconX,
} from "@tabler/icons-react-native";
import { router } from "expo-router";
import { atom, useAtom } from "jotai";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { IconButton } from "../app/habits/icon-button";
import { iconStrNameToTablerIcon } from "../app/habits/icons";
import Icon from "./Icon";

export const tempIconAtom = atom<string>("default");

export default function CreateOrEditHabit({
  initialHabitInfoValues,
}: {
  initialHabitInfoValues: Habit;
}) {
  const { colorScheme } = useColorScheme();
  const borderColor = DefaultColors[colorScheme].tint;

  const [icon, setIcon] = useAtom(tempIconAtom);
  useEffect(() => {
    setIcon(initialHabitInfoValues.icon);
  }, [initialHabitInfoValues.icon]);

  const [habitName, setHabitName] = useState(initialHabitInfoValues.title);
  const [description, setDescription] = useState(
    initialHabitInfoValues.description,
  );
  const [color, setColor] = useState(initialHabitInfoValues.color);
  const [goalType, setGoalType] = useState(initialHabitInfoValues.goal.period);
  const [completion, setCompletion] = useState(
    initialHabitInfoValues.goal.completionsPerPeriod,
  );

  const needsTag = icon === "default";
  const needsName = habitName === "";
  const canCreateHabit = !needsTag && !needsName;

  const [, setHabitInfo] = useAtom(
    editHabitInfoAtom(initialHabitInfoValues.id),
  );
  const [, creatNewHabitInfo] = useAtom(createNewHabitAtom);

  // generate plural texts
  const pluralize = (
    count: number,
    singularText: string,
    pluralText: string,
  ) => {
    if (count === 1) {
      return `${count} ${singularText}`;
    } else {
      return `${count} ${pluralText}`;
    }
  };

  return (
    <View className="flex flex-1 flex-col gap-y-5 px-5 pt-11">
      {/* Header */}
      <View className="flex flex-row items-center justify-between">
        {
          <RoundedButton
            text="Cancel"
            icon={IconX}
            onPress={() => {
              router.back();
            }}
          />
        }
        <Text className="text-base font-semibold">
          {initialHabitInfoValues.id ? "Edit" : "New"} habit
        </Text>
        {
          <RoundedButton
            text={initialHabitInfoValues.id ? "Done" : "Next"}
            icon={initialHabitInfoValues.id ? IconCheck : IconArrowForwardUp}
            isDisabled={!canCreateHabit}
            onPress={() => {
              const habitInfo: Habit = {
                id: initialHabitInfoValues.id,
                title: habitName,
                description: description,
                color: color as keyof typeof colors.habitColors,
                icon: icon,
                goal: {
                  period: goalType as HabitGoalPeriod,
                  completionsPerPeriod: completion,
                },
              };
              {
                initialHabitInfoValues.id
                  ? setHabitInfo(habitInfo)
                  : creatNewHabitInfo(habitInfo);
              }
              resetNavigationStack("/");
            }}
          />
        }
      </View>

      {/* Icon & Name */}
      <View className="flex flex-col">
        <Text className="mb-1 text-base font-semibold">Icon & Name</Text>
        <View className="flex flex-row">
          <IconButton
            icon={iconStrNameToTablerIcon(icon)}
            onPress={() => {
              router.push("/habits/habiticons");
            }}
          />
          <TextInput
            className="ml-2 h-10 flex-1 rounded-lg border px-3"
            numberOfLines={1}
            style={{
              borderColor,
              color: DefaultColors[colorScheme].text,
              backgroundColor: colors.transparent,
            }}
            placeholder="Ex. Workout"
            placeholderTextColor={DefaultColors[colorScheme].placeholder}
            value={habitName}
            onChangeText={(text) => setHabitName(text)}
          ></TextInput>
        </View>
      </View>

      {/* Description */}
      <View className="flex flex-col">
        <Text className="mb-1 text-base font-semibold">
          Description (optional)
        </Text>
        <TextInput
          className="h-10 rounded-lg border px-3"
          style={{
            borderColor,
            color: DefaultColors[colorScheme].text,
          }}
          maxLength={50}
          value={description}
          onChangeText={(text) => setDescription(text)}
        ></TextInput>
      </View>

      {/* Colour */}
      <View className="flex flex-col">
        <Text className="mb-1 text-base font-semibold">Color</Text>
        <View className="flex flex-col">
          {[0, 1].map((i) => (
            <View key={i} className="flex max-w-full flex-row gap-x-2">
              {colorNames.slice(i * 9, 9 + i * 9).map((col, idx) => (
                <TouchableOpacity
                  className="flex aspect-square flex-1 items-center justify-center rounded-full"
                  key={idx}
                  style={{
                    backgroundColor:
                      col === "stone"
                        ? colors.stone[400]
                        : colors.habitColors[col]?.base,
                    marginBottom: i === 0 ? 8 : 0,
                  }}
                  onPress={() => {
                    setColor(col);
                  }}
                >
                  {col === color ? <Icon icon={IconCheck} /> : null}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Goal */}
      <View className="flex flex-col">
        <Text className="mb-1 text-base font-semibold">Goal</Text>
        <View className="rounded-lg border" style={{ borderColor }}>
          <View
            className="flex flex-row justify-between p-2"
            style={{ backgroundColor: colors.transparent }}
          >
            <Text className="text-base font-semibold">Goal type</Text>
            <Menu onSelect={(val) => setGoalType(val)}>
              <MenuTrigger>
                <View className="flex flex-row">
                  <Text className="text-base text-stone-400">
                    {goalType} goal
                  </Text>
                  <Icon
                    icon={IconSelector}
                    darkColor={colors.stone[400]}
                    lightColor={colors.stone[400]}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption value="daily" text="Daily goal" />
                <MenuOption value="weekly" text="Weekly goal" />
              </MenuOptions>
            </Menu>
          </View>
          <Divider />
          <View
            className="flex flex-row justify-between p-2"
            style={{ backgroundColor: colors.transparent }}
          >
            <Text className="text-base font-semibold">
              {" "}
              Completions per {goalType === "daily" ? "day" : "week"}
            </Text>
            <Menu onSelect={(val) => setCompletion(val)}>
              <MenuTrigger>
                <View className="flex flex-row">
                  <Text className="text-base text-stone-400">
                    {pluralize(completion, "completion", "completions")}
                  </Text>
                  <Icon
                    icon={IconSelector}
                    darkColor={colors.stone[400]}
                    lightColor={colors.stone[400]}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions>
                {[
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20,
                ].map((num) => (
                  <MenuOption key={num} value={num} text={`${num}`} />
                ))}
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </View>
    </View>
  );
}
const colorNames = Object.keys(
  colors.habitColors,
) as (keyof typeof colors.habitColors)[];