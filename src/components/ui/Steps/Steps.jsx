import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Step = ({
	stepNumber,
	title,
	description,
	isActive,
	isCompleted,
	isLastStep
}) => (
	<View style={styles.stepWrapper}>
		<View style={styles.stepContainer}>
			<View style={styles.iconContainer}>
				{isCompleted ? (
					<Icon name="check-circle" size={24} color="#E56427" />
				) : (
					<View style={[styles.circle, isActive && styles.activeCircle]}>
						<Text style={styles.stepNumber}>{stepNumber}</Text>
					</View>
				)}
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{title}</Text>
				{description && <Text style={styles.description}>{description}</Text>}
			</View>
		</View>
		{!isLastStep && (
			<View style={[styles.line, isCompleted && styles.completedLine]} />
		)}
	</View>
);

const Steps = ({ steps, currentStep }) => {
	return (
		<View>
			{steps.map((step, index) => (
				<Step
					key={index}
					stepNumber={index + 1}
					title={step.title}
					description={step.description}
					isActive={currentStep === index}
					isCompleted={currentStep > index}
					isLastStep={index === steps.length - 1}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	stepWrapper: {
		position: "relative"
	},
	stepContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16
	},
	iconContainer: {
		width: 40,
		alignItems: "center"
	},
	circle: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: "#ccc",
		justifyContent: "center",
		alignItems: "center"
	},
	activeCircle: {
		backgroundColor: "#E56427"
	},
	stepNumber: {
		color: "#fff",
		fontSize: 12
	},
	textContainer: {
		marginLeft: 8
	},
	title: {
		fontSize: 16,
		fontWeight: "bold"
	},
	description: {
		fontSize: 11,
		color: "#666"
	},
	line: {
		position: "absolute",
		left: 19,
		top: 32,
		width: 1,
		height: 22,
		backgroundColor: "#ccc"
	},
	completedLine: {
		backgroundColor: "#E56427"
	}
});

export default Steps;
