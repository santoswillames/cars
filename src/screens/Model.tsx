import React from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/userAuth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "../components/Header";
import { ArrowLeft, CarFront } from "lucide-react-native";
import colors from "tailwindcss/colors";
import { ListEmpty } from "../components/ListEmpty";
import { Item } from "../components/Item";
import { apiBrands } from "../service/api";
import { AppErrors } from "../utils/AppErrors";
import { CarsModelDTO } from "../dtos/CarsModelDTO";
import { Loading } from "../components/Loading";

type RouteParams = {
  brandCode: string;
};

type ResponseApi = {
  modelos: CarsModelDTO[];
};

export function Model() {
  const route = useRoute();
  const { brandCode } = route.params as RouteParams;
  const { user } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [carsModel, setCarsModel] = useState<CarsModelDTO[]>([]);

  async function fetchCarsModel() {
    try {
      setIsLoading(true);
      const { data } = await apiBrands.get<ResponseApi>(
        `/marcas/${brandCode}/modelos`
      );
      setCarsModel(data.modelos);
    } catch (error) {
      if (error instanceof AppErrors) {
        Alert.alert(error.message);
      } else {
        Alert.alert("Erro ao tentar buscar as marcas!");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCarsModel();
  }, []);

  return (
    <View className="flex-1">
      <Header.Root>
        <Header.Text text={`Olá, ${user.name}`} />
        <Header.Actions>
          <Header.Action
            icon={ArrowLeft}
            onPress={() => navigation.navigate("home")}
          />
        </Header.Actions>
      </Header.Root>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View className="flex-row items-center gap-6 pt-5 pb-2 px-8">
            <CarFront color={colors.emerald[600]} size={32} />
            <Text className=" text-white text-xl ">Modelo dos carros</Text>
          </View>

          <FlatList
            className="px-8"
            data={carsModel}
            keyExtractor={(item) => String(item.codigo)}
            showsVerticalScrollIndicator
            renderItem={({ item }) => (
              <Item.Root>
                <Item.Text text={item.nome} />
              </Item.Root>
            )}
            ListEmptyComponent={() => (
              <ListEmpty message="Não há marcas a serem listadas" />
            )}
          />
        </>
      )}
    </View>
  );
}
