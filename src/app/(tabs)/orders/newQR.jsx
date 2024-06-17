import { Button, useTheme } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/src/hooks/useAuth";
import { uploadFile } from "@/src/utils/imagekit/imagekit";

const NewQR = () => {
	const { user } = useAuth();
	const { theme } = useTheme();
	const styles = createStyles(theme);

	const pickImageAsync = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
			allowsMultipleSelection: false
		});

		if (!result.canceled) {
			try {
				await uploadFile(result.assets[0]);
			} catch (e) {
				console.error("Ошибка загрузки", e);
			}
		} else {
			console.log("You did not select any image");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Загрузка {"\n"}
				<Text style={styles.primaryText}>штрих-кода</Text>{" "}
			</Text>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="flex-row items-center">
					<Button title="goyyyy" onPress={pickImageAsync} />
				</View>
			</ScrollView>
		</View>
	);
};

const createStyles = theme =>
	StyleSheet.create({
		container: {
			paddingTop: 40,
			paddingBottom: 8,
			paddingHorizontal: 8,
			flex: 1
		},
		title: {
			fontSize: 48,
			lineHeight: 48,
			fontWeight: "bold",
			marginBottom: 0
		},
		primaryText: {
			color: theme.colors.primary
		},
		newOrderButton: {
			alignItems: "center",
			marginTop: 10
		},
		modalButtons: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			columnGap: 50
		},
		modalButtonText: {
			fontWeight: "bold",
			fontSize: 20
		},
		closeButton: {
			marginTop: 20,
			display: "flex",
			alignItems: "flex-end"
		},
		closeButtonText: {
			color: theme.colors.primary,
			fontSize: 16
		},
		modalTitle: {
			color: theme.colors.primary,
			fontWeight: "bold",
			fontSize: 24,
			marginBottom: 25
		}
	});

export default NewQR;
