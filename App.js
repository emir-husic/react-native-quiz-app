import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import Quiz from "./Quiz/index.js";

export default function App() {
    return (
        <View>
            <Quiz />
        </View>
    );
}
