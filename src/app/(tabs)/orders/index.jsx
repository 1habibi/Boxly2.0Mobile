import { Icon } from "@rneui/base";
import { Button, Card, useTheme } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

import NotFoundOrders from "@/assets/images/not-found-orders.svg";
import Loader from "@/src/components/Loader";
import CModal from "@/src/components/ui/CModal";
import { useOrder } from "@/src/hooks/order/useOrder";
import { useProfile } from "@/src/hooks/profile/useProfile";
import { useAuth } from "@/src/hooks/useAuth";

const MyOrders = () => {
	const { user } = useAuth();
	const router = useRouter();
	const { orders, isOrdersLoading, refetchOrders } = useOrder(user?.id);
	const { profile, isProfileLoading } = useProfile();
	const { theme } = useTheme();
	const styles = createStyles(theme);
	const [modalVisible, setModalVisible] = useState(false);

	const [searchQuery, setSearchQuery] = useState("");
	const [filteredOrders, setFilteredOrders] = useState([]);
	const [sortOrder, setSortOrder] = useState("desc");

	const queryClient = useQueryClient();
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		queryClient.invalidateQueries(["user-orders"]).then(() => {
			refetchOrders();
			setRefreshing(false);
		});
	}, [queryClient, refetchOrders]);

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const toggleSortOrder = () => {
		setSortOrder(prevSortOrder => (prevSortOrder === "desc" ? "asc" : "desc"));
	};

	useEffect(() => {
		let sortedOrders = orders ? [...orders] : [];

		if (searchQuery !== "") {
			sortedOrders = sortedOrders.filter(
				order =>
					order.id.toString().includes(searchQuery) ||
					order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
					order.deliveryType.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		sortedOrders.sort((a, b) => {
			const dateA = new Date(a.createdAt);
			const dateB = new Date(b.createdAt);

			if (sortOrder === "asc") {
				return dateA - dateB;
			} else {
				return dateB - dateA;
			}
		});

		setFilteredOrders(sortedOrders);
	}, [searchQuery, orders, sortOrder]);

	if (isOrdersLoading || isProfileLoading) return <Loader />;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Мои {"\n"}
				<Text style={styles.primaryText}>заказы</Text>{" "}
			</Text>
			{isOrdersLoading ? (
				<Loader />
			) : orders.length !== 0 && profile ? (
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					showsVerticalScrollIndicator={false}
				>
					<View className="flex-row items-center">
						<TextInput
							style={{ flex: 1, fontSize: 16 }}
							placeholder="Поиск"
							onChangeText={setSearchQuery}
							value={searchQuery}
						/>
						{sortOrder === "desc" ? (
							<Icon
								iconStyle={{ marginLeft: 10 }}
								color="#111"
								name="sort-calendar-descending"
								type="material-community"
								onPress={toggleSortOrder}
							/>
						) : (
							<Icon
								iconStyle={{ marginLeft: 10 }}
								color="#111"
								name="sort-calendar-ascending"
								type="material-community"
								onPress={toggleSortOrder}
							/>
						)}
					</View>
					{filteredOrders &&
						filteredOrders.map(order => (
							<Card containerStyle={{ borderRadius: 30 }} key={order.id}>
								<Card.Title className="text-primary text-bold">
									Заказ №{order.id}
								</Card.Title>
								<Card.Divider />
								<Text>Статус: {order.status}</Text>
								<Text>Тип заказа: {order.deliveryType}</Text>
								<Text>Цена: {order.price ? order.price : "Нет"}</Text>
								<Text>
									Дата: {new Date(order.createdAt).toLocaleDateString("ru-RU")}
								</Text>
								<View className="mt-2">
									<Link asChild href={`/orders/${order.id}`}>
										<Button
											color="secondary"
											buttonStyle={{}}
											titleStyle={{ color: "black" }}
											title="Подробнее"
											containerStyle={{
												borderRadius: 20,
												borderWidth: 1,
												borderColor: "#e6e6e6",
												paddingHorizontal: 15
											}}
										/>
									</Link>
								</View>
							</Card>
						))}
				</ScrollView>
			) : !profile ? (
				<View>
					<Text>Нет профиля</Text>
				</View>
			) : (
				<View className="h-full flex-1 justify-center items-center">
					<View>
						<NotFoundOrders width={350} height={350} />
					</View>
					<View>
						<Text className="text-center text-primary font-black text-4xl mb-2">
							Заказов еще нет!
						</Text>
						<Text className="text-center text-base">
							Волнительный момент, но сейчас вы можете сделать свой{" "}
							<Text className="text-primary font-black">первый</Text>
						</Text>
					</View>
				</View>
			)}
			<View style={styles.newOrderButton}>
				<CModal visible={modalVisible}>
					<Text style={styles.modalTitle}>Тип заказа</Text>
					<View style={styles.modalButtons}>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={() => {
								closeModal();
								router.push("/orders/new");
							}}
						>
							<Icon name="pluscircle" type="antdesign" />
							<Text style={styles.modalButtonText}>Новый</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={() => {
								closeModal();
								router.push("/orders/newQR");
							}}
						>
							<Icon name="barcode" type="antdesign" />
							<Text style={styles.modalButtonText}>Штрих-код</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={() => closeModal()}
					>
						<Text style={styles.closeButtonText}>Закрыть</Text>
					</TouchableOpacity>
				</CModal>
				<Button onPress={openModal} buttonStyle={{ borderRadius: 20 }}>
					Новый заказ
				</Button>
			</View>
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

export default MyOrders;
