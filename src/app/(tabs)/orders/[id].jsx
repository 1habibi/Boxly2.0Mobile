import {
	Button,
	ButtonGroup,
	Dialog,
	Divider,
	Icon,
	Rating,
	useTheme
} from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	Image,
	Linking
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

import Loader from "@/src/components/Loader";
import DeleteOrderButton from "@/src/components/ui/DeleteOrderButton";
import Steps from "@/src/components/ui/Steps/Steps";
import { useDeleteOrder } from "@/src/hooks/order/useDeleteOrder";
import { useEditOrder } from "@/src/hooks/order/useEditOrder";
import { useOrder } from "@/src/hooks/order/useOrder";
import { ORDER_STATUSES } from "@/src/utils/OrderStatuses";

const Order = () => {
	const { theme } = useTheme();
	const { id } = useLocalSearchParams();
	const { order, isOrderLoading, refetchOrder } = useOrder(null, id);
	const { editOrder, isEditOrderLoading } = useEditOrder();
	const { deleteOrder, isDeleteOrderLoading } = useDeleteOrder();
	const [dialogVisible, setDialogVisible] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const queryClient = useQueryClient();

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		queryClient.invalidateQueries(["order-by-id", id]).then(() => {
			refetchOrder();
			setRefreshing(false);
		});
	}, [id, queryClient, refetchOrder]);

	const toggleDialog = () => {
		setDialogVisible(!dialogVisible);
	};

	const steps = [
		{
			title: ORDER_STATUSES.UNKNOWN,
			description: "Статус заказа еще не определен, ожидайте"
		},
		{
			title: ORDER_STATUSES.WAITING_ANSWER,
			description: "Администратор назначил стоимость вашего заказа"
		},
		{
			title: ORDER_STATUSES.IN_WAY,
			description: "Ваш заказ в пути на пункт выдачи"
		},
		{
			title: ORDER_STATUSES.ARRIVED,
			description: `Заказ прибыл на пункт выдачи. ${order?.deliveryType === "Доставка" ? "Ожидайте курьера" : ""}`
		},
		{
			title: ORDER_STATUSES.COMPLETED,
			description: "Заказ получен! Оставьте, пожалуйста, отзыв"
		}
	];

	const getStepIndex = () => {
		if (!order || !order.status) return;
		switch (order.status) {
			case ORDER_STATUSES.UNKNOWN:
				return 0;
			case ORDER_STATUSES.WAITING_ANSWER:
				return 1;
			case ORDER_STATUSES.IN_WAY:
				return 2;
			case ORDER_STATUSES.ARRIVED:
				return 3;
			case ORDER_STATUSES.COMPLETED:
				return 4;
			default:
				return 0;
		}
	};
	const currentStep = getStepIndex();

	const onOrderDelete = async id => {
		try {
			await deleteOrder({ id });
			toggleDialog();
			router.replace("/orders");
		} catch (e) {
			console.error("Ошибка: ", e);
		}
	};

	if (isOrderLoading)
		return (
			<View>
				<Text>Загрузка</Text>
			</View>
		);

	return (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
			className="mt-10 mb-2 mx-2 h-full flex-1 "
		>
			{order?.deliveryType === null && (
				<Dialog isVisible={dialogVisible}>
					<Dialog.Title title="Тип доставки" />
					<Text>Выберите способ получения заказа</Text>
					<Dialog.Actions>
						<Dialog.Button
							title="Доставка"
							onPress={async () => {
								const orderData = {
									deliveryType: "Доставка"
								};
								try {
									await editOrder({ orderData, id });
									toggleDialog();
								} catch (e) {
									console.error("Ошибка: ", e);
								}
							}}
						/>
						<Dialog.Button
							title="Самовывоз"
							onPress={async () => {
								const orderData = {
									deliveryType: "Самовывоз"
								};
								try {
									await editOrder({ orderData, id });
									toggleDialog();
								} catch (e) {
									console.error("Ошибка: ", e);
								}
							}}
						/>
					</Dialog.Actions>
				</Dialog>
			)}
			{isOrderLoading ? (
				<Loader />
			) : (
				<View>
					<Text className="text-5xl font-bold mb-4">
						Заказ{"\n"}
						<Text className="text-primary">{id}</Text>{" "}
					</Text>
					<View>
						<View className="mb-3">
							<Text className="text-3xl font-bold mb-2">Статус</Text>
							<Steps steps={steps} currentStep={currentStep} />
						</View>
						<View className="mb-3">
							<Text className="text-3xl font-bold mb-2">Товары</Text>
							{order.items.length === 0 ? (
								<View>
									<Image
										source={{
											uri: order.qr
										}}
										width={300}
										height={300}
									/>
								</View>
							) : (
								<View>
									{order.items.map((item, index) => (
										<View key={index}>
											<Text
												onPress={() => {
													Linking.openURL(item.url);
												}}
											>
												Ссылка:{" "}
												<Text style={{ color: theme.colors.primary }}>
													{item.url.slice(0, 70) + "..."}
												</Text>
											</Text>
											<Text>Количество: {item.count}</Text>
											<Text>Примечание: {item.note}</Text>
											<Divider
												style={{ marginBottom: 10, marginTop: 10 }}
												width={1}
												color={theme.colors.primary}
											/>
										</View>
									))}
								</View>
							)}
						</View>
						<View className="mb-3">
							<Text className="text-3xl font-bold mb-2">Детали</Text>
							<Text>Тип доставки: {order?.deliveryType}</Text>
							<Text>
								Cтоимость: {order.price ? `${order.price} руб.` : "Нет"}
							</Text>
							{order.promo ? <Text>Промокод: {order.promo}</Text> : null}
							<View className="mt-2">
								<DeleteOrderButton
									handleDeleteOrderConfirm={() => onOrderDelete(order.id)}
								/>
							</View>
						</View>

						{order.status === "Ожидает ответа" ? (
							<View className="flex gap-y-1">
								<Text className="font-bold">
									Администратор назначил стоимость вашего заказа
								</Text>
								<Text>
									Стоимость: {order.price} руб. Вы можете оплатить его или
									отменить.
								</Text>
								<View className="flex flex-row justify-between gap-3">
									<View className="flex-1">
										<Button
											buttonStyle={{ borderRadius: 20 }}
											titleStyle={{ color: "white" }}
										>
											Оплатить
											<Icon
												iconStyle={{ marginLeft: 10, fontSize: 18 }}
												color="#FFF"
												name="dollar"
												type="font-awesome"
											/>
										</Button>
									</View>
									<View className="flex-1">
										<DeleteOrderButton />
									</View>
								</View>
							</View>
						) : order.status === "Получен" ? (
							<View>
								<Text>Оцените заказ</Text>
								<Rating
									ratingBackgroundColor="red"
									showRating
									fractions="{0}"
									startingValue="{3.3}"
								/>
							</View>
						) : null}
					</View>
				</View>
			)}
		</ScrollView>
	);
};

export default Order;
