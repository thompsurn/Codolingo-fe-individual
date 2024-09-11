import { Stack } from "expo-router/stack";
import { useState } from "react";

export default function home() {

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[lesson]"
        options={({ route }) =>({
          title: `Lesson ${route.params.lesson}`,
        })}
      />
    </Stack>
  );
}
