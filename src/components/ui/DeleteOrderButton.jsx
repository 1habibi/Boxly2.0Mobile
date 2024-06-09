import { Icon } from "@rneui/base";
import { Button, Dialog } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

const DeleteOrderButton = ({ handleDeleteOrderConfirm, ...rest }) => {
	const [showDiaglog, setShowDiaglog] = useState(false);

	const toggleDialog = () => {
		setShowDiaglog(!showDiaglog);
	};

	return (
		<View>
			<Dialog isVisible={showDiaglog} onBackdropPress={toggleDialog}>
				<Dialog.Title title="Отмена заказа" />
				<Text>Вы уверены что хотите отменить заказ?</Text>
				<Dialog.Actions>
					<Dialog.Button title="Назад" onPress={() => setShowDiaglog(false)} />
					<Dialog.Button
						title="Отменить заказ"
						onPress={handleDeleteOrderConfirm}
					/>
				</Dialog.Actions>
			</Dialog>
			<Button
				color="secondary"
				buttonStyle={{}}
				titleStyle={{ color: "black" }}
				containerStyle={{
					borderRadius: 20,
					borderWidth: 1,
					borderColor: "red",
					paddingHorizontal: 15
				}}
				onPress={() => {
					setShowDiaglog(true);
				}}
			>
				Отменить
				<Icon
					iconStyle={{ marginLeft: 10, fontSize: 18 }}
					color="black"
					name="trash"
					type="feather"
				/>
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({});

export default DeleteOrderButton;
