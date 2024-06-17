import { Modal, StyleSheet, View } from "react-native";

const CModal = ({ visible, children }) => {
	const styles = createStyles();
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={styles.modalContainer}>
				<View style={styles.modal}>{children}</View>
			</View>
		</Modal>
	);
};

const createStyles = theme =>
	StyleSheet.create({
		modalContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "rgba(0, 0, 0, 0.5)"
		},
		modal: {
			backgroundColor: "#fff",
			borderRadius: 10,
			padding: 20,
			width: "80%", // ширина модального окна
			maxHeight: "70%" // максимальная высота модального окна
		}
	});

export default CModal;
