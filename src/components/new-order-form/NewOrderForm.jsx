import { Divider } from "@rneui/base";
import { Button, Icon, useTheme } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";

import Field from "../form-elements/field/Field";
import Select from "../form-elements/select/Select";

import { useCreateOrder } from "@/src/hooks/order/useCreateOrder";

const NewOrderForm = ({ refetch }) => {
	const { createOrder, isCreateOrderLoading } = useCreateOrder();
	const { handleSubmit, reset, control } = useForm({
		mode: "onChange",
		defaultValues: {
			deliveryType: "Доставка",
			items: [{ url: "", count: 1, note: "" }]
		}
	});
	const { theme } = useTheme();
	const [items, setItems] = useState([{ url: "", count: 1, note: "" }]);

	const addItem = () => {
		const newItem = {
			id: Date.now() + Math.random(), // generate unique ID
			url: "",
			count: 1,
			note: ""
		};
		setItems(prevItems => [...prevItems, newItem]);
	};

	const removeItem = index => {
		const newItems = items.filter((_, i) => i !== index);
		setItems(newItems);
		reset({ items: newItems }); // update form state
	};

	const onFinish = async data => {
		console.log(data);
		try {
			createOrder(data);
		} catch (e) {
			console.error("Ошибка: ", e);
		}
	};

	return (
		<ScrollView
			contentContainerStyle={{
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				paddingVertical: 10
			}}
		>
			{items.map((item, index) => (
				<View style={{ width: "100%" }} key={index}>
					<Field
						control={control}
						name={`items[${index}].url`}
						label="Ссылка на товар"
						placeholder="Ссылка на товар"
						rules={{
							required: "Обязательное поле"
						}}
						leftIcon={<Icon name="link" type="antdesign" size={20} />}
					/>
					<Field
						control={control}
						name={`items[${index}].count`}
						label="Количество"
						rules={{
							required: "Обязательное поле"
						}}
						placeholder="Количество"
						keyboardType="numeric"
						leftIcon={<Icon name="numbers" type="material-icons" size={20} />}
					/>
					<Field
						control={control}
						name={`items[${index}].note`}
						label="Примечание"
						rules={{
							required: "Обязательное поле"
						}}
						placeholder="Примечание"
						leftIcon={
							<Icon name="sticky-note-o" type="font-awesome" size={20} />
						}
					/>
					{items.length > 1 && (
						<Button
							title="Удалить товар"
							onPress={() => removeItem(index)}
							type="outline"
							containerStyle={{
								elevation: 0,
								borderWidth: 1,
								borderRadius: 15,
								marginVertical: 10,
								width: "50%",
								borderColor: theme.colors.primary
							}}
							buttonStyle={{ padding: 0 }}
						/>
					)}
					<Divider style={{ marginBottom: 10, marginTop: 10 }} />
				</View>
			))}
			<Select
				control={control}
				name="deliveryType"
				placeholder="Тип доставки"
				label="Тип доставки"
				rules={{
					required: "Обязательное поле"
				}}
				icon={{ type: "material-community", name: "truck-delivery-outline" }}
				items={[
					{
						label: "Доставка",
						value: "Доставка"
					},
					{
						label: "Самовывоз",
						value: "Самовывоз"
					}
				]}
			/>
			<Field
				control={control}
				name="promo"
				label="Промокод"
				placeholder="Промокод"
				leftIcon={<Icon name="gift" type="antdesign" size={20} />}
			/>
			<View style={{ width: "100%" }}>
				<Button
					title="Добавить товар"
					onPress={addItem}
					containerStyle={{ marginVertical: 10, borderRadius: 15 }}
				/>
			</View>
			<View className="mt-5">
				<Button
					ViewComponent={LinearGradient}
					linearGradientProps={{
						colors: ["#FF9800", "#F44336"],
						start: { x: 0, y: 0.5 },
						end: { x: 1, y: 0.5 }
					}}
					loading={isCreateOrderLoading}
					onPress={handleSubmit(onFinish)}
					containerStyle={{ borderRadius: 10 }}
				>
					Создать заказ
				</Button>
			</View>
		</ScrollView>
	);
};

export default NewOrderForm;
