import { Button, Icon, useTheme } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Modal
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import Loader from "@/src/components/Loader";
import CModal from "@/src/components/ui/CModal";
import { useCourier } from "@/src/hooks/order/useCourier";
import { useEditOrder } from "@/src/hooks/order/useEditOrder";
import { useAuth } from "@/src/hooks/useAuth";
import { ORDER_STATUSES } from "@/src/utils/OrderStatuses";

const Index = () => {
	const { user } = useAuth();
	const { orders, isOrdersLoading, refetch, updateOrderStatus } = useCourier(
		user?.id
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredOrders, setFilteredOrders] = useState([]);
	const [activeTab, setActiveTab] = useState("active");
	const [refreshing, setRefreshing] = useState(false);
	const queryClient = useQueryClient();
	const { theme } = useTheme();
	const styles = createStyles(theme);
	const [modalVisible, setModalVisible] = useState(false);
	const { editOrder, isEditOrderLoading } = useEditOrder();

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		queryClient.invalidateQueries(["orders", user?.id]).then(() => {
			refetch();
			setRefreshing(false);
		});
	}, [user?.id, queryClient, refetch]);

	useEffect(() => {
		let filtered = orders ? [...orders] : [];
		if (searchQuery !== "") {
			filtered = filtered.filter(
				order =>
					order.id.toString().includes(searchQuery) ||
					order.status.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		if (activeTab === "active") {
			filtered = filtered.filter(order => order.status !== "Выполнен");
		} else if (activeTab === "completed") {
			filtered = filtered.filter(order => order.status === "Выполнен");
		}

		setFilteredOrders(filtered);
	}, [searchQuery, orders, activeTab]);

	const handleStatusChange = async (id, newStatus) => {
		const orderData = {
			status: newStatus
		};
		try {
			await editOrder({ orderData, id });
			await Toast.show({
				type: "success",
				text1: "Изменение статуса",
				text2: "Статус заказа изменен"
			});
		} catch (e) {
			console.error("Ошибка: ", e);
		}
	};

	// const handleStatusChange = (orderId, newStatus) => {
	// 	updateOrderStatus(orderId, newStatus).then(() => {
	// 		queryClient.invalidateQueries(["orders", user?.id]);
	// 	});
	// };

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Я -{"\n"}
				<Text style={styles.primaryText}>курьер</Text>
			</Text>
			{isOrdersLoading ? (
				<Loader />
			) : (
				<View style={styles.content}>
					<View style={styles.tabs}>
						<TouchableOpacity onPress={() => setActiveTab("active")}>
							<Text
								style={activeTab === "active" ? styles.activeTab : styles.tab}
							>
								Активные
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setActiveTab("completed")}>
							<Text
								style={
									activeTab === "completed" ? styles.activeTab : styles.tab
								}
							>
								Выполненные
							</Text>
						</TouchableOpacity>
					</View>
					<TextInput
						style={styles.searchInput}
						placeholder="Поиск"
						onChangeText={setSearchQuery}
						value={searchQuery}
					/>
					<ScrollView
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}
					>
						{filteredOrders.length !== 0 ? (
							filteredOrders.map(order => (
								<View key={order.id} style={styles.orderItem}>
									<CModal visible={modalVisible}>
										<Text style={styles.modalTitle}>Статус заказа</Text>
										<View style={styles.modalButtons}>
											<TouchableOpacity
												style={styles.modalButton}
												onPress={() =>
													handleStatusChange(order.id, ORDER_STATUSES.IN_WAY)
												}
											>
												<Icon name="road" type="font-awesome-5" />
												<Text style={styles.modalButtonText}>В пути</Text>
											</TouchableOpacity>
											<TouchableOpacity
												style={styles.modalButton}
												onPress={() =>
													handleStatusChange(order.id, ORDER_STATUSES.COMPLETED)
												}
											>
												<Icon name="checkcircle" type="antdesign" />
												<Text style={styles.modalButtonText}>Получен</Text>
											</TouchableOpacity>
										</View>
										<TouchableOpacity
											style={styles.closeButton}
											onPress={() => closeModal()}
										>
											<Text style={styles.closeButtonText}>Закрыть</Text>
										</TouchableOpacity>
									</CModal>
									<Text style={styles.orderText}>Заказ №{order.id}</Text>
									<Text style={styles.orderText}>Статус: {order.status}</Text>
									<Button
										buttonStyle={{ borderRadius: 15 }}
										ViewComponent={LinearGradient}
										linearGradientProps={{
											colors: ["#FF9800", "#F44336"],
											start: { x: 0, y: 0.5 },
											end: { x: 1, y: 0.5 }
										}}
										onPress={() => openModal()}
									>
										Изменить статус
									</Button>
								</View>
							))
						) : (
							<Text style={styles.noOrdersText}>Нет заказов</Text>
						)}
					</ScrollView>
				</View>
			)}
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
			fontWeight: "bold"
		},
		primaryText: {
			color: theme.colors.primary
		},
		content: {
			marginTop: 20,
			flex: 1
		},
		tabs: {
			flexDirection: "row",
			justifyContent: "space-around",
			marginBottom: 10
		},
		tab: {
			fontWeight: "bold",
			fontSize: 18
		},
		activeTab: {
			fontWeight: "bold",
			fontSize: 18,
			color: theme.colors.primary
		},
		searchInput: {
			fontSize: 16,
			marginBottom: 10,
			borderColor: theme.colors.grey4,
			borderWidth: 1,
			borderRadius: 5,
			padding: 8
		},
		orderItem: {
			padding: 15,
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.grey4
		},
		orderText: {
			fontSize: 16,
			marginBottom: 5
		},
		statusButton: {
			marginTop: 10,
			backgroundColor: theme.colors.primary,
			padding: 10,
			borderRadius: 5,
			alignItems: "center"
		},
		buttonText: {
			color: "#fff",
			fontSize: 16
		},
		noOrdersText: {
			textAlign: "center",
			fontSize: 18,
			marginTop: 20
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

export default Index;
