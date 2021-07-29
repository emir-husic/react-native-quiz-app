import React, { useState } from "react";
import {
    Image,
    TouchableOpacity,
    View,
    Text,
    Button,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Answers from "./Answers";
import ScoreView from "./ScoreView";
import Questions from "../data/Quiz1.json";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
    },
    button: {
        flexDirection: "row",
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: "center",
        color: "black",
        fontSize: 20,
    },
    answerOptionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    backButton: {
        padding: 5,
        margin: 10,
        color: "black",
        fontSize: 40,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
    },
    text: {
        margin: 5,
        fontSize: 20,
        textAlign: "center",
    },
    bottom: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 36,
        alignItems: "center",
    },
    miniContainer: {
        justifyContent: "center",
        padding: 10,
    },
    questionImage: {
        width: "100%",
        height: 200,
    },
});

export default function Quiz() {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [questionAnswered, setQuestionAnswered] = useState(false);
    const [finished, setFinished] = useState(false);

    const incrementScore = () => {
        const newScore = score + 1;
        setScore(newScore);
    };

    const nextQ = () => {
        setQuestionAnswered(false);
        const index = activeQuestion;
        if (index + 1 < Questions.length) {
            setActiveQuestion(index + 1);
        } else {
            setFinished(true);
        }
    };

    const clearTest = () => {
        setQuestionAnswered(false);
        setActiveQuestion(0);
        setScore(0);
        setFinished(false);
    };

    if (Questions.length == 0) {
        return <ActivityIndicator />;
    }
    const question = Questions[activeQuestion].question;
    const answerOptions = Questions[activeQuestion].answers;

    if (!finished) {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {Questions[activeQuestion].imageUri && (
                        <Image
                            source={{ uri: Questions[activeQuestion].imageUri }}
                            style={styles.questionImage}
                        />
                    )}

                    <Text style={styles.text}>{question}</Text>
                    <View style={styles.miniContainer}>
                        <Answers
                            answers={answerOptions}
                            displayAnswers={questionAnswered}
                            incrementScore={incrementScore}
                            setQuestionAnswered={setQuestionAnswered}
                        />
                    </View>
                    {questionAnswered && (
                        <View>
                            <View style={styles.answerOptionsContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={nextQ}
                                >
                                    <Text>Next</Text>
                                    <AntDesign
                                        style={styles.backButton}
                                        name="right"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text>Explanation:</Text>
                                <Text>
                                    {Questions[activeQuestion].explanation}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        );
    } else {
        let result = score / Questions.length;
        return (
            <View>
                <ScoreView result={result} />
                <Button title="Do test again" onPress={clearTest} />
            </View>
        );
    }
}
