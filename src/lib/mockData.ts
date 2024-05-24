import { HabitCompletionValue } from "@/src/components/HabitCard";
import colors from "@/src/constants/colors";
import {
  IconBarbell,
  IconBed,
  IconBook,
  IconCode,
  IconExclamationCircle,
  IconMoodTongue,
  IconMusic,
  Icon as TablerIcon,
} from "@tabler/icons-react-native";
import { fetchSingleUserThumbnail } from "./getRandomProfilePics";

export type Habit = {
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  id: number;
};

export function getMockCompletionsData() {
  function getNumberOfDaysInLastWeek() {
    const currDay = new Date().getDay();
    return currDay === 0 ? 7 : currDay;
  }
  const daysInLastWeek = getNumberOfDaysInLastWeek();
  const activityData: HabitCompletionValue[] = new Array(56); // (3*2) weeks * 7 days + 7 days of last week = 49 days
  for (let i = 0; i < 49 + daysInLastWeek; i++) {
    Math.floor(Math.random() * 2)
      ? (activityData[i] = "completed")
      : (activityData[i] = "missed");
  }
  for (let i = 49 + daysInLastWeek; i < activityData.length; i++) {
    activityData[i] = "not-applicable";
  }
  let indexOftoday = 49 + daysInLastWeek - 1;
  // make sure last day is always missed
  activityData[indexOftoday] = "missed";
  return [activityData, indexOftoday] as const;
}

export const mockHabitData: Habit[] = [
  {
    title: "Workout for 1 hour",
    icon: IconBarbell,
    color: "red",
    id: 3,
  },
  {
    title: "Read for 15 minutes",
    icon: IconBook,
    color: "green",
    id: 1,
  },
  {
    title: "Get 8 hours of sleep",
    icon: IconBed,
    color: "violet",
    id: 2,
  },
];

export type FriendRequestData = {
  id: number;
  displayName: string;
  mutualCount: number;
  profilePicUrl: string;
};

export async function getMockFriendInvites() {
  const pic1 = await fetchSingleUserThumbnail();
  const pic2 = await fetchSingleUserThumbnail();

  const mockFriendInvites: FriendRequestData[] = [
    {
      id: 1,
      displayName: "Someone else",
      mutualCount: 3,
      profilePicUrl: pic1.imgurl,
    },
    {
      id: 2,
      displayName: "Eduardo",
      mutualCount: 5,
      profilePicUrl: pic2.imgurl,
    },
  ];

  return mockFriendInvites;
}

export type HabitInviteData = {
  id: number; // unique id for each invite
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  numberOfParticipants: number;
  displayName: string;
  profilePicUrl: string;
};

export async function getMockHabitInvites() {
  const pic1 = await fetchSingleUserThumbnail();
  const pic2 = await fetchSingleUserThumbnail();

  const mockHabitInvites: HabitInviteData[] = [
    {
      id: 1,
      title: "Play Guitar",
      color: "purple",
      icon: IconMusic,
      numberOfParticipants: 3,
      displayName: "Kush Blaze",
      profilePicUrl: pic1.imgurl,
    },
    {
      id: 2,
      title: "Yum Yum",
      color: "red",
      icon: IconMoodTongue,
      numberOfParticipants: 10,
      displayName: "Blaze Kush",
      profilePicUrl: pic2.imgurl,
    },
  ];
  return mockHabitInvites;
}

export type HabitReminderData = {
  id: number; // unique id for each reminder
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  timeSent: number; // this will be hours stored as a number, can be changed to proper time after we decide on the format in the db
  displayName: string;
  profilePicUrl: string;
};

export async function getMockReminderInvites() {
  const pic1 = await fetchSingleUserThumbnail();
  const pic2 = await fetchSingleUserThumbnail();

  const mockReminderInvites: HabitReminderData[] = [
    {
      id: 1,
      title: "Work on Habit",
      color: "purple",
      icon: IconCode,
      timeSent: 4,
      displayName: "Guy One",
      profilePicUrl: pic1.imgurl,
    },
    {
      id: 2,
      title: "Yum Yum",
      color: "red",
      icon: IconMoodTongue,
      timeSent: 12,
      displayName: "Dude Two",
      profilePicUrl: pic2.imgurl,
    },
  ];
  return mockReminderInvites;
}

export interface FriendData {
  id: number;
  displayName: string;
  userName: string;
  profilePicUrl: string;
  commonHabits: Habit[];
}

export async function getMockFriends() {
  const mockFriends: FriendData[] = [
    {
      id: 1,
      displayName: "Someone else",
      userName: "some1else",
      profilePicUrl: "",
      commonHabits: mockHabitData,
    },
    {
      id: 2,
      displayName: "Eduardo",
      userName: "eduardo_012003",
      profilePicUrl: "",
      commonHabits: [],
    },
  ];
  return mockFriends;
}

export type NotificationData = {
  id: number; // unique id for each reminder
  type: "friendRequest" | "habitInvite" | "habitReminder";
  displayName: string;
  mutualCount: number; // only for friend requests
  profilePicUrl: string;
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  numberOfParticipants: number; // only for habit invites
  timeSent: number; // this will be hours stored as a number, can be changed to proper time after we decide on the format in the db
};

export async function getMockNotifications() {
  const pic1 = await fetchSingleUserThumbnail();
  const pic2 = await fetchSingleUserThumbnail();
  const pic3 = await fetchSingleUserThumbnail();
  const pic4 = await fetchSingleUserThumbnail();
  const pic5 = await fetchSingleUserThumbnail();
  const pic6 = await fetchSingleUserThumbnail();

  const mockNotifications: NotificationData[] = [
    {
      id: 1,
      type: "friendRequest",
      displayName: "Someone else",
      mutualCount: 3,
      profilePicUrl: pic1.imgurl,
      title: "",
      color: "red",
      icon: IconExclamationCircle,
      numberOfParticipants: 0,
      timeSent: 0,
    },
    {
      id: 2,
      type: "habitReminder",
      displayName: "Guy One",
      mutualCount: 0,
      profilePicUrl: pic2.imgurl,
      title: "Work on Habit",
      color: "red",
      icon: IconCode,
      numberOfParticipants: 0,
      timeSent: 0,
    },
    {
      id: 3,
      type: "habitInvite",
      displayName: "Kush Blaze",
      mutualCount: 0,
      profilePicUrl: pic3.imgurl,
      title: "Play Guitar",
      color: "purple",
      icon: IconMusic,
      numberOfParticipants: 3,
      timeSent: 0,
    },
    {
      id: 4,
      type: "friendRequest",
      displayName: "Eduardo",
      mutualCount: 5,
      profilePicUrl: pic4.imgurl,
      title: "",
      color: "red",
      icon: IconExclamationCircle,
      numberOfParticipants: 0,
      timeSent: 0,
    },
    {
      id: 5,
      type: "habitInvite",
      displayName: "Blaze Kush",
      mutualCount: 0,
      profilePicUrl: pic5.imgurl,
      title: "Yum Yum",
      color: "red",
      icon: IconMoodTongue,
      numberOfParticipants: 10,
      timeSent: 0,
    },
    {
      id: 6,
      type: "habitReminder",
      displayName: "Dude Two",
      mutualCount: 0,
      profilePicUrl: pic6.imgurl,
      title: "Yum Yum",
      color: "red",
      icon: IconMoodTongue,
      numberOfParticipants: 0,
      timeSent: 12,
    },
  ];
  return mockNotifications;
}