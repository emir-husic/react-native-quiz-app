import React from "react";
import { Text, StyleSheet } from "react-native";
import { ProgressCircle } from "react-native-svg-charts";

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 40,
        margin: 10,
    },
    circleText: {
        textAlign: "center",
        fontSize: 30,
        marginTop: "20%",
    },
});

export default ExamCompletdView = (props) => {
    const threshold = 0.8;
    const passed = props.result >= threshold;

    return (
        <>
            <Text style={styles.title}>{passed ? "Passed" : "Failed"}</Text>
            <ProgressCircle
                style={{ height: 200 }}
                progress={props.result}
                progressColor={passed ? "rgb(50, 205, 50)" : "rgb(134, 0, 0)"}
                startAngle={-Math.PI * 0.8}
                endAngle={Math.PI * 0.8}
            >
                <Text style={styles.circleText}> {props.result * 100} % </Text>
            </ProgressCircle>
        </>
    );
};
