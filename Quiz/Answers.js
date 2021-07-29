import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        backgroundColor: "#3b5998",
        borderRadius: 10,
        alignItems: "center",
        margin: 1,
        padding: 10,
    },
    buttonSuccess: {
        backgroundColor: "green",
    },
    buttonFail: {
        backgroundColor: "red",
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        marginRight: 45,
    },
    buttonIndex: {
        fontSize: 40,
        borderStyle: "solid",
        paddingRight: 15,
    },
});

const Answers = (props) => {
    const [chosenAnswer, setChosenAnswer] = useState(null);

    const setAnswer = (nbr, correct) => {
        if (!props.displayAnswers) {
            setChosenAnswer(nbr);
            props.setQuestionAnswered(true);
            if (correct) props.incrementScore();
        }
    };

    let data = props.answers.map((answer, nbr) => {
        let btnStyle = [styles.button];
        if (props.displayAnswers) {
            if (answer.correct) {
                btnStyle.push([styles.buttonSuccess]);
            } else if (nbr === chosenAnswer) btnStyle.push([styles.buttonFail]);
        }
        let alpha = (nbr + 10).toString(36).toUpperCase();
        return (
            <AnswerButton
                key={nbr}
                style={btnStyle}
                index={alpha}
                text={answer.text}
                onPress={() => setAnswer(nbr, answer.correct)}
            />
        );
    });
    return <View>{data}</View>;
};

const AnswerButton = (props) => {
    return (
        <TouchableOpacity style={props.style} onPress={props.onPress}>
            <Text style={styles.buttonIndex}>{props.index}</Text>
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    );
};

export default Answers;
